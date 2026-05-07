### **1\. Bảng PRODUCT**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| ProductID | NUMBER | PK, IDENTITY(1,1) | Mã định danh của sản phẩm. |
| ProductName | NVARCHAR2(100) | NOT NULL | Tên sản phẩm. |
| Detail | NVARCHAR2(200) | Allow NULL | Thông tin chi tiết của sản phẩm. |
| ProductPrice | NUMBER | CHECK (\> 0\) | Giá bán sản phẩm. |
| ProductStatus | NUMBER | CHECK (ProductStatus IN( 0,1)) | Trạng thái kinh doanh: 1: Đang bán; 0: Tạm ẩn / Ngừng kinh doanh. |
| ProductTypeID | NUMBER | FK | Mã định danh duy nhất của loại sản phẩm. |
| DiscountID | NUMBER | FK, Allow NULL | Mã giảm giá (nếu có). |
| AllowReturn | BOOLEAN | NOT NULL | Trạng thái được đổi/ trả hàng: 0: không hỗ trợ; 1: Được hỗ trợ. |
| ImageURL | VARCHAR2(255) | Allow NULL | URL dẫn đến hình ảnh mô tả sản phẩm. |

### **2\. Bảng Category**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả (Ý nghĩa nghiệp vụ) |
| :---- | :---- | :---- | :---- |
| CategoryID | NUMBER | PK, IDENTITY(1,1) | Mã định danh duy nhất của danh mục sản phẩm. |
| CategoryName | VARCHAR2(30) | NOT NULL | Tên danh mục sản phẩm. |

### **3\. Bảng Combo**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| ComboID | NUMBER | PK, IDENTITY(1,1) | Mã định danh combo. |
| ComboPrice | NUMBER(19,4) | CHECK (ComboPrice \>= 0\) | Giá bán của combo sản phẩm. |

### **4\. Bảng ComboDetail**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| ComboID | NUMBER | PK, FK | Mã định danh combo. |
| ProductID | NUMBER | PK, FK | Mã định danh sản phẩm. |
| Quantity | NUMBER | CHECK (Quantity \> 0\) | Số lượng sản phẩm có trong combo. |

### **5\. Bảng ProductType**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả (Ý nghĩa nghiệp vụ) |
| :---- | :---- | :---- | :---- |
| ProductTypeID | NUMBER | PK, IDENTITY(1,1) | Mã định danh duy nhất của loại sản phẩm. |
| ProductTypeName | VARCHAR2(30) | NOT NULL | Tên loại sản phẩm. |
| CategoryID | NUMBER | FK, NOT NULL | Mã danh mục sản phẩm mà loại này thuộc về. |

### **6\. Bảng Discount**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả (Ý nghĩa nghiệp vụ) |
| :---- | :---- | :---- | :---- |
| DiscountID | NUMBER | PK, IDENTITY(1,1) | Mã giảm giá. |
| CUSTOMERTYPE | NUMBER | FK, Allow NULL | Mã loại khách hàng được áp dụng giảm giá (nếu có). |
| DiscountName | NVARCHAR2(100) | NOT NULL | Tên mã giảm giá. |
| Value | NUMBER | NOT NULL | Giá trị giảm (số tiền hoặc phần trăm). |
| Detail | VARCHAR2(300) | NOT NULL | Chi tiết điều kiện giảm giá. |
| Status | NUMBER | DEFAULT 2, CHECK (Status IN (0,1,2)) | Trạng thái: 0: đang áp dụng; 1: hết hạn; 2: chưa áp dụng. |
| ExpiryDate | DATETIME | NOT NULL, CHECK (ExpiryDate \> StartDate) | Hạn áp dụng. |
| StartDate | DATETIME | NOT NULL | Ngày bắt đầu áp dụng. |

