ALTER SESSION SET CONTAINER = FREEPDB1;
ALTER SESSION SET CURRENT_SCHEMA = sgf_admin;

-- Code ở phía sau 2 dòng lệnh trên

-- =============================================
-- TRIGGER
-- =============================================

-- C11: Số lượng đặt hàng không vượt quá tồn kho khả dụng
CREATE OR REPLACE TRIGGER trg_check_order_quantity
BEFORE INSERT OR UPDATE OF Quantity, ProductID ON OrderDetail
FOR EACH ROW
WHEN (NEW.ProductID IS NOT NULL)   -- Chỉ kiểm tra nếu là sản phẩm đơn
DECLARE
    v_available    NUMBER;
    v_warehouse_id NUMBER;
    v_has_shipping NUMBER;
BEGIN
    -- Xác định có phải đơn online không
    SELECT CASE WHEN o.ShipCode IS NOT NULL OR o.ShipCompanyID IS NOT NULL THEN 1 ELSE 0 END
    INTO v_has_shipping
    FROM Orders o
    WHERE o.OrderID = :NEW.OrderID;

    -- Chọn kho tương ứng: có vận chuyển -> kho gốc (1), không -> kho trực tiếp (2)
    v_warehouse_id := CASE WHEN v_has_shipping = 1 THEN 1 ELSE 2 END;

    -- Lấy tồn kho khả dụng
    SELECT AvailableStock
    INTO v_available
    FROM DetailInventory
    WHERE ProductID = :NEW.ProductID AND WarehouseID = v_warehouse_id;

    IF :NEW.Quantity > v_available THEN
        RAISE_APPLICATION_ERROR(-20001,
            'Số lượng đặt hàng (' || :NEW.Quantity || ') vượt quá tồn kho khả dụng (' || v_available || ').');
    END IF;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20002,
            'Không tìm thấy bản ghi tồn kho cho sản phẩm ID=' || :NEW.ProductID || ' tại kho ID=' || v_warehouse_id || '.');
END;
/

-- C12: Số lượng hoàn trả không vượt quá số lượng đã mua
CREATE OR REPLACE TRIGGER trg_check_return_quantity
BEFORE INSERT OR UPDATE OF Quantity, ProductID, ReturnID ON ReturnDetail
FOR EACH ROW
DECLARE
    v_ordered_qty  NUMBER;
    v_returned_qty NUMBER := 0;
    v_order_id     NUMBER;
BEGIN
    -- Lấy OrderID từ phiếu hoàn trả
    SELECT r.OrderID INTO v_order_id
    FROM OrderReturn r
    WHERE r.ReturnID = :NEW.ReturnID;

    -- Lấy số lượng đã mua từ OrderDetail
    SELECT od.Quantity INTO v_ordered_qty
    FROM OrderDetail od
    WHERE od.OrderID = v_order_id AND od.ProductID = :NEW.ProductID;

    -- Tính tổng số lượng đã hoàn trả cho sản phẩm này (không tính dòng hiện tại)
    SELECT NVL(SUM(rd.Quantity), 0) INTO v_returned_qty
    FROM ReturnDetail rd
    JOIN OrderReturn r ON rd.ReturnID = r.ReturnID
    WHERE r.OrderID = v_order_id
      AND rd.ProductID = :NEW.ProductID
      AND rd.ReturnID != :NEW.ReturnID;

    IF v_returned_qty + :NEW.Quantity > v_ordered_qty THEN
        RAISE_APPLICATION_ERROR(-20003,
            'Tổng số lượng hoàn trả (' || (v_returned_qty + :NEW.Quantity) ||
            ') vượt quá số lượng đã mua (' || v_ordered_qty || ').');
    END IF;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20004,
            'Không tìm thấy đơn hàng hoặc chi tiết đơn hàng tương ứng.');
END;
/

