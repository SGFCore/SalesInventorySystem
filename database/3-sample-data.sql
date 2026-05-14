-- =============================================
-- DỮ LIỆU MẪU CHO HỆ THỐNG SGF
-- =============================================

-- 1. CUSTOMERTYPE (không FK)
INSERT ALL
  INTO CUSTOMERTYPE (CustomerTypeName, Discount, Detail, SpendingLimit)
    VALUES ('Bronze', 0, N'Khách hàng thông thường', 0)
  INTO CUSTOMERTYPE (CustomerTypeName, Discount, Detail, SpendingLimit)
    VALUES ('Silver', 5, N'Khách hàng thân thiết', 5000000)
  INTO CUSTOMERTYPE (CustomerTypeName, Discount, Detail, SpendingLimit)
    VALUES ('Gold', 10, N'Khách hàng VIP', 20000000)
  INTO CUSTOMERTYPE (CustomerTypeName, Discount, Detail, SpendingLimit)
    VALUES ('VIP', 15, N'Nhà hảo tâm / ủng hộ thường xuyên', 50000000)
SELECT * FROM DUAL;

-- 2. ROLE (không FK)
INSERT ALL
  INTO ROLE (RoleID, RoleName) VALUES (0, 'Admin')
  INTO ROLE (RoleID, RoleName) VALUES (1, N'Thủ kho')
  INTO ROLE (RoleID, RoleName) VALUES (2, N'Kế toán')
SELECT * FROM DUAL;

-- 3. CATEGORY (không FK)
INSERT ALL
  INTO CATEGORY (CategoryName) VALUES (N'Túi xách / Ví')
  INTO CATEGORY (CategoryName) VALUES (N'Khẩu trang')
  INTO CATEGORY (CategoryName) VALUES (N'Xà phòng')
  INTO CATEGORY (CategoryName) VALUES (N'Nghệ thuật Napkin')
  INTO CATEGORY (CategoryName) VALUES (N'Miếng lót ly')
  INTO CATEGORY (CategoryName) VALUES (N'Quần jean')
  INTO CATEGORY (CategoryName) VALUES (N'Sản phẩm thêu')
  INTO CATEGORY (CategoryName) VALUES (N'Combo quà')
SELECT * FROM DUAL;

-- 4. EMPLOYEE (không FK)
INSERT ALL
  INTO EMPLOYEE (Fullname, Email, Phone, PasswordHash, Status)
    VALUES (N'Nguyễn Văn Hòa', 'hoa.nguyen@sgf.vn', '0988111222', 'hashed_admin', 1)
  INTO EMPLOYEE (Fullname, Email, Phone, PasswordHash, Status)
    VALUES (N'Trần Thị Nhân Ái', 'ai.tran@sgf.vn', '0988222333', 'hashed_kho', 1)
  INTO EMPLOYEE (Fullname, Email, Phone, PasswordHash, Status)
    VALUES (N'Lê Thị Kế Toán', 'ketoan.le@sgf.vn', '0988333444', 'hashed_kt', 1)
SELECT * FROM DUAL;

-- 5. EMPLOYEEROLE (phụ thuộc EMPLOYEE, ROLE)
INSERT ALL
  INTO EMPLOYEEROLE (EmployeeID, RoleID) VALUES (1, 0)
  INTO EMPLOYEEROLE (EmployeeID, RoleID) VALUES (2, 1)
  INTO EMPLOYEEROLE (EmployeeID, RoleID) VALUES (3, 2)
SELECT * FROM DUAL;

-- 6. WAREHOUSE (phụ thuộc EMPLOYEE)
INSERT ALL
  INTO WAREHOUSE (WareHouseName, ManagerID, Address, ContactNumber, Capacity, Status, WarehouseType)
    VALUES (N'Kho tổng SGF', 2, N'123 Láng Hạ, Đống Đa, Hà Nội', '02435551234', 5000, 1, 2)
  INTO WAREHOUSE (WareHouseName, ManagerID, Address, ContactNumber, Capacity, Status, WarehouseType)
    VALUES (N'Kho bán hàng SGF', 2, N'45 Trần Duy Hưng, Cầu Giấy, Hà Nội', '02435556789', 500, 1, 1)
  INTO WAREHOUSE (WareHouseName, ManagerID, Address, ContactNumber, Capacity, Status, WarehouseType)
    VALUES (N'Kho tái chế SGF', 2, N'78 Giải Phóng, Hai Bà Trưng', '02435554321', 200, 1, 3)