### **7\. Bảng LIST\_DISCOUNT**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| OrderID | NUMBER | PK, FK, NOT NULL | Mã định danh hóa đơn được áp mã giảm giá. |
| DiscountID | NUMBER | PK, FK, NOT NULL | Mã định danh của mã giảm giá được dùng. |
| AppliedValue | NUMBER | NOT NULL | Số tiền hoặc phần trăm giảm cụ thể được áp dụng. |

### **8\. Bảng Payment**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả (Ý nghĩa nghiệp vụ) |
| :---- | :---- | :---- | :---- |
| PaymentID | NUMBER | PK, IDENTITY(1,1) | Mã giao dịch thanh toán duy nhất. |
| InvoiceID | NUMBER | FK, NOT NULL | Hóa đơn được thanh toán. |
| PaymentMethodID | NUMBER | FK, NOT NULL | Phương thức thanh toán (tiền mặt, chuyển khoản...). |
| AmountPaid | NUMBER(19,4) | CHECK (AmountPaid \> 0\) | Số tiền thực trả. |
| ReferenceCode | VARCHAR2(100) | Allow NULL | Mã giao dịch tham chiếu (mã UNC ngân hàng, mã ví...). |
| PaymentDate | TIMESTAMP | DEFAULT CURRENT\_TIMESTAMP | Thời điểm giao dịch thanh toán thành công. |

### **9\. Bảng PaymentMethod**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| PMName | NVARCHAR2(100) | UNIQUE, NOT NULL | Tên phương thức (Tiền mặt, Chuyển khoản, Ví MoMo...). |
| Instruction | NVARCHAR2(255) | Allow NULL | Hướng dẫn sử dụng (tùy chọn). |
| Status | NUMBER(1) | CHECK (Status IN (0,1)) | 1: Đang áp dụng, 0: Tạm ngừng. |

### **10\. Bảng OrderDetail**

| Tên thuộc tính | Kiểu dữ liệu | Khóa / Ràng buộc | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| OrderDetailID | NUMBER | PK, IDENTITY(1,1) | Mã định danh duy nhất cho dòng chi tiết. |
| OrderID | NUMBER | FK, NOT NULL | Đơn hàng chứa dòng này. |
| ProductID | NUMBER | FK, Allow NULL, CHECK (Chỉ 1 trong 2 NULL) | Sản phẩm được đặt. Phải điền nếu không phải Combo. |
| ComboID | NUMBER | FK, Allow NULL | Combo được đặt. Phải điền nếu không phải mặt hàng lẻ. |
| Quantity | NUMBER | CHECK (Quantity \> 0\) | Số lượng. |
| UnitPrice | NUMBER(19,4) | CHECK (UnitPrice \>= 0\) | Đơn giá tại thời điểm bán. |
| DiscountAmount | NUMBER(19,4) | DEFAULT 0 | Chiết khấu riêng trên dòng sản phẩm (nếu có). |
| TotalAmount | NUMBER(19,4) | NOT NULL | Tổng tiền sau khi trừ chiết khấu dòng (Qty \* Price \- Discount). |

### **11\. Bảng Order**

