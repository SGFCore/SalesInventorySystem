alter session set container = freepdb1;
alter session set current_schema = sgf_admin;

-- Code ở phía sau 2 dòng lệnh trên

-- =============================================
-- TRIGGER
-- =============================================

-- C11: Số lượng đặt hàng không vượt quá tồn kho khả dụng
create or replace trigger trg_check_order_quantity before
   insert or update of quantity,productid on orderdetail
   for each row
   when ( new.productid is not null )   -- Chỉ kiểm tra nếu là sản phẩm đơn
declare
   v_available    number;
   v_warehouse_id number;
   v_has_shipping number;
begin
    -- Xác định có phải đơn online không
   select case
             when o.shipcode is not null
                 or o.shipcompanyid is not null then
                1
             else
                0
          end
     into v_has_shipping
     from orders o
    where o.orderid = :new.orderid;

    -- Chọn kho tương ứng: có vận chuyển -> kho gốc (1), không -> kho trực tiếp (2)
   v_warehouse_id :=
      case
         when v_has_shipping = 1 then
            1
         else
            2
      end;

    -- Lấy tồn kho khả dụng
   select availablestock
     into v_available
     from detailinventory
    where productid = :new.productid
      and warehouseid = v_warehouse_id;

   if :new.quantity > v_available then
      raise_application_error(
         -20001,
         'Số lượng đặt hàng ('
         || :new.quantity
         || ') vượt quá tồn kho khả dụng ('
         || v_available
         || ').'
      );
   end if;
exception
   when no_data_found then
      raise_application_error(
         -20002,
         'Không tìm thấy bản ghi tồn kho cho sản phẩm ID='
         || :new.productid
         || ' tại kho ID='
         || v_warehouse_id
         || '.'
      );
end;
/

-- C12: Số lượng hoàn trả không vượt quá số lượng đã mua
create or replace trigger trg_check_return_quantity before
   insert or update of quantity,productid,returnid on returndetail
   for each row
declare
   v_ordered_qty  number;
   v_returned_qty number := 0;
   v_order_id     number;
begin
    -- Lấy OrderID từ phiếu hoàn trả
   select r.orderid
     into v_order_id
     from orderreturn r
    where r.returnid = :new.returnid;

    -- Lấy số lượng đã mua từ OrderDetail
   select od.quantity
     into v_ordered_qty
     from orderdetail od
    where od.orderid = v_order_id
      and od.productid = :new.productid;

    -- Tính tổng số lượng đã hoàn trả cho sản phẩm này (không tính dòng hiện tại)
   select nvl(
      sum(rd.quantity),
      0
   )
     into v_returned_qty
     from returndetail rd
     join orderreturn r
   on rd.returnid = r.returnid
    where r.orderid = v_order_id
      and rd.productid = :new.productid
      and rd.returnid != :new.returnid;

   if v_returned_qty + :new.quantity > v_ordered_qty then
      raise_application_error(
         -20003,
         'Tổng số lượng hoàn trả ('
         ||(v_returned_qty + :new.quantity)
         || ') vượt quá số lượng đã mua ('
         || v_ordered_qty
         || ').'
      );
   end if;
exception
   when no_data_found then
      raise_application_error(
         -20004,
         'Không tìm thấy đơn hàng hoặc chi tiết đơn hàng tương ứng.'
      );
end;
/

-- C13: Tự động cập nhật tồn kho khả dụng khi thêm/sửa/xóa chi tiết đơn hàng
create or replace trigger trg_update_inventory_orderdetail after
   insert or update of quantity,productid or delete on orderdetail
   for each row
declare
   v_warehouse_id number;
   v_has_shipping number;
   v_old_qty      number := 0;
   v_new_qty      number := 0;
   v_order_id     number;
   v_product_id   number;