SELECT * FROM DUAL;

-- 7. PRODUCTTYPE (phụ thuộc CATEGORY)
-- Danh mục con theo đúng mô tả
INSERT ALL
  -- Túi xách / Ví (CategoryID=1)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Túi tote', 1)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Túi xách vải handmade', 1)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Ví handmade', 1)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Túi xách jean quai quần', 1)
  -- Khẩu trang (CategoryID=2)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Khẩu trang vải', 2)
  -- Xà phòng (CategoryID=3)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Xà phòng handmade', 3)
  -- Nghệ thuật Napkin (CategoryID=4)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Khung hình để bàn', 4)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Hộp đựng giấy', 4)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Tranh trang trí', 4)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Chai rượu tái chế', 4)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Kệ sách để bàn mini', 4)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Chậu cây mini', 4)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Hộp đựng bút', 4)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Set handmade napkin', 4)
  -- Miếng lót ly (CategoryID=5)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Lót ly handmade', 5)
  -- Quần jean (CategoryID=6)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Quần jean tái chế', 6)
  -- Sản phẩm thêu (CategoryID=7)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Khăn ăn thêu tay', 7)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Cúc áo thêu tay', 7)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Túi rút thêu', 7)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Sản phẩm thêu tay khác', 7)
  -- Combo quà (CategoryID=8)
  INTO PRODUCTTYPE (ProductTypeName, CategoryID) VALUES (N'Combo quà tặng', 8)
SELECT * FROM DUAL;