| Tên thuộc tính | Kiểu dữ liệu | Khóa / Ràng buộc | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| OrderID | NUMBER | PK, IDENTITY(1,1) | Mã định danh duy nhất của đơn hàng. |
| CustomerID | NUMBER | FK, NOT NULL | Khách hàng đặt đơn. |
| EmployeeID | NUMBER | FK, Allow NULL | Nhân viên phụ trách đơn hàng (người nhập đơn). |
| InvoiceID | NUMBER | FK, Allow NULL | Hóa đơn tài chính mà đơn hàng được gộp vào. |
| ShipperID | NUMBER | FK, Allow NULL | Mã vận đơn, chỉ khác NULL khi đã điều phối giao hàng. |
| TotalAmount | NUMBER(19,4) | CHECK (TotalAmount \>= 0\) | Tổng giá trị đơn hàng (tính từ OrderDetail). |
| OrderStatus | NUMBER | NOT NULL, CHECK (IN(0,1,2,3,4,5)) | 0: Chờ xác nhận, 1: Đã xác nhận, 2: Đang giao, 3: Giao thành công, 4: Đã hủy, 5: Đổi/trả. |
| ShippingStatus | NUMBER | Allow NULL, CHECK (IN(0,1,2,3)) | 0: Cần lên lịch giao, 1: Đang đóng gói, 2: Đã gửi vận chuyển, 3: Khách từ chối giao. |
| ShipmentNote | VARCHAR2(100) | Allow NULL | Ghi chú thêm của đơn vị vận chuyển hoặc lý do hủy giao. |
| ShipCompanyID | NUMBER | FK, Allow NULL | Tham chiếu tới đối tác vận chuyển giao đơn hàng này. |
| TrackingCode | VARCHAR2(100) | Allow NULL, UNIQUE | Lưu mã vận đơn hệ thống GHTK/ViettelPost. |
| ShippingFee | NUMBER(19,4) | CHECK (ShippingFee \>= 0), Allow NULL | Phí vận chuyển áp dụng cho đơn. |
| ExportTicketID | NUMBER | FK, Allow NULL | Phiếu xuất kho tương ứng với đơn hàng. |
| CreatedDate | DATE | DEFAULT SYSDATE | Ngày tạo đơn hàng. |

### **12\. Bảng INVOICE**

| Tên thuộc tính | Kiểu dữ liệu | Khóa / Ràng buộc | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| InvoiceID | NUMBER | PK, IDENTITY(1,1) | Mã định danh duy nhất của hóa đơn. |
| CustomerID | NUMBER | FK, NOT NULL | Khách hàng được xuất hóa đơn. |
| EmployeeID | NUMBER | FK, Allow NULL | Nhân viên tạo hóa đơn hoặc kế toán thực hiện gộp đơn. |
| SaleChannelID | NUMBER | FK, NOT NULL | 0: bán tại quầy, 1: từ đơn hàng trực tuyến. |
| TotalAmount | NUMBER(19,4) | CHECK (TotalAmount \>= 0\) | Tổng tiền hàng trước thuế. |
| TaxAmount | NUMBER(19,4) | DEFAULT 0 | Tiền thuế VAT (nếu có). |
| FinalAmount | NUMBER(19,4) | CHECK (FinalAmount \>= 0\) | Tổng số tiền khách phải trả (= TotalAmount \+ TaxAmount). |
| Status | VARCHAR2(20) | NOT NULL | Trạng thái hóa đơn: 'Chờ thanh toán', 'Đã thanh toán', 'Đã hủy'. |
| InvoiceDate | DATE | DEFAULT SYSDATE | Ngày xuất hóa đơn. |

### **13\. Bảng INVOICEDETAIL**

| Tên thuộc tính | Kiểu dữ liệu | Khóa / Ràng buộc | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| InvoiceDetailID | NUMBER | PK, IDENTITY(1,1) | Mã dòng chi tiết hóa đơn. |
| InvoiceID | NUMBER | FK, NOT NULL | Hóa đơn chứa dòng này. |
| ProductID | NUMBER | FK, Allow NULL, CHECK (Chỉ 1 trong 2 NULL) | Sản phẩm được đặt. |
| ComboID | NUMBER | FK, Allow NULL | Combo được đặt. |
| Quantity | NUMBER | CHECK (Quantity \> 0\) | Số lượng. |
| UnitPrice | NUMBER(19,4) | CHECK (UnitPrice \>= 0\) | Đơn giá bán tại thời điểm xuất hóa đơn. |
| DiscountAmount | NUMBER(19,4) | DEFAULT 0 | Chiết khấu trên dòng sản phẩm (nếu có). |
| TotalAmount | NUMBER(19,4) | NOT NULL | Tổng tiền dòng này (= Quantity \* UnitPrice \- DiscountAmount). |

