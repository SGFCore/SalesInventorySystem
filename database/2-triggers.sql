alter session set container = freepdb1;
alter session set current_schema = sgf_admin;

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


-- C12: Tự động cập nhật tồn kho khả dụng khi thêm/sửa/xóa chi tiết đơn hàng
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

-- C13: Tự động cập nhật tồn kho khi hoàn trả hàng được nhập lại kho
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


-- C14: Hóa đơn phải có tối thiểu 1 sản phẩm hoặc 1 combo
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


-- C15: Sản phẩm trong Combo phải ở trạng thái đang kinh doanh
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


-- C16: Tự động tạo cảnh báo khi tồn kho khả dụng ≤ ngưỡng tối thiểu
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

-- C18: Tự động hoàn trả tồn kho khả dụng khi đơn hàng bị hủy
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


-- C21: Tự động phân hạng khách hàng theo tổng chi tiêu
create or replace trigger trg_customer_type_upgrade before
   update of totalaccumulatedspent on customer
   for each row
declare
   v_new_type number;
begin
    -- Tìm loại khách hàng cao nhất mà SpendingLimit <= tổng chi tiêu mới
   begin
      select customertypeid
        into v_new_type
        from (
         select customertypeid
           from customertype
          where spendinglimit <= :new.totalaccumulatedspent
          order by spendinglimit desc
      )
       where rownum = 1;
   exception
      when no_data_found then
            -- Không tìm thấy (trường hợp hiếm) → gán loại thấp nhất (Bronze)
         select min(customertypeid)
           into v_new_type
           from customertype;
   end;

   :new.customertypeid := v_new_type;
end;
/


-- C22: UPDATE GIÁ CỦA COMBO KHI THÊM 1 COMBO VỚI GIÁ COMBO = 0.9 (TỔNG GIÁ SẢN PHẨM)
create or replace trigger trg_update_combo_price for
   insert or update or delete on combodetail
compound trigger
   type t_comboids is
      table of number;
   v_comboids t_comboids := t_comboids();
   after each row is begin
      if inserting then
         v_comboids.extend;
         v_comboids(v_comboids.count) := :new.comboid;
      elsif updating then
         v_comboids.extend;
         v_comboids(v_comboids.count) := :new.comboid;
      elsif deleting then
         v_comboids.extend;
         v_comboids(v_comboids.count) := :old.comboid;
      end if;
   end after each row;
   after statement is
      v_total_price number(
         19,
         4
      );
   begin
      v_comboids := v_comboids multiset union distinct v_comboids;
      for i in 1..v_comboids.count loop
         select nvl(
            sum(p.productprice * cd.quantity),
            0
         )
           into v_total_price
           from combodetail cd
           join product p
         on cd.productid = p.productid
          where cd.comboid = v_comboids(i);

         update combo
            set
            comboprice = v_total_price * 0.9
          where comboid = v_comboids(i);
      end loop;
   end after statement;
end trg_update_combo_price;
/


-- C23: CẬP NHẬT TỔNG CHI TIÊU CỦA KHÁCH HÀNG
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

-- C24: KIỂM TRA MÃ KHUYẾN MÃI PHÙ HỢP VỚI LOẠI KHÁCH HÀNG
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


-- C26: CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG PHÙ HỢP VỚI TRẠNG THÁI VẬN CHUYỂN
create or replace trigger trg_order_status_by_shipping before
   insert or update of shippingstatus on orders
   for each row
begin
   if :new.shippingstatus = 0 then
      :new.orderstatus := 0;   -- Chờ xác nhận
   elsif :new.shippingstatus in ( 1,
                                  4 ) then
      :new.orderstatus := 1;   -- Đã xác nhận (đang chuẩn bị hàng)
   elsif :new.shippingstatus = 2 then
      :new.orderstatus := 2;   -- Đang giao
   elsif :new.shippingstatus = 3 then
      :new.orderstatus := 4;   -- Đã hủy (khách từ chối giao)
   end if;
end;
/

-- TRIGGER TẠO HÓA ĐƠN TỰ ĐỘNG KHI THÊM ĐƠN HÀNG MỚI 
-- create or replace trigger trg_create_invoice_for_order before
--    insert on orders
--    for each row
--    when ( new.invoiceid is null
--       and new.shipcode is null
--       and new.shipcompanyid is null )
-- declare
--    v_new_invoice_id number;
-- begin
--     -- Chèn hóa đơn mới với SaleChannelCode = 0 (tại quầy)
--    insert into invoice (
--       customerid,
--       employeeid,
--       salechannelcode,
--       totalamount,
--       taxamount,
--       finalamount,
--       status,
--       invoicedate
--    ) values ( :new.customerid,
--               :new.employeeid,
--               0,                         -- Hóa đơn tại quầy
--               :new.totalamount,
--               0,                         -- TaxAmount
--               :new.totalamount,          -- FinalAmount (bằng TotalAmount vì chưa có thuế)
--               'Đã thanh toán',          -- Trạng thái mặc định
--               sysdate ) returning invoiceid into v_new_invoice_id;   -- Lấy ID của hóa đơn vừa tạo

--     -- Gán InvoiceID cho đơn hàng hiện tại
--    :new.invoiceid := v_new_invoice_id;
-- end;
-- /