-- =============================================
-- 8. PRODUCT (đã cập nhật ImageURL)
-- =============================================
INSERT ALL
  -- Túi xách / Ví
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Túi tote vải canvas trơn', N'Túi tote làm từ vải canvas tái chế, kích thước 40x35cm', 85000, 1, 1, 1, 'https://picsum.photos/1000?random=101', 1)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Túi tote họa tiết hoa sen', N'Túi tote in hoa sen thân thiện môi trường', 95000, 1, 1, 1, 'https://picsum.photos/1000?random=102', 1)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Túi xách vải handmade hoa văn dân tộc', N'Túi xách may từ vải vụn ghép họa tiết dân tộc', 120000, 1, 1, 1, 'https://picsum.photos/1000?random=103', 2)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Ví handmade da tái chế', N'Ví nhỏ gọn, da tái chế từ quần jean cũ', 65000, 1, 1, 1, 'https://picsum.photos/1000?random=104', 3)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Túi xách jean quai quần', N'Túi xách làm từ quần jean cũ, quai chắc chắn', 110000, 1, 1, 1, 'https://picsum.photos/1000?random=105', 4)

  -- Khẩu trang
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Khẩu trang trẻ em thêu họa tiết con thỏ', N'Khẩu trang vải cotton 2 lớp, thêu tay hình thỏ', 25000, 1, 2, 0, 'https://picsum.photos/1000?random=106', 5)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Khẩu trang 3D kháng khuẩn hoa mai', N'Khẩu trang 3D 3 lớp, vải kháng khuẩn, họa tiết hoa mai', 30000, 1, 2, 0, 'https://picsum.photos/1000?random=107', 5)

  -- Xà phòng
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Xà phòng nhân sâm đỏ handmade', N'Xà phòng từ nhân sâm đỏ, dưỡng da', 45000, 1, 3, 1, 'https://picsum.photos/1000?random=108', 6)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Xà phòng hoa oải hương handmade', N'Xà phòng thiên nhiên hoa oải hương thư giãn', 40000, 1, 3, 1, 'https://picsum.photos/1000?random=109', 6)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Xà phòng sả chanh handmade', N'Xà phòng sả chanh kháng khuẩn, tươi mát', 35000, 1, 3, 1, 'https://picsum.photos/1000?random=110', 6)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Xà phòng cà phê handmade', N'Xà phòng tẩy tế bào chết từ bã cà phê', 40000, 1, 3, 1, 'https://picsum.photos/1000?random=111', 6)

  -- Nghệ thuật Napkin
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Khung hình để bàn gỗ decoupage', N'Khung hình từ gỗ tái chế, trang trí decoupage hoa', 75000, 1, 4, 1, 'https://picsum.photos/1000?random=112', 7)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Hộp đựng giấy decoupage hoa cỏ', N'Hộp đựng giấy ăn bằng gỗ, sơn decoupage', 85000, 1, 4, 1, 'https://picsum.photos/1000?random=113', 8)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Tranh trang trí decoupage phong cảnh', N'Tranh ghép vải vụn và decoupage trên gỗ', 120000, 1, 4, 1, 'https://picsum.photos/1000?random=114', 9)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Chai rượu tái chế đèn LED', N'Chai rượu cũ trang trí đèn LED, napkin hoa', 95000, 1, 4, 1, 'https://picsum.photos/1000?random=115', 10)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Kệ sách để bàn mini decoupage', N'Kệ sách nhỏ xinh từ gỗ pallet', 100000, 1, 4, 1, 'https://picsum.photos/1000?random=116', 11)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Chậu cây mini decoupage hoa hồng', N'Chậu cây bằng gỗ trang trí, kèm cây sen đá giả', 70000, 1, 4, 1, 'https://picsum.photos/1000?random=117', 12)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Hộp đựng bút decoupage', N'Hộp bút từ lon sữa tái chế, bọc vải decoupage', 45000, 1, 4, 1, 'https://picsum.photos/1000?random=118', 13)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Set handmade napkin (khung + hộp giấy + tranh nhỏ)', N'Bộ 3 sản phẩm decoupage đồng bộ', 220000, 1, 4, 1, 'https://picsum.photos/1000?random=119', 14)

  -- Miếng lót ly
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Miếng lót ly handmade SGF MLL 001 (chủ đề củ quả)', N'Lót ly thêu tay chủ đề củ quả dễ thương', 30000, 1, 5, 1, 'https://picsum.photos/1000?random=120', 15)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Miếng lót ly handmade SGF MLL 002 (chủ đề hải sản)', N'Lót ly thêu tay chủ đề seafood ngộ nghĩnh', 35000, 1, 5, 1, 'https://picsum.photos/1000?random=121', 15)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Miếng lót ly handmade SGF MLL 003 (chủ đề cà phê)', N'Lót ly thêu tay họa tiết cà phê', 30000, 1, 5, 1, 'https://picsum.photos/1000?random=122', 15)

  -- Quần jean
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Quần jean tái chế ống suông', N'Quần jean cũ được làm mới, ống suông thoải mái', 180000, 1, 6, 1, 'https://picsum.photos/1000?random=123', 16)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Quần jean thêu hoa mặt trời', N'Quần jean tái chế thêu tay họa tiết mặt trời', 220000, 1, 6, 1, 'https://picsum.photos/1000?random=124', 16)

  -- Sản phẩm thêu
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Khăn ăn thêu tay hoa hồng', N'Khăn ăn vải linen thêu tay hoa hồng tinh tế', 60000, 1, 7, 1, 'https://picsum.photos/1000?random=125', 17)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Cúc áo thêu tay gỗ', N'Bộ 5 cúc áo gỗ thêu chỉ màu', 35000, 1, 7, 1, 'https://picsum.photos/1000?random=126', 18)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Túi rút thêu họa tiết dân tộc', N'Túi rút nhỏ xinh thêu tay, dùng đựng quà', 55000, 1, 7, 1, 'https://picsum.photos/1000?random=127', 19)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Thêu tay SGF TT 001 (hoa sen)', N'Tranh thêu tay hoa sen trên nền vải', 150000, 1, 7, 1, 'https://picsum.photos/1000?random=128', 20)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Thêu tay SGF TT 002 (phong cảnh quê hương)', N'Tranh thêu phong cảnh làng quê Việt Nam', 180000, 1, 7, 1, 'https://picsum.photos/1000?random=129', 20)

  -- Combo quà
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Combo quà tặng yêu thương', N'Set quà gồm xà phòng handmade và khăn thêu', 100000, 1, 8, 1, 'https://picsum.photos/1000?random=130', 21)
  INTO PRODUCT (ProductName, Detail, ProductPrice, ProductStatus, CategoryID, AllowReturn, ImageURL, ProductTypeID)
    VALUES (N'Combo quà tặng sinh nhật', N'Set quà sinh nhật: túi rút thêu + xà phòng + lót ly', 150000, 1, 8, 1, 'https://picsum.photos/1000?random=131', 21)