### **14\. Bảng ShipCompany**

| Tên thuộc tính | Kiểu dữ liệu | Khóa / Ràng buộc | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| ShipCompanyID | NUMBER | PK, IDENTITY(1,1) | Mã công ty vận chuyển. |
| ShipCompanyName | NVARCHAR2(100) | NOT NULL, UNIQUE | Tên công ty (GHTK, Viettel Post, VNPost...). |
| SupportedRegion | VARCHAR2(50) | NOT NULL | Vùng hỗ trợ (VD: NoiThanh, ToanQuoc) để phân tuyến tự động. |
| Phone | VARCHAR2(15) | NOT NULL | Số điện thoại tổng đài hoặc hotline. |
| Email | VARCHAR2(100) | Allow NULL | Email nhận thông báo, hóa đơn của đối tác. |
| Address | NVARCHAR2(255) | Allow NULL | Địa chỉ trụ sở hoặc bưu cục/kho trung chuyển chính. |
| Notes | NVARCHAR2(500) | Allow NULL | Ghi chú thông tin vận hành (VD: "Ca lấy hàng lúc 16h"). |
| Status | NUMBER(1) | DEFAULT 1, CHECK (Status IN(0,1)) | Trạng thái đối tác. 0: Ngừng hợp tác, 1: Đang hoạt động. |

### **15\. Bảng Employee**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả (Ý nghĩa nghiệp vụ) |
| :---- | :---- | :---- | :---- |
| EmployeeID | NUMBER | PK, IDENTITY(1,1) | Mã định danh duy nhất của nhân viên (Dùng làm ID tài khoản). |
| Fullname | NVARCHAR2(100) | NOT NULL | Họ và tên đầy đủ. |
| Email | VARCHAR2(100) | Allow NULL, UNIQUE | Email liên hệ công việc. |
| Phone | VARCHAR2(15) | CHECK (Length \>= 10), NOT NULL | Số điện thoại liên hệ (dùng nhận OTP/đăng nhập). |
| PasswordHash | VARCHAR2(255) | NOT NULL | Mật khẩu đã mã hóa Hash. |
| Status | BIT | DEFAULT 1 | 1: Đang làm/Active, 0: Đã nghỉ/Bị khóa. |

### **16\. Bảng Role**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| RoleID | NUMBER | PK, CHECK( RoleID IN (0, 1, 2)) | Phân quyền truy cập: 0: Admin tổng, 1: NV Kho, 2: Kế toán. |
| RoleName | VARCHAR2(100) | NOT NULL | Tên vai trò trên hệ thống. |

### **17\. Bảng EmployeeRole**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| EmployeeID | NUMBER | PK, FK, NOT NULL | Xác định tài khoản đang được cấu hình. |
| RoleID | NUMBER | PK, FK, NOT NULL | Xác định quyền hạn được cấp cho tài khoản trên. |

### **18\. Bảng WareHouse**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| WareHouseID | NUMBER | PK, IDENTITY(1,1) | Mã định danh duy nhất của kho hàng. |
| WHName | NVARCHAR2(40) | NOT NULL | Tên kho hàng. |
| ManagerID | NUMBER | FK, NOT NULL | Người quản lý chịu trách nhiệm chính tại kho. |
| Address | NVARCHAR2(50) | NOT NULL | Địa chỉ kho hàng. |
| ContactNumber | NUMBER | NOT NULL | SĐT liên lạc điều phối kho. |
| Capacity | NUMBER | NOT NULL | Sức chứa tối đa của kho hàng. |
| Status | NUMBER | CHECK (Status IN (0, 1)) | Trạng thái kho hàng (0: đang hoạt động, 1: không hoạt động). |
| WarehouseType | NUMBER | CHECK (IN (1, 2, 3)) | 1: Bán hàng, 2: Lưu trữ tổng, 3: Tái chế/Hàng lỗi. |