-- C13: Tự động cập nhật tồn kho khả dụng khi thêm/sửa/xóa chi tiết đơn hàng
CREATE OR REPLACE TRIGGER trg_update_inventory_orderdetail
AFTER INSERT OR UPDATE OF Quantity, ProductID OR DELETE ON OrderDetail
FOR EACH ROW
DECLARE
    v_warehouse_id NUMBER;
    v_has_shipping NUMBER;
    v_old_qty      NUMBER := 0;
    v_new_qty      NUMBER := 0;
    v_order_id     NUMBER;
    v_product_id   NUMBER;
BEGIN
    -- Xác định OrderID và ProductID
    IF INSERTING THEN
        v_order_id := :NEW.OrderID;
        v_product_id := :NEW.ProductID;
        v_new_qty := :NEW.Quantity;
    ELSIF UPDATING THEN
        v_order_id := :NEW.OrderID;
        v_product_id := :NEW.ProductID;
        v_old_qty := :OLD.Quantity;
        v_new_qty := :NEW.Quantity;
    ELSIF DELETING THEN
        v_order_id := :OLD.OrderID;
        v_product_id := :OLD.ProductID;
        v_old_qty := :OLD.Quantity;
    END IF;

    -- Xác định loại đơn hàng (online hay tại quầy)
    BEGIN
        SELECT CASE WHEN o.ShipCode IS NOT NULL OR o.ShipCompanyID IS NOT NULL THEN 1 ELSE 0 END
        INTO v_has_shipping
        FROM Orders o
        WHERE o.OrderID = v_order_id;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20005, 'Đơn hàng không tồn tại.');
    END;

    v_warehouse_id := CASE WHEN v_has_shipping = 1 THEN 1 ELSE 2 END;

    -- Cập nhật AvailableStock
    UPDATE DetailInventory
    SET AvailableStock = AvailableStock - (v_new_qty - v_old_qty)
    WHERE ProductID = v_product_id AND WarehouseID = v_warehouse_id;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20006,
            'Không tìm thấy bản ghi tồn kho để cập nhật cho sản phẩm ID=' ||
            v_product_id || ' tại kho ID=' || v_warehouse_id || '.');
    END IF;
END;
/

-- C14: Hàng hoàn trả phải được kiểm định trước khi nhập kho
CREATE OR REPLACE TRIGGER trg_check_qc_status
BEFORE INSERT OR UPDATE OF ActionTaken, QC_Status ON ReturnDetail
FOR EACH ROW
BEGIN
    IF :NEW.ActionTaken = 'Nhập lại kho' AND :NEW.QC_Status IS NULL THEN
        RAISE_APPLICATION_ERROR(-20007,
            'Hàng hoàn trả phải được kiểm định (QC_Status) trước khi nhập lại kho.');
    END IF;
END;
/

-- C15: Tự động cập nhật tồn kho khi hoàn trả hàng được nhập lại kho
CREATE OR REPLACE TRIGGER trg_update_inventory_return
AFTER UPDATE OF ActionTaken ON ReturnDetail
FOR EACH ROW
WHEN (NEW.ActionTaken = 'Nhập lại kho' AND OLD.ActionTaken != 'Nhập lại kho')
DECLARE
    v_target_warehouse NUMBER;
BEGIN
    v_target_warehouse := :NEW.TargetWarehouseID;

    UPDATE DetailInventory
    SET RealStock      = RealStock + :NEW.Quantity,
        AvailableStock = AvailableStock + :NEW.Quantity
    WHERE ProductID = :NEW.ProductID AND WarehouseID = v_target_warehouse;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20008,
            'Không tìm thấy bản ghi tồn kho để nhập hàng hoàn trả.');
    END IF;
END;
/

-- C16: Không tạo trùng thông báo thiếu hàng chưa đọc
CREATE OR REPLACE TRIGGER trg_check_duplicate_notification
BEFORE INSERT ON Notification
FOR EACH ROW
DECLARE
    v_count NUMBER;