SELECT * FROM DUAL;

COMMIT;

-- 9. COMBO (không FK)
INSERT ALL
  INTO COMBO (ComboPrice) VALUES (100000)  -- Combo yêu thương
  INTO COMBO (ComboPrice) VALUES (150000)  -- Combo sinh nhật
SELECT * FROM DUAL;

-- 10. COMBODETAIL (phụ thuộc COMBO, PRODUCT)
-- Combo 1: Xà phòng sả chanh (ProductID 11) + Khăn ăn thêu tay hoa hồng (ProductID 26)
-- Combo 2: Túi rút thêu (ProductID 28) + Xà phòng hoa oải hương (ProductID 10) + Lót ly MLL 001 (ProductID 21)
INSERT ALL
  INTO COMBODETAIL (ComboID, ProductID, Quantity) VALUES (1, 11, 1) -- xà phòng sả chanh
  INTO COMBODETAIL (ComboID, ProductID, Quantity) VALUES (1, 26, 1) -- khăn ăn thêu
  INTO COMBODETAIL (ComboID, ProductID, Quantity) VALUES (2, 28, 1) -- túi rút thêu
  INTO COMBODETAIL (ComboID, ProductID, Quantity) VALUES (2, 10, 1) -- xà phòng oải hương
  INTO COMBODETAIL (ComboID, ProductID, Quantity) VALUES (2, 21, 1) -- lót ly MLL 001
SELECT * FROM DUAL;

-- 11. SHIPCOMPANY (không FK)
INSERT ALL
  INTO SHIPCOMPANY (ShipCompanyName, SupportedRegion, Phone, Email, Address, Notes, Status)
    VALUES (N'Giao hàng tiết kiệm', N'Toàn quốc', '19001234', 'support@ghtk.vn', N'123 Láng Hạ, Hà Nội', N'Đối tác vận chuyển chính', 1)
  INTO SHIPCOMPANY (ShipCompanyName, SupportedRegion, Phone, Email, Address, Notes, Status)
    VALUES (N'Viettel Post', N'Miền Bắc', '19001235', 'support@viettelpost.vn', N'456 Giải Phóng, Hà Nội', N'Giao hàng nhanh', 1)
SELECT * FROM DUAL;

-- 12. CUSTOMER (phụ thuộc CUSTOMERTYPE)
INSERT ALL
  INTO CUSTOMER (CustomerTypeID, FirstName, LastName, CompanyName, Phone, Address, Email)
    VALUES (1, N'Nguyễn', N'Thị Hoa', NULL, '0988777666', N'12 Trần Duy Hưng, Hà Nội', 'hoa.nguyen@gmail.com')
  INTO CUSTOMER (CustomerTypeID, FirstName, LastName, CompanyName, Phone, Address, Email)
    VALUES (2, N'Phạm', N'Văn Bình', N'Nhà hàng chay Tâm An', '0988777667', N'34 Ngọc Khánh, Hà Nội', 'binh.pham@taman.vn')
  INTO CUSTOMER (CustomerTypeID, FirstName, LastName, CompanyName, Phone, Address, Email)
    VALUES (NULL, N'Khách', N'Lẻ', NULL, '0912345678', N'56 Chợ Mơ', NULL)
SELECT * FROM DUAL;

-- 13. PAYMENTMETHOD (không FK)
INSERT ALL
  INTO PAYMENTMETHOD (PaymentName, Status) VALUES (N'Tiền mặt', 1)
  INTO PAYMENTMETHOD (PaymentName, Status) VALUES (N'Chuyển khoản', 1)
  INTO PAYMENTMETHOD (PaymentName, Status) VALUES (N'Ví điện tử MoMo', 1)
SELECT * FROM DUAL;