begin
    -- Xác định OrderID và ProductID
   if inserting then
      v_order_id := :new.orderid;
      v_product_id := :new.productid;
      v_new_qty := :new.quantity;
   elsif updating then
      v_order_id := :new.orderid;
      v_product_id := :new.productid;
      v_old_qty := :old.quantity;
      v_new_qty := :new.quantity;
   elsif deleting then
      v_order_id := :old.orderid;
      v_product_id := :old.productid;
      v_old_qty := :old.quantity;
   end if;

    -- Xác định loại đơn hàng (online hay tại quầy)
   begin
      select case
                when o.shipcode is not null
                    or o.shipcompanyid is not null then
                   1
                else
                   0
             end
        into v_has_shipping
        from orders o
       where o.orderid = v_order_id;
   exception
      when no_data_found then
         raise_application_error(
            -20005,
            'Đơn hàng không tồn tại.'
         );
   end;

   v_warehouse_id :=
      case
         when v_has_shipping = 1 then
            1
         else
            2
      end;

    -- Cập nhật AvailableStock
   update detailinventory
      set
      availablestock = availablestock - ( v_new_qty - v_old_qty )
    where productid = v_product_id
      and warehouseid = v_warehouse_id;

   if sql%rowcount = 0 then
      raise_application_error(
         -20006,
         'Không tìm thấy bản ghi tồn kho để cập nhật cho sản phẩm ID='
         || v_product_id
         || ' tại kho ID='
         || v_warehouse_id
         || '.'
      );
   end if;
end;
/

-- C14: Hàng hoàn trả phải được kiểm định trước khi nhập kho
create or replace trigger trg_check_qc_status before
   insert or update of actiontaken,qc_status on returndetail
   for each row
begin
   if
      :new.actiontaken = 'Nhập lại kho'
      and :new.qc_status is null
   then
      raise_application_error(
         -20007,
         'Hàng hoàn trả phải được kiểm định (QC_Status) trước khi nhập lại kho.'
      );
   end if;
end;
/

-- C15: Tự động cập nhật tồn kho khi hoàn trả hàng được nhập lại kho
create or replace trigger trg_update_inventory_return after
   update of actiontaken on returndetail
   for each row
   when ( new.actiontaken = 'Nhập lại kho'
      and old.actiontaken != 'Nhập lại kho' )
declare
   v_target_warehouse number;
begin
   v_target_warehouse := :new.targetwarehouseid;
   update detailinventory
      set realstock = realstock + :new.quantity,
          availablestock = availablestock + :new.quantity
    where productid = :new.productid
      and warehouseid = v_target_warehouse;

   if sql%rowcount = 0 then
      raise_application_error(
         -20008,
         'Không tìm thấy bản ghi tồn kho để nhập hàng hoàn trả.'
      );
   end if;
end;
/

-- C16: Không tạo trùng thông báo thiếu hàng chưa đọc
create or replace trigger trg_check_duplicate_notification before
   insert on notification
   for each row
declare
   v_count number;
begin
   if
      :new.type = 1
      and :new.status = 0
   then
      select count(*)
        into v_count
        from notification
       where type = 1
         and status = 0
         and productid = :new.productid;

      if v_count > 0 then
         raise_application_error(
            -20009,
            'Đã tồn tại thông báo thiếu hàng chưa đọc cho sản phẩm này.'
         );
      end if;
   end if;
end;
/

-- C17: Tên sản phẩm không được trùng trong cùng danh mục
create or replace trigger trg_check_unique_product_name before
   insert or update of productname,categoryid on product
   for each row
declare
   v_count number;
begin
   select count(*)
     into v_count
     from product
    where categoryid = :new.categoryid
      and productname = :new.productname
      and productid != nvl(
      :new.productid,
      -1
   );

   if v_count > 0 then
      raise_application_error(
         -20010,
         'Tên sản phẩm "'
         || :new.productname
         || '" đã tồn tại trong cùng danh mục.'
      );
   end if;
end;
/

-- C18: Sản phẩm trong Combo phải ở trạng thái đang kinh doanh
create or replace trigger trg_check_combo_product_status before
   insert or update of productid on combodetail
   for each row
declare
   v_status number;
begin
   select productstatus
     into v_status
     from product
    where productid = :new.productid;

   if v_status != 1 then
      raise_application_error(
         -20011,
         'Sản phẩm ID='
         || :new.productid
         || ' đã ngừng kinh doanh, không thể thêm vào combo.'
      );
   end if;
end;
/

-- C21: Số tiền hoàn trả không vượt quá số tiền đã thanh toán
create or replace trigger trg_check_refund_amount before
   insert or update of totalrefund on orderreturn
   for each row
declare
   v_total_paid number := 0;