BEGIN
    IF :NEW.Type = 1 AND :NEW.Status = 0 THEN
        SELECT COUNT(*)
        INTO v_count
        FROM Notification
        WHERE Type = 1 AND Status = 0 AND ProductID = :NEW.ProductID;

        IF v_count > 0 THEN
            RAISE_APPLICATION_ERROR(-20009,
                'Đã tồn tại thông báo thiếu hàng chưa đọc cho sản phẩm này.');
        END IF;
    END IF;
END;
/

-- C17: Tên sản phẩm không được trùng trong cùng danh mục
CREATE OR REPLACE TRIGGER trg_check_unique_product_name
BEFORE INSERT OR UPDATE OF ProductName, CategoryID ON Product
FOR EACH ROW
DECLARE
    v_count NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO v_count
    FROM Product
    WHERE CategoryID = :NEW.CategoryID
      AND ProductName = :NEW.ProductName
      AND ProductID != NVL(:NEW.ProductID, -1);

    IF v_count > 0 THEN
        RAISE_APPLICATION_ERROR(-20010,
            'Tên sản phẩm "' || :NEW.ProductName || '" đã tồn tại trong cùng danh mục.');
    END IF;
END;
/

-- C18: Sản phẩm trong Combo phải ở trạng thái đang kinh doanh
CREATE OR REPLACE TRIGGER trg_check_combo_product_status
BEFORE INSERT OR UPDATE OF ProductID ON ComboDetail
FOR EACH ROW
DECLARE
    v_status NUMBER;
BEGIN
    SELECT ProductStatus INTO v_status
    FROM Product
    WHERE ProductID = :NEW.ProductID;

    IF v_status != 1 THEN
        RAISE_APPLICATION_ERROR(-20011,
            'Sản phẩm ID=' || :NEW.ProductID || ' đã ngừng kinh doanh, không thể thêm vào combo.');
    END IF;
END;
/

-- C21: Số tiền hoàn trả không vượt quá số tiền đã thanh toán
CREATE OR REPLACE TRIGGER trg_check_refund_amount
BEFORE INSERT OR UPDATE OF TotalRefund ON OrderReturn
FOR EACH ROW
DECLARE
    v_total_paid NUMBER := 0;
BEGIN
    SELECT NVL(SUM(p.AmountPaid), 0)
    INTO v_total_paid
    FROM Payment p
    JOIN Orders o ON p.InvoiceID = o.InvoiceID
    WHERE o.OrderID = :NEW.OrderID;

    IF :NEW.TotalRefund > v_total_paid THEN
        RAISE_APPLICATION_ERROR(-20012,
            'Số tiền hoàn trả (' || :NEW.TotalRefund ||
            ') vượt quá số tiền đã thanh toán (' || v_total_paid || ').');
    END IF;
END;
/

-- C23: Không thể hoàn trả đơn hàng chưa giao
CREATE OR REPLACE TRIGGER trg_check_return_order_status
BEFORE INSERT ON OrderReturn
FOR EACH ROW
DECLARE
    v_status NUMBER;
BEGIN
    SELECT OrderStatus INTO v_status
    FROM Orders
    WHERE OrderID = :NEW.OrderID;

    IF v_status NOT IN (3, 5) THEN
        RAISE_APPLICATION_ERROR(-20013,
            'Chỉ được hoàn trả đơn hàng đã giao thành công hoặc đã hoàn tất. Trạng thái hiện tại: ' || v_status);
    END IF;
END;
/

-- C24: Hóa đơn phải có tối thiểu 1 sản phẩm hoặc 1 combo
CREATE OR REPLACE TRIGGER trg_check_order_has_items
BEFORE UPDATE OF OrderStatus ON Orders
FOR EACH ROW
WHEN (NEW.OrderStatus IN (1, 2))
DECLARE
    v_count NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO v_count
    FROM OrderDetail
    WHERE OrderID = :NEW.OrderID
      AND (ProductID IS NOT NULL OR ComboID IS NOT NULL);

    IF v_count = 0 THEN
        RAISE_APPLICATION_ERROR(-20014,
            'Đơn hàng phải có ít nhất một sản phẩm hoặc combo.');
    END IF;