-- 14. RETURNPOLICY (không FK)
INSERT ALL
  INTO RETURNPOLICY (PolicyName, MaxReturnDays, PenaltyFeeRate, EffectiveDate, IsActive)
    VALUES (N'Chính sách đổi trả 7 ngày', 7, 0, DATE '2024-01-01', 1)
  INTO RETURNPOLICY (PolicyName, MaxReturnDays, PenaltyFeeRate, EffectiveDate, IsActive)
    VALUES (N'Hàng thêu không đổi', 0, 100, DATE '2024-01-01', 1)
SELECT * FROM DUAL;

-- 15. DISCOUNT (phụ thuộc CUSTOMERTYPE)
INSERT ALL
  INTO DISCOUNT (CustomerTypeID, DiscountName, Value, Detail, AppliedProductIDs, Status, ExpiryDate, StartDate)
    VALUES (1, N'Giảm giá tháng 5', 10, N'Giảm 10% cho tất cả sản phẩm', NULL, 0, DATE '2024-05-31', DATE '2024-05-01')
  INTO DISCOUNT (CustomerTypeID, DiscountName, Value, Detail, AppliedProductIDs, Status, ExpiryDate, StartDate)
    VALUES (2, N'Ưu đãi khách Silver', 15, N'Giảm 15% cho đơn từ 300k', NULL, 0, DATE '2024-06-30', DATE '2024-05-01')
SELECT * FROM DUAL;

-- 16. DETAILINVENTORY (phụ thuộc WAREHOUSE, PRODUCT)
-- Kho tổng (ID=1) có sẵn nhiều hàng, kho bán hàng (ID=2) ít hàng, kho tái chế (ID=3) không có hàng bán thường
INSERT ALL
  -- Kho tổng: sản phẩm tiêu biểu
  INTO DETAILINVENTORY (WarehouseID, ProductID, CurrentQuantity, RealStock, AvailableStock, MinStock, MaxStock, IsAlertEnabled, StorageLocation)
    VALUES (1, 1, 200, 200, 200, 20, 500, 1, N'Kệ A-01')
  INTO DETAILINVENTORY (WarehouseID, ProductID, CurrentQuantity, RealStock, AvailableStock, MinStock, MaxStock, IsAlertEnabled, StorageLocation)
    VALUES (1, 11, 300, 300, 300, 30, 600, 1, N'Kệ B-02')
  INTO DETAILINVENTORY (WarehouseID, ProductID, CurrentQuantity, RealStock, AvailableStock, MinStock, MaxStock, IsAlertEnabled, StorageLocation)
    VALUES (1, 26, 50, 50, 50, 10, 100, 1, N'Kệ C-03')
  INTO DETAILINVENTORY (WarehouseID, ProductID, CurrentQuantity, RealStock, AvailableStock, MinStock, MaxStock, IsAlertEnabled, StorageLocation)
    VALUES (1, 21, 100, 100, 100, 20, 200, 1, N'Kệ D-01')
  -- Kho bán hàng
  INTO DETAILINVENTORY (WarehouseID, ProductID, CurrentQuantity, RealStock, AvailableStock, MinStock, MaxStock, IsAlertEnabled, StorageLocation)
    VALUES (2, 1, 30, 30, 30, 5, 50, 1, N'Tủ kính 1')
  INTO DETAILINVENTORY (WarehouseID, ProductID, CurrentQuantity, RealStock, AvailableStock, MinStock, MaxStock, IsAlertEnabled, StorageLocation)
    VALUES (2, 11, 40, 40, 40, 10, 80, 1, N'Tủ kính 2')
  -- Kho tái chế: có vài sản phẩm lỗi
  INTO DETAILINVENTORY (WarehouseID, ProductID, CurrentQuantity, RealStock, AvailableStock, MinStock, MaxStock, IsAlertEnabled, StorageLocation)
    VALUES (3, 26, 2, 2, 0, 0, 10, 0, N'Kệ lỗi')
SELECT * FROM DUAL;