begin
   select nvl(
      sum(p.amountpaid),
      0
   )
     into v_total_paid
     from payment p
     join orders o
   on p.invoiceid = o.invoiceid
    where o.orderid = :new.orderid;

   if :new.totalrefund > v_total_paid then
      raise_application_error(
         -20012,
         'Số tiền hoàn trả ('
         || :new.totalrefund
         || ') vượt quá số tiền đã thanh toán ('
         || v_total_paid
         || ').'
      );
   end if;
end;
/

-- C23: Không thể hoàn trả đơn hàng chưa giao
create or replace trigger trg_check_return_order_status before
   insert on orderreturn
   for each row
declare
   v_status number;
begin
   select orderstatus
     into v_status
     from orders
    where orderid = :new.orderid;

   if v_status not in ( 3,
                        5 ) then
      raise_application_error(
         -20013,
         'Chỉ được hoàn trả đơn hàng đã giao thành công hoặc đã hoàn tất. Trạng thái hiện tại: ' || v_status
      );
   end if;
end;
/

-- C24: Hóa đơn phải có tối thiểu 1 sản phẩm hoặc 1 combo
create or replace trigger trg_check_order_has_items before
   update of orderstatus on orders
   for each row
   when ( new.orderstatus in ( 1,
                               2 ) )
declare
   v_count number;
begin
   select count(*)
     into v_count
     from orderdetail
    where orderid = :new.orderid
      and ( productid is not null
       or comboid is not null );

   if v_count = 0 then
      raise_application_error(
         -20014,
         'Đơn hàng phải có ít nhất một sản phẩm hoặc combo.'
      );
   end if;
end;
/

-- C25: Tồn kho khả dụng không thể lớn hơn tồn kho thực tế
create or replace trigger trg_check_available_stock before
   insert or update of availablestock,realstock on detailinventory
   for each row
begin
   if :new.availablestock > :new.realstock then
      raise_application_error(
         -20015,
         'Tồn kho khả dụng ('
         || :new.availablestock
         || ') không thể lớn hơn tồn kho thực tế ('
         || :new.realstock
         || ').'
      );
   end if;
end;
/
-- C26: Phương thức thanh toán không được thay đổi sau khi thanh toán
create or replace trigger trg_lock_payment_method before
   update of paymentmethodid on payment
   for each row
begin
   if
      :old.paymentdate is not null
      and :new.paymentmethodid != :old.paymentmethodid
   then
      raise_application_error(
         -20016,
         'Không thể thay đổi phương thức thanh toán sau khi giao dịch đã hoàn tất.'
      );
   end if;
end;
/

-- C27: Tự động tạo cảnh báo khi tồn kho khả dụng ≤ ngưỡng tối thiểu
create or replace trigger trg_alert_reorder_point after
   update of availablestock on detailinventory
   for each row
   when ( new.availablestock <= new.minstock
      and old.availablestock > old.minstock )
declare
   v_exists number;
begin
    -- Kiểm tra xem đã có thông báo chưa đọc chưa
   select count(*)
     into v_exists
     from notification
    where type = 1
      and status = 0
      and productid = :new.productid;

   if v_exists = 0 then
      insert into notification (
         employeeid,
         title,
         productid,
         message,
         type,
         status,
         createddate
      ) values ( 2, -- ID của thủ kho (có thể thay đổi)
                 'Cảnh báo tồn kho thấp',
                 :new.productid,
                 'Sản phẩm ID '
                 || :new.productid
                 || ' chỉ còn '
                 || :new.availablestock
                 || ' đơn vị.',
                 1,
                 0,
                 sysdate );
   end if;
end;
/

-- C28: Tự động hoàn trả tồn kho khả dụng khi đơn hàng bị hủy
create or replace trigger trg_restore_stock_on_cancel after
   update of orderstatus on orders
   for each row
   when ( new.orderstatus = 4
      and old.orderstatus != 4 )
declare
   v_warehouse_id number;
   v_has_shipping number;
begin
    -- Xác định loại đơn hàng
   v_has_shipping :=
      case
         when :new.shipcode is not null
             or :new.shipcompanyid is not null then
            1
         else
            0
      end;
   v_warehouse_id :=
      case
         when v_has_shipping = 1 then
            1
         else
            2
      end;

    -- Cập nhật AvailableStock cho từng sản phẩm trong đơn hàng
   for rec in (
      select productid,
             quantity
        from orderdetail
       where orderid = :new.orderid
   ) loop
      update detailinventory
         set
         availablestock = availablestock + rec.quantity
       where productid = rec.productid
         and warehouseid = v_warehouse_id;

      if sql%rowcount = 0 then
         raise_application_error(
            -20017,
            'Không tìm thấy bản ghi tồn kho để hoàn trả cho sản phẩm ID=' || rec.productid
         );
      end if;
   end loop;