END;
/

-- C25: Tồn kho khả dụng không thể lớn hơn tồn kho thực tế
CREATE OR REPLACE TRIGGER trg_check_available_stock
BEFORE INSERT OR UPDATE OF AvailableStock, RealStock ON DetailInventory
FOR EACH ROW
BEGIN
    IF :NEW.AvailableStock > :NEW.RealStock THEN
        RAISE_APPLICATION_ERROR(-20015,
            'Tồn kho khả dụng (' || :NEW.AvailableStock ||
            ') không thể lớn hơn tồn kho thực tế (' || :NEW.RealStock || ').');
    END IF;
END;
/
-- C26: Phương thức thanh toán không được thay đổi sau khi thanh toán
CREATE OR REPLACE TRIGGER trg_lock_payment_method
BEFORE UPDATE OF PaymentMethodID ON Payment
FOR EACH ROW
BEGIN
    IF :OLD.PaymentDate IS NOT NULL AND :NEW.PaymentMethodID != :OLD.PaymentMethodID THEN
        RAISE_APPLICATION_ERROR(-20016,
            'Không thể thay đổi phương thức thanh toán sau khi giao dịch đã hoàn tất.');
    END IF;
END;
/

-- C27: Tự động tạo cảnh báo khi tồn kho khả dụng ≤ ngưỡng tối thiểu
CREATE OR REPLACE TRIGGER trg_alert_reorder_point
AFTER UPDATE OF AvailableStock ON DetailInventory
FOR EACH ROW
WHEN (NEW.AvailableStock <= NEW.MinStock AND OLD.AvailableStock > OLD.MinStock)
DECLARE
    v_exists NUMBER;
BEGIN
    -- Kiểm tra xem đã có thông báo chưa đọc chưa
    SELECT COUNT(*)
    INTO v_exists
    FROM Notification
    WHERE Type = 1 AND Status = 0 AND ProductID = :NEW.ProductID;

    IF v_exists = 0 THEN
        INSERT INTO Notification (EmployeeID, Title, ProductID, Message, Type, Status, CreatedDate)
        VALUES (
            2, -- ID của thủ kho (có thể thay đổi)
            'Cảnh báo tồn kho thấp',
            :NEW.ProductID,
            'Sản phẩm ID ' || :NEW.ProductID || ' chỉ còn ' || :NEW.AvailableStock || ' đơn vị.',
            1,
            0,
            SYSDATE
        );
    END IF;
END;
/

-- C28: Tự động hoàn trả tồn kho khả dụng khi đơn hàng bị hủy
CREATE OR REPLACE TRIGGER trg_restore_stock_on_cancel
AFTER UPDATE OF OrderStatus ON Orders
FOR EACH ROW
WHEN (NEW.OrderStatus = 4 AND OLD.OrderStatus != 4)
DECLARE
    v_warehouse_id NUMBER;
    v_has_shipping NUMBER;
BEGIN
    -- Xác định loại đơn hàng
    v_has_shipping := CASE WHEN :NEW.ShipCode IS NOT NULL OR :NEW.ShipCompanyID IS NOT NULL THEN 1 ELSE 0 END;
    v_warehouse_id := CASE WHEN v_has_shipping = 1 THEN 1 ELSE 2 END;

    -- Cập nhật AvailableStock cho từng sản phẩm trong đơn hàng
    FOR rec IN (SELECT ProductID, Quantity FROM OrderDetail WHERE OrderID = :NEW.OrderID) LOOP
        UPDATE DetailInventory
        SET AvailableStock = AvailableStock + rec.Quantity
        WHERE ProductID = rec.ProductID AND WarehouseID = v_warehouse_id;

        IF SQL%ROWCOUNT = 0 THEN
            RAISE_APPLICATION_ERROR(-20017,
                'Không tìm thấy bản ghi tồn kho để hoàn trả cho sản phẩm ID=' || rec.ProductID);
        END IF;
    END LOOP;
END;
/

-- C29: Cập nhật trạng thái Invoice thành "Đã thanh toán" khi thanh toán đủ