-- 17. EXPORTRECEIPT (phụ thuộc EMPLOYEE, WAREHOUSE)
INSERT ALL
  INTO EXPORTRECEIPT (EmployeeID, ExportType, Reason, Status, WarehouseID)
    VALUES (2, 1, N'Xuất bán đơn hàng online #1', N'Đã hoàn thành', 1)
  INTO EXPORTRECEIPT (EmployeeID, ExportType, Reason, Status, WarehouseID)
    VALUES (2, 2, N'Trả hàng lỗi về xưởng', N'Đã hoàn thành', 3)
SELECT * FROM DUAL;

-- 18. EXPORTRECEIPTDETAIL (phụ thuộc EXPORTRECEIPT, PRODUCT)
INSERT ALL
  INTO EXPORTRECEIPTDETAIL (ExportReceiptID, ProductID, Quantity) VALUES (1, 11, 5)
  INTO EXPORTRECEIPTDETAIL (ExportReceiptID, ProductID, Quantity) VALUES (1, 26, 2)
  INTO EXPORTRECEIPTDETAIL (ExportReceiptID, ProductID, Quantity) VALUES (2, 26, 1)  -- trả hàng lỗi
SELECT * FROM DUAL;

-- 19. INVOICE (phụ thuộc CUSTOMER, EMPLOYEE)
INSERT ALL
  INTO INVOICE (CustomerID, EmployeeID, SaleChannelCode, TotalAmount, TaxAmount, FinalAmount, Status)
    VALUES (1, 1, 0, 175000, 0, 175000, N'Đã thanh toán')  -- mua trực tiếp
  INTO INVOICE (CustomerID, EmployeeID, SaleChannelCode, TotalAmount, TaxAmount, FinalAmount, Status)
    VALUES (2, 1, 1, 450000, 0, 450000, N'Chờ thanh toán') -- mua online
SELECT * FROM DUAL;

-- 20. ORDERS (phụ thuộc CUSTOMER, EMPLOYEE, INVOICE, SHIPCOMPANY, EXPORTRECEIPT)
INSERT ALL
  INTO ORDERS (CustomerID, EmployeeID, InvoiceID, ShipCode, ShipCompanyID, TotalAmount, OrderStatus, ShippingStatus, ShipmentNote, ShippingFee, ExportReceiptID)
    VALUES (2, 1, 2, 'SPX123456', 1, 450000, 0, 0, N'Giao giờ hành chính', 30000, 1)
  INTO ORDERS (CustomerID, EmployeeID, InvoiceID, ShipCode, ShipCompanyID, TotalAmount, OrderStatus, ShippingStatus, ShipmentNote, ShippingFee, ExportReceiptID)
    VALUES (1, 1, 1, NULL, NULL, 175000, 1, NULL, NULL, 0, NULL)  -- tại quầy, không vận chuyển
SELECT * FROM DUAL;

-- 21. ORDERDETAIL (phụ thuộc ORDERS, PRODUCT, COMBO)
INSERT ALL
  INTO ORDERDETAIL (OrderID, ProductID, ComboID, Quantity, UnitPrice, DiscountAmount, TotalAmount)
    VALUES (1, 11, NULL, 5, 35000, 0, 175000)
  INTO ORDERDETAIL (OrderID, ProductID, ComboID, Quantity, UnitPrice, DiscountAmount, TotalAmount)
    VALUES (2, 26, NULL, 2, 60000, 0, 120000)
  INTO ORDERDETAIL (OrderID, ProductID, ComboID, Quantity, UnitPrice, DiscountAmount, TotalAmount)
    VALUES (2, 21, NULL, 1, 30000, 0, 30000)
  INTO ORDERDETAIL (OrderID, ProductID, ComboID, Quantity, UnitPrice, DiscountAmount, TotalAmount)
    VALUES (2, 1, 2, 1, 150000, 0, 150000) -- combo sinh nhật
SELECT * FROM DUAL;

-- 22. PAYMENT (phụ thuộc INVOICE, PAYMENTMETHOD)
INSERT ALL
  INTO PAYMENT (InvoiceID, PaymentMethodID, AmountPaid, ReferenceCode, PaymentDate)
    VALUES (1, 1, 175000, NULL, CURRENT_TIMESTAMP)
  INTO PAYMENT (InvoiceID, PaymentMethodID, AmountPaid, ReferenceCode, PaymentDate)
    VALUES (2, 2, 200000, 'CK_SGF_001', CURRENT_TIMESTAMP) -- thanh toán 1 phần