end;
/

-- C29: Cập nhật trạng thái Invoice thành "Đã thanh toán" khi thanh toán đủ

-- Tạo compound trigger mới
create or replace trigger trg_update_invoice_status_paid for
   insert or update of amountpaid on payment
compound trigger

    -- Biến lưu các InvoiceID cần cập nhật (dùng collection)
   type t_invoiceids is
      table of number;
   v_invoiceids t_invoiceids := t_invoiceids();

    -- ========== AFTER EACH ROW ==========
   after each row is begin
        -- Thêm InvoiceID vào danh sách cần xử lý
      v_invoiceids.extend;
      v_invoiceids(v_invoiceids.count) := :new.invoiceid;
   end after each row;

    -- ========== AFTER STATEMENT ==========
   after statement is
      v_totalpaid   number(
         19,
         4
      );
      v_finalamount number(
         19,
         4
      );
   begin
        -- Loại bỏ trùng lặp (nếu một hóa đơn có nhiều dòng thanh toán được thêm/cập nhật cùng lúc)
      v_invoiceids := v_invoiceids multiset union distinct v_invoiceids;

        -- Duyệt từng hóa đơn và cập nhật trạng thái
      for i in 1..v_invoiceids.count loop
            -- Tính tổng tiền đã thanh toán
         select nvl(
            sum(amountpaid),
            0
         )
           into v_totalpaid
           from payment
          where invoiceid = v_invoiceids(i);

            -- Lấy số tiền cần thanh toán
         select finalamount
           into v_finalamount
           from invoice
          where invoiceid = v_invoiceids(i);

            -- Cập nhật trạng thái hóa đơn
         if v_totalpaid >= v_finalamount then
            update invoice
               set
               status = 'Đã thanh toán'
             where invoiceid = v_invoiceids(i);
         end if;
      end loop;
   end after statement;
end trg_update_invoice_status_paid;
/

-- C30: Kiểm tra mã giảm giá còn hiệu lực khi áp dụng
create or replace trigger trg_check_discount_validity before
   insert or update on listdiscount
   for each row
declare
   v_start_date  date;
   v_expiry_date date;
   v_status      number;
   v_order_date  date;
begin
    -- Lấy thông tin mã giảm giá
   select startdate,
          expirydate,
          status
     into
      v_start_date,
      v_expiry_date,
      v_status
     from discount
    where discountid = :new.discountid;

    -- Lấy ngày tạo đơn hàng
   select createddate
     into v_order_date
     from orders
    where orderid = :new.orderid;

    -- Kiểm tra trạng thái (0: đang áp dụng)
   if v_status != 0 then
      raise_application_error(
         -20018,
         'Mã giảm giá (ID='
         || :new.discountid
         || ') không ở trạng thái đang áp dụng.'
      );
   end if;

    -- Kiểm tra thời hạn
   if v_order_date < v_start_date
   or v_order_date > v_expiry_date then
      raise_application_error(
         -20019,
         'Mã giảm giá (ID='
         || :new.discountid
         || ') đã hết hạn hoặc chưa có hiệu lực.'
      );
   end if;
exception
   when no_data_found then
      raise_application_error(
         -20020,
         'Mã giảm giá (ID='
         || :new.discountid
         || ') hoặc đơn hàng (ID='
         || :new.orderid
         || ') không tồn tại.'
      );
end;
/


-- C32: Các Order trong một Invoice phải cùng một CustomerID
create or replace trigger trg_invoice_same_customer before
   update of invoiceid on orders
   for each row
   when ( new.invoiceid is not null )
declare
   v_customer_id       number;
   v_existing_customer number;
   v_count             number;