### **19\. Bảng DetailedInventory**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| WarehouseID | NUMBER | PK, FK | Xác định kho hàng cụ thể. |
| ProductID | NUMBER | PK, FK | Mã sản phẩm được lưu trữ. |
| CurrentQuantity | NUMBER | DEFAULT 0 | Số lượng tồn thực tế hiện tại. |
| RealStock | NUMBER | DEFAULT 0, CHECK (\>= 0\) | Tồn kho vật lý (Hàng thực tế trong kho). |
| AvailableStock | NUMBER | DEFAULT 0, CHECK (\>= 0\) | Tồn kho khả dụng (Có thể xuất bán). |
| MinStock | NUMBER | CHECK (\>= 0\) | Ngưỡng tồn thiểu (MinStock \<= MaxStock). |
| MaxStock | NUMBER | CHECK (\>= 0\) | Ngưỡng tồn đa để tránh nhập quá nhiều. |
| IsAlertEnabled | NUMBER(1) | DEFAULT 1, CHECK (IN (0,1)) | Bật/Tắt cảnh báo tồn kho cho sản phẩm này. |
| StorageLocation | NVARCHAR2(100) | Allow NULL | Vị trí cụ thể (Kệ/Ngăn) trong kho. |

### **20\. Bảng Notification**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| NotificationID | NUMBER | PK, IDENTITY(1,1) | Mã định danh duy nhất của thông báo. |
| EmployeeID | NUMBER | FK, NOT NULL | Tài khoản nhân viên nhận thông báo. |
| Title | NVARCHAR2(200) | NOT NULL | Tiêu đề thông báo (VD: "Cảnh báo thiếu hàng"). |
| ProductID | NUMBER | FK, Allow NULL | Sản phẩm được yêu cầu lưu ý (nếu có). |
| Message | NVARCHAR2(MAX) | NOT NULL | Nội dung chi tiết thông báo. |
| Type | NUMBER | CHECK (Type IN(1,2,3)) | Loại thông báo: 1: Thiếu hàng, 2: Tồn kho ca, 3: Hệ thống/Giao dịch. |
| Status | BIT | CHECK (Status IN(0,1)) | Trạng thái: 0: Chưa đọc, 1: Đã đọc. |
| CreatedDate | DATETIME | DEFAULT GETDATE(), NOT NULL | Thời gian gửi thông báo trên hệ thống. |

### **21\. Bảng ReplenishRequest**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| RequestID | NUMBER | PK, IDENTITY(1,1) | Mã định danh duy nhất của phiếu đề xuất. |
| EmployeeID | NUMBER | FK, NOT NULL | Người lập phiếu (Tham chiếu bảng Employee). |
| CreatedDate | DATE | DEFAULT SYSDATE | Ngày và giờ hệ thống tạo phiếu. |
| Status | NVARCHAR2(50) | DEFAULT 'Chờ duyệt' | Trạng thái phiếu (Chờ duyệt, Đã duyệt, Đã từ chối). |
| ApproverID | NUMBER | FK, Allow NULL | Người phê duyệt cấp Quản lý. |
| RejectReason | NVARCHAR2(255) | Allow NULL | Lý do từ chối nếu phiếu không được duyệt. |

### **22\. Bảng RequestDetail**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| RequestID | NUMBER | PK, FK, NOT NULL | Liên kết với phiếu đề xuất gốc. |
| ProductID | NUMBER | PK, FK, NOT NULL | Mặt hàng cần bổ sung. |
| Quantity | NUMBER | CHECK (Quantity \> 0\) | Số lượng yêu cầu bổ sung. |