SELECT * FROM DUAL;

-- 23. INVOICEDETAIL (phụ thuộc INVOICE, PRODUCT, COMBO)
INSERT ALL
  INTO INVOICEDETAIL (InvoiceID, ProductID, ComboID, Quantity, UnitPrice, DiscountAmount, TotalAmount)
    VALUES (1, 11, NULL, 5, 35000, 0, 175000)
  INTO INVOICEDETAIL (InvoiceID, ProductID, ComboID, Quantity, UnitPrice, DiscountAmount, TotalAmount)
    VALUES (2, 26, NULL, 2, 60000, 0, 120000)
  INTO INVOICEDETAIL (InvoiceID, ProductID, ComboID, Quantity, UnitPrice, DiscountAmount, TotalAmount)
    VALUES (2, 21, NULL, 1, 30000, 0, 30000)
  INTO INVOICEDETAIL (InvoiceID, ProductID, ComboID, Quantity, UnitPrice, DiscountAmount, TotalAmount)
    VALUES (2, 1, 2, 1, 150000, 0, 150000) -- combo sinh nhật (giá combo)
SELECT * FROM DUAL;

-- 24. NOTIFICATION (phụ thuộc EMPLOYEE, PRODUCT)
INSERT ALL
  INTO NOTIFICATION (EmployeeID, Title, ProductID, Message, Type, Status, CreatedDate)
    VALUES (2, N'Cảnh báo tồn kho thấp', 26, N'Khăn ăn thêu tay hoa hồng chỉ còn 50 chiếc', 1, 0, SYSDATE)
SELECT * FROM DUAL;

-- 25. REQUESTFORM (phụ thuộc EMPLOYEE)
INSERT ALL
  INTO REQUESTFORM (EmployeeID, CreatedDate, Status, ApproverID, RejectReason)
    VALUES (2, DATE '2024-05-10', N'Chờ duyệt', NULL, NULL)
  INTO REQUESTFORM (EmployeeID, CreatedDate, Status, ApproverID, RejectReason)
    VALUES (2, DATE '2024-05-12', N'Đã duyệt', 1, NULL)
SELECT * FROM DUAL;

-- 26. REQUESTDETAIL (phụ thuộc REQUESTFORM, PRODUCT)
INSERT ALL
  INTO REQUESTDETAIL (RequestID, ProductID, Quantity) VALUES (1, 11, 100)
  INTO REQUESTDETAIL (RequestID, ProductID, Quantity) VALUES (1, 1, 50)
  INTO REQUESTDETAIL (RequestID, ProductID, Quantity) VALUES (2, 26, 20)
SELECT * FROM DUAL;

-- 27. TRANSFERTICKET (phụ thuộc EMPLOYEE, WAREHOUSE)
INSERT ALL
  INTO TRANSFERTICKET (EmployeeID, SourceWHID, DestWHID, Status, CreatedDate)
    VALUES (2, 1, 2, N'Chờ xuất kho', DATE '2024-05-15')
  INTO TRANSFERTICKET (EmployeeID, SourceWHID, DestWHID, Status, CreatedDate)
    VALUES (2, 2, 1, N'Đang luân chuyển', DATE '2024-05-16')
SELECT * FROM DUAL;

-- 28. TRANSFERTICKETDETAIL (phụ thuộc TRANSFERTICKET, PRODUCT)
INSERT ALL
  INTO TRANSFERTICKETDETAIL (TransferID, ProductID, ExportQuantity, ReceiveQuantity, RequestQuantity)
    VALUES (1, 1, NULL, NULL, 20)
  INTO TRANSFERTICKETDETAIL (TransferID, ProductID, ExportQuantity, ReceiveQuantity, RequestQuantity)
    VALUES (1, 11, NULL, NULL, 15)
  INTO TRANSFERTICKETDETAIL (TransferID, ProductID, ExportQuantity, ReceiveQuantity, RequestQuantity)
    VALUES (2, 1, 10, 10, 10) -- hoàn thành
SELECT * FROM DUAL;