begin
    -- Lấy CustomerID của Invoice
   select customerid
     into v_customer_id
     from invoice
    where invoiceid = :new.invoiceid;

    -- Kiểm tra CustomerID của Order có khớp không
   if :new.customerid != v_customer_id then
      raise_application_error(
         -20020,
         'Đơn hàng có CustomerID='
         || :new.customerid
         || ' không khớp với CustomerID='
         || v_customer_id
         || ' của hóa đơn.'
      );
   end if;

    -- Kiểm tra các Order khác trong cùng Invoice
   select count(*)
     into v_count
     from orders
    where invoiceid = :new.invoiceid
      and customerid != :new.customerid
      and orderid != :new.orderid;

   if v_count > 0 then
      raise_application_error(
         -20021,
         'Tồn tại đơn hàng khác trong hóa đơn có CustomerID không đồng nhất.'
      );
   end if;
end;
/

create or replace trigger trg_update_customer_spending for
   insert or update of status,finalamount on invoice
compound trigger

    -- Biến lưu các CustomerID cần cập nhật (dùng collection)
   type t_custids is
      table of number;
   v_custids t_custids := t_custids();

    -- ========== AFTER EACH ROW ==========
   after each row is begin
        -- Xác định xem có cần cập nhật không
      if inserting then
         if :new.status = 'Đã thanh toán' then
            v_custids.extend;
            v_custids(v_custids.count) := :new.customerid;
         end if;
      elsif updating then
         if (
            :old.status != :new.status
            and :new.status = 'Đã thanh toán'
         )   -- Chuyển sang thanh toán
         or (
            :old.status = 'Đã thanh toán'
            and :new.status != 'Đã thanh toán'
         ) -- Mất trạng thái thanh toán
         or (
            :old.finalamount != :new.finalamount
            and :new.status = 'Đã thanh toán'
         ) -- Số tiền thay đổi
          then
            v_custids.extend;
            v_custids(v_custids.count) := :new.customerid;
         end if;
      end if;
   end after each row;

    -- ========== AFTER STATEMENT ==========
   after statement is
      v_total number(
         19,
         4
      );
   begin
        -- Loại bỏ trùng lặp (nếu một khách hàng có nhiều dòng thay đổi)
      v_custids := v_custids multiset union distinct v_custids;

        -- Duyệt từng khách hàng và cập nhật tổng chi tiêu
      for i in 1..v_custids.count loop
         select nvl(
            sum(finalamount),
            0
         )
           into v_total
           from invoice
          where customerid = v_custids(i)
            and status = 'Đã thanh toán';

         update customer
            set
            totalaccumulatedspent = v_total
          where customerid = v_custids(i);
      end loop;
   end after statement;
end trg_update_customer_spending;
/
-- Khách hàng ở loại khách hàng cao hơn sẽ được sử dụng các chương trình khuyến mãi yêu cầu hạng thấp hơn, nhưng không ngược lại. 
create or replace trigger trg_check_discount_customer_type before
   insert or update on listdiscount
   for each row
declare
   v_cust_type_id  number;
   v_disc_type_id  number;
   v_cust_spending number;
   v_disc_spending number;
   v_order_cust_id number;
begin
    -- Lấy CustomerID từ Order
   select customerid
     into v_order_cust_id
     from orders
    where orderid = :new.orderid;

    -- Lấy CustomerTypeID của khách hàng
   select customertypeid
     into v_cust_type_id
     from customer
    where customerid = v_order_cust_id;

    -- Lấy CustomerTypeID của Discount
   select customertypeid
     into v_disc_type_id
     from discount
    where discountid = :new.discountid;

    -- Nếu Discount không yêu cầu loại khách hàng (NULL) thì ai cũng được dùng
   if v_disc_type_id is null then
      return;
   end if;

    -- Nếu Discount có yêu cầu loại khách hàng mà khách hàng không có loại (NULL) thì từ chối
   if v_cust_type_id is null then
      raise_application_error(
         -20030,
         'Khách hàng chưa được phân hạng, không thể sử dụng mã giảm giá có điều kiện.'
      );
   end if;

    -- Lấy SpendingLimit của hai loại để so sánh
   select spendinglimit
     into v_cust_spending
     from customertype
    where customertypeid = v_cust_type_id;

   select spendinglimit
     into v_disc_spending
     from customertype
    where customertypeid = v_disc_type_id;

    -- Khách chỉ được dùng nếu hạng của khách >= hạng yêu cầu của mã
   if v_cust_spending < v_disc_spending then
      raise_application_error(
         -20031,
         'Khách hàng hạng '
         || v_cust_type_id
         || ' không đủ điều kiện sử dụng mã giảm giá yêu cầu hạng '
         || v_disc_type_id
         || '.'
      );
   end if;

end;
/