### **23\. Bảng ImportReceipt**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| ReceiptID | NUMBER | PK, IDENTITY(1,1) | Mã định danh duy nhất của phiếu nhập kho. |
| EmployeeID | NUMBER | FK, NOT NULL | Thủ kho thực hiện lập phiếu. |
| WarehouseID | NUMBER | FK, NOT NULL | Kho hàng tiếp nhận lô hàng. |
| Status | NVARCHAR2(50) | DEFAULT 'Bản nháp' | Trạng thái (Bản nháp, Đã hoàn thành). |
| CreatedDate | DATE | DEFAULT SYSDATE | Ngày lập phiếu nhập. |
| RequestID | NUMBER | FK, Allow NULL | Liên kết với Phiếu Đề Xuất (Nếu có). |
| DiscrepancyReason | NVARCHAR2(255) | Allow NULL | Lý do giải trình khi số lượng nhập thực tế bị lệch. |
| DiscrepancyImageURL | VARCHAR2(255) | Allow NULL | Đường dẫn ảnh chụp minh chứng (hàng vỡ, thiếu...). |
| HasDiscrepancy | NUMBER(1) | DEFAULT 0, CHECK (IN (0,1)) | Cờ báo chênh lệch (0: Khớp, 1: Có sai sót). |

### **24\. Bảng ImportReceiptDetail**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| ReceiptID | NUMBER | PK, FK, NOT NULL | Liên kết với phiếu nhập kho gốc. |
| ProductID | NUMBER | PK, FK, NOT NULL | Mặt hàng được nhập kho. |
| ExpectedQuantity | NUMBER | CHECK (ExpectedQuantity \> 0\) | Số lượng Xưởng báo (Dự kiến nhập). |
| ActualQuantity | NUMBER | CHECK (ActualQuantity \>= 0\) | Số lượng thực nhận sau khi kiểm đếm. |

### **25\. Bảng TransferTicket**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| TransferID | NUMBER | PK, IDENTITY(1,1) | Mã định danh duy nhất cho mỗi phiếu luân chuyển. |
| EmployeeID | NUMBER | FK, NOT NULL | Nhân viên tạo yêu cầu luân chuyển. |
| SourceWH\_ID | NUMBER | FK, NOT NULL | Kho xuất hàng. |
| DestWH\_ID | NUMBER | FK, NOT NULL | Kho nhận hàng. |
| Status | NVARCHAR2(50) | DEFAULT 'Chờ xuất kho' | Trạng thái: Chờ xuất, Đang luân chuyển, Đã hoàn tất. |
| CreatedDate | DATE | DEFAULT SYSDATE | Ngày giờ khởi tạo phiếu yêu cầu. |

### **26\. Bảng TransferTicketDetail**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| TransferID | NUMBER | PK, FK, NOT NULL | Liên kết với phiếu luân chuyển gốc. |
| ProductID | NUMBER | PK, FK, NOT NULL | Mặt hàng cần luân chuyển nội bộ. |
| ExportQuantity | NUMBER | Allow NULL | Số lượng Thủ kho thực tế xuất đi. |
| ReceiveQuantity | NUMBER | Allow NULL | Số lượng Nhân viên bán hàng thực tế nhận được. |
| RequestQuantity | NUMBER | CHECK (RequestQuantity \> 0\) | Số lượng yêu cầu xin điều chuyển ban đầu. |

### **27\. Bảng ExportTicket**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| TicketID | NUMBER | PK, IDENTITY(1,1) | Mã định danh duy nhất của phiếu xuất kho. |
| EmployeeID | NUMBER | FK, NOT NULL | Người lập phiếu xuất kho. |
| Status | NVARCHAR2(50) | DEFAULT 'Đã hoàn thành' | Trạng thái của phiếu xuất kho. |
| CreatedDate | DATE | DEFAULT SYSDATE | Ngày giờ hệ thống ghi nhận phiếu xuất. |

### **28\. Bảng ExportTicketDetail**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| TicketID | NUMBER | PK, FK, NOT NULL | Liên kết với phiếu xuất kho gốc. |
| ProductID | NUMBER | PK, FK, NOT NULL | Mặt hàng được xuất đi. |
| Quantity | NUMBER | CHECK (Quantity \> 0\) | Số lượng thực tế xuất kho. |