-- 29. IMPORTRECEIPT (phụ thuộc EMPLOYEE, WAREHOUSE, REQUESTFORM)
INSERT ALL
  INTO IMPORTRECEIPT (EmployeeID, WarehouseID, Status, CreatedDate, RequestID, HasDiscrepancy)
    VALUES (2, 1, N'Bản nháp', DATE '2024-05-18', 2, 0)
  INTO IMPORTRECEIPT (EmployeeID, WarehouseID, Status, CreatedDate, RequestID, HasDiscrepancy)
    VALUES (2, 1, N'Đã nhập kho', DATE '2024-05-20', NULL, 0)
SELECT * FROM DUAL;

-- 30. IMPORTRECEIPTDETAIL (phụ thuộc IMPORTRECEIPT, PRODUCT)
INSERT ALL
  INTO IMPORTRECEIPTDETAIL (ImportReceiptID, ProductID, ExpectedQuantity, ActualQuantity)
    VALUES (1, 11, 100, 100)
  INTO IMPORTRECEIPTDETAIL (ImportReceiptID, ProductID, ExpectedQuantity, ActualQuantity)
    VALUES (1, 1, 50, 50)
  INTO IMPORTRECEIPTDETAIL (ImportReceiptID, ProductID, ExpectedQuantity, ActualQuantity)
    VALUES (2, 26, 20, 20)
SELECT * FROM DUAL;

-- 31. COUNTSHEET (không FK)
INSERT ALL
  INTO COUNTSHEET (CreatedDate, Status) VALUES (DATE '2024-05-25', 0)
  INTO COUNTSHEET (CreatedDate, Status) VALUES (DATE '2024-05-30', 2)
SELECT * FROM DUAL;

-- 32. COUNTSHEETDETAIL (phụ thuộc COUNTSHEET, WAREHOUSE, PRODUCT)
INSERT ALL
  INTO COUNTSHEETDETAIL (CountSheetId, WarehouseID, ProductId, Quantity, Note)
    VALUES (1, 1, 1, 199, N'Thiếu 1 sản phẩm')
  INTO COUNTSHEETDETAIL (CountSheetId, WarehouseID, ProductId, Quantity, Note)
    VALUES (1, 1, 11, 300, NULL)
  INTO COUNTSHEETDETAIL (CountSheetId, WarehouseID, ProductId, Quantity, Note)
    VALUES (2, 2, 1, 30, N'Khớp')
SELECT * FROM DUAL;

-- 33. ORDERRETURN (phụ thuộc ORDERS, EMPLOYEE)
INSERT ALL
  INTO ORDERRETURN (OrderID, EmployeeID, ReturnDate, Reason, TotalRefund, ReturnRefCode, Status)
    VALUES (2, 1, DATE '2024-05-28', N'Sản phẩm bị lỗi thêu', 30000, NULL, N'Chờ xử lý')
SELECT * FROM DUAL;

-- 34. RETURNDETAIL (phụ thuộc ORDERRETURN, PRODUCT, WAREHOUSE)
INSERT ALL
  INTO RETURNDETAIL (ReturnID, ProductID, Quantity, QC_Status, TargetWarehouseID, ActionTaken)
    VALUES (1, 21, 1, N'Lỗi nhẹ', 3, N'Nhập kho tái chế')
SELECT * FROM DUAL;

-- 35. LISTDISCOUNT (phụ thuộc ORDERS, DISCOUNT)
INSERT ALL
  INTO LISTDISCOUNT (OrderID, DiscountID, AppliedValue) VALUES (2, 1, 10)
SELECT * FROM DUAL;

-- 36. FEEDBACK (phụ thuộc ORDERDETAIL, CUSTOMER)
INSERT ALL
  INTO FEEDBACK (OrderDetailID, CustomerID, FeedbackComment, FeedBackDate, AttachmentURL, Rating)
    VALUES (1, 2, N'Sản phẩm xà phòng thơm, chất lượng tốt', CURRENT_TIMESTAMP, NULL, 5)
  INTO FEEDBACK (OrderDetailID, CustomerID, FeedbackComment, FeedBackDate, AttachmentURL, Rating)
    VALUES (3, 1, N'Lót ly đẹp, giao hàng nhanh', CURRENT_TIMESTAMP, NULL, 4)
SELECT * FROM DUAL;

COMMIT;