-- Tạo compound trigger mới
CREATE OR REPLACE TRIGGER TRG_UPDATE_INVOICE_STATUS_PAID
FOR INSERT OR UPDATE OF AmountPaid ON Payment
COMPOUND TRIGGER

    -- Biến lưu các InvoiceID cần cập nhật (dùng collection)
    TYPE t_InvoiceIDs IS TABLE OF NUMBER;
    v_InvoiceIDs t_InvoiceIDs := t_InvoiceIDs();

    -- ========== AFTER EACH ROW ==========
    AFTER EACH ROW IS
    BEGIN
        -- Thêm InvoiceID vào danh sách cần xử lý
        v_InvoiceIDs.EXTEND;
        v_InvoiceIDs(v_InvoiceIDs.COUNT) := :NEW.InvoiceID;
    END AFTER EACH ROW;

    -- ========== AFTER STATEMENT ==========
    AFTER STATEMENT IS
        v_TotalPaid   NUMBER(19,4);
        v_FinalAmount NUMBER(19,4);
    BEGIN
        -- Loại bỏ trùng lặp (nếu một hóa đơn có nhiều dòng thanh toán được thêm/cập nhật cùng lúc)
        v_InvoiceIDs := v_InvoiceIDs MULTISET UNION DISTINCT v_InvoiceIDs;

        -- Duyệt từng hóa đơn và cập nhật trạng thái
        FOR i IN 1 .. v_InvoiceIDs.COUNT LOOP
            -- Tính tổng tiền đã thanh toán
            SELECT NVL(SUM(AmountPaid), 0)
            INTO v_TotalPaid
            FROM Payment
            WHERE InvoiceID = v_InvoiceIDs(i);

            -- Lấy số tiền cần thanh toán
            SELECT FinalAmount
            INTO v_FinalAmount
            FROM Invoice
            WHERE InvoiceID = v_InvoiceIDs(i);

            -- Cập nhật trạng thái hóa đơn
            IF v_TotalPaid >= v_FinalAmount THEN
                UPDATE Invoice
                SET Status = 'Đã thanh toán'
                WHERE InvoiceID = v_InvoiceIDs(i);
            END IF;
        END LOOP;
    END AFTER STATEMENT;

END TRG_UPDATE_INVOICE_STATUS_PAID;
/

-- C30: Kiểm tra mã giảm giá còn hiệu lực khi áp dụng
CREATE OR REPLACE TRIGGER TRG_CHECK_DISCOUNT_VALIDITY
BEFORE INSERT OR UPDATE ON LISTDISCOUNT
FOR EACH ROW
DECLARE
    v_start_date  DATE;
    v_expiry_date DATE;
    v_status      NUMBER;
    v_order_date  DATE;
BEGIN
    -- Lấy thông tin mã giảm giá
    SELECT StartDate, ExpiryDate, Status
    INTO v_start_date, v_expiry_date, v_status
    FROM DISCOUNT
    WHERE DiscountID = :NEW.DiscountID;

    -- Lấy ngày tạo đơn hàng
    SELECT CreatedDate
    INTO v_order_date
    FROM ORDERS
    WHERE OrderID = :NEW.OrderID;

    -- Kiểm tra trạng thái (0: đang áp dụng)
    IF v_status != 0 THEN
        RAISE_APPLICATION_ERROR(-20018,
            'Mã giảm giá (ID=' || :NEW.DiscountID || ') không ở trạng thái đang áp dụng.');
    END IF;

    -- Kiểm tra thời hạn
    IF v_order_date < v_start_date OR v_order_date > v_expiry_date THEN
        RAISE_APPLICATION_ERROR(-20019,
            'Mã giảm giá (ID=' || :NEW.DiscountID || ') đã hết hạn hoặc chưa có hiệu lực.');
    END IF;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20020,
            'Mã giảm giá (ID=' || :NEW.DiscountID || ') hoặc đơn hàng (ID=' || :NEW.OrderID || ') không tồn tại.');