### **29\. Bảng CountSheet**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| CountSheetId | NUMBER | PK, NOT NULL | Mã phiếu kiểm kê định kỳ. |
| CreatedDate | DATE | DEFAULT SYSDATE | Ngày tạo phiếu kiểm kê. |
| Status | NUMBER | DEFAULT 0, NOT NULL | 0: Chưa kiểm, 1: Chờ duyệt, 2: Đã duyệt, 3: Từ chối, 4: Hủy. |

### **30\. Bảng CountSheetDetail**

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc (Constraint) | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| CountSheetId | NUMBER | PK, FK, NOT NULL | Liên kết với mã phiếu kiểm kê. |
| WarehouseId | NUMBER | PK, FK, NOT NULL | Kho hàng được thực hiện kiểm kê. |
| ProductId | NUMBER | PK, FK, NOT NULL | Mã sản phẩm được kiểm kê thực tế. |
| Quantity | NUMBER | NOT NULL | Số lượng đếm được thực tế (vật lý). |
| Note | NVARCHAR2(50) | Allow NULL | Lý do nếu có chênh lệch so với tồn kho hệ thống. |

### **31\. Bảng Customer**

| Tên thuộc tính | Kiểu dữ liệu | Khóa / Ràng buộc | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| CustomerID | NUMBER | PK, IDENTITY(1,1) | Mã khách hàng. |
| FirstName | NVARCHAR2(40) | NOT NULL | Tên khách hàng. |
| LastName | NVARCHAR2(20) | NOT NULL | Họ khách hàng. |
| CompanyName | NVARCHAR2(40) | Allow NULL | Họ tên công ty/ doanh nghiệp (nếu có). |
| Phone | VARCHAR2(15) | UNIQUE, NOT NULL | Số điện thoại liên lạc. |
| Address | NVARCHAR2(255) | Allow NULL | Địa chỉ đăng ký mặc định của khách hàng. |
| Email | VARCHAR2(100) | UNIQUE, Allow NULL | Email đăng nhập hoặc liên lạc. |
| CreatedDate | DATETIME | DEFAULT GETDATE(), NOT NULL | Ngày đăng ký hồ sơ khách hàng. |
| PreferencesNote | NVARCHAR2(500) | Allow NULL | Ghi chú về sở thích hoặc hành vi mua sắm. |
| TotalAccumulatedSpent | NUMBER(19,4) | DEFAULT 0, CHECK (\>= 0\) | Tổng chi tiêu lũy kế để xét thăng hạng thành viên. |
| CustomerTypeID | NUMBER | FK, NOT NULL | Tham chiếu mã phân loại khách hàng (B2B, VIP...). |

### **32\. Bảng Feedback**

| Tên thuộc tính | Kiểu dữ liệu | Khóa / Ràng buộc | Mô tả nghiệp vụ |
| :---- | :---- | :---- | :---- |
| FeedbackID | NUMBER | PK, IDENTITY(1,1) | Mã định danh duy nhất cho mỗi phản hồi. |
| OrderDetailID | NUMBER | FK, NOT NULL | Liên kết trực tiếp sản phẩm trong hóa đơn được đánh giá. |
| CustomerID | NUMBER | FK, NOT NULL | Khách hàng thực hiện gửi phản hồi. |
| Comment | VARCHAR2(200) | NOT NULL | Nội dung chi tiết phản hồi. |
| FeedBackDate | TIMESTAMP | DEFAULT GETDATE() | Thời điểm ghi nhận phản hồi. |
| AttachmentURL | VARCHAR2(255) | Allow NULL | Đường dẫn đính kèm hình ảnh/file minh chứng. |
| Rating | NUMBER | NOT NULL | Điểm số đánh giá (sao). |