END;
/


-- C32: Các Order trong một Invoice phải cùng một CustomerID
CREATE OR REPLACE TRIGGER trg_invoice_same_customer
BEFORE UPDATE OF InvoiceID ON Orders
FOR EACH ROW
WHEN (NEW.InvoiceID IS NOT NULL)
DECLARE
    v_customer_id NUMBER;
    v_existing_customer NUMBER;
    v_count NUMBER;
BEGIN
    -- Lấy CustomerID của Invoice
    SELECT CustomerID INTO v_customer_id
    FROM Invoice
    WHERE InvoiceID = :NEW.InvoiceID;

    -- Kiểm tra CustomerID của Order có khớp không
    IF :NEW.CustomerID != v_customer_id THEN
        RAISE_APPLICATION_ERROR(-20020,
            'Đơn hàng có CustomerID=' || :NEW.CustomerID ||
            ' không khớp với CustomerID=' || v_customer_id || ' của hóa đơn.');
    END IF;

    -- Kiểm tra các Order khác trong cùng Invoice
    SELECT COUNT(*)
    INTO v_count
    FROM Orders
    WHERE InvoiceID = :NEW.InvoiceID
      AND CustomerID != :NEW.CustomerID
      AND OrderID != :NEW.OrderID;

    IF v_count > 0 THEN
        RAISE_APPLICATION_ERROR(-20021,
            'Tồn tại đơn hàng khác trong hóa đơn có CustomerID không đồng nhất.');
    END IF;
END;
/

CREATE OR REPLACE TRIGGER TRG_UPDATE_CUSTOMER_SPENDING
FOR INSERT OR UPDATE OF Status, FinalAmount ON Invoice
COMPOUND TRIGGER

    -- Biến lưu các CustomerID cần cập nhật (dùng collection)
    TYPE t_CustIDs IS TABLE OF NUMBER;
    v_CustIDs t_CustIDs := t_CustIDs();

    -- ========== AFTER EACH ROW ==========
    AFTER EACH ROW IS
    BEGIN
        -- Xác định xem có cần cập nhật không
        IF INSERTING THEN
            IF :NEW.Status = 'Đã thanh toán' THEN
                v_CustIDs.EXTEND;
                v_CustIDs(v_CustIDs.COUNT) := :NEW.CustomerID;
            END IF;
        ELSIF UPDATING THEN
            IF (:OLD.Status != :NEW.Status AND :NEW.Status = 'Đã thanh toán')   -- Chuyển sang thanh toán
               OR (:OLD.Status = 'Đã thanh toán' AND :NEW.Status != 'Đã thanh toán') -- Mất trạng thái thanh toán
               OR (:OLD.FinalAmount != :NEW.FinalAmount AND :NEW.Status = 'Đã thanh toán') -- Số tiền thay đổi
            THEN
                v_CustIDs.EXTEND;
                v_CustIDs(v_CustIDs.COUNT) := :NEW.CustomerID;
            END IF;
        END IF;
    END AFTER EACH ROW;

    -- ========== AFTER STATEMENT ==========
    AFTER STATEMENT IS
        v_Total NUMBER(19,4);
    BEGIN
        -- Loại bỏ trùng lặp (nếu một khách hàng có nhiều dòng thay đổi)
        v_CustIDs := v_CustIDs MULTISET UNION DISTINCT v_CustIDs;

        -- Duyệt từng khách hàng và cập nhật tổng chi tiêu
        FOR i IN 1 .. v_CustIDs.COUNT LOOP
            SELECT NVL(SUM(FinalAmount), 0)
            INTO v_Total
            FROM Invoice
            WHERE CustomerID = v_CustIDs(i)
              AND Status = 'Đã thanh toán';

            UPDATE Customer
            SET TotalAccumulatedSpent = v_Total
            WHERE CustomerID = v_CustIDs(i);
        END LOOP;
    END AFTER STATEMENT;

END TRG_UPDATE_CUSTOMER_SPENDING;
/
