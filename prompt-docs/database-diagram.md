// Link: https://dbdiagram.io/d/68e1de25d2b621e4224b6a84

Table PRODUCT {
ProductID number [pk, increment]
ProductName nvarchar [not null]
Detail nvarchar [null]
ProductPrice number [note: 'CHECK > 0']
ProductStatus number [note: 'CHECK IN (0,1)']
ProductTypeID number [ref: > ProductType.ProductTypeID]
DiscountID number [null, ref: > Discount.DiscountID]
AllowReturn boolean [not null]
ImageURL varchar [null]
}

Table Category {
CategoryID number [pk, increment]
CategoryName varchar [not null]
}

Table ProductType {
ProductTypeID number [pk, increment]
ProductTypeName varchar [not null]
CategoryID number [not null, ref: > Category.CategoryID]
}

Table Combo {
ComboID number [pk, increment]
ComboPrice number [note: 'CHECK >= 0']
}

Table ComboDetail {
ComboID number [pk, ref: > Combo.ComboID]
ProductID number [pk, ref: > PRODUCT.ProductID]
Quantity number [note: 'CHECK > 0']
}

Table Discount {
DiscountID number [pk, increment]
CUSTOMERTYPE number [null, ref: > CustomerType.CustomerTypeID]
DiscountName nvarchar [not null]
Value number [not null]
Detail varchar [not null]
Status number [default: 2, note: 'CHECK IN (0,1,2)']
ExpiryDate datetime [not null]
StartDate datetime [not null]
}

Table CustomerType {
CustomerTypeID number [pk]
CustomerTypeName varchar [not null]
}

Table Customer {
CustomerID number [pk, increment]
FirstName nvarchar [not null]
LastName nvarchar [not null]
CompanyName nvarchar [null]
Phone varchar [unique, not null]
Address nvarchar [null]
Email varchar [unique, null]
CreatedDate datetime [not null]
PreferencesNote nvarchar [null]
TotalAccumulatedSpent number [default: 0]
CustomerTypeID number [not null, ref: > CustomerType.CustomerTypeID]
}

Table INVOICE {
InvoiceID number [pk, increment]
CustomerID number [not null, ref: > Customer.CustomerID]
EmployeeID number [null, ref: > Employee.EmployeeID]
SaleChannelID number [not null]
TotalAmount number [note: 'CHECK >= 0']
TaxAmount number [default: 0]
FinalAmount number [note: 'CHECK >= 0']
Status varchar [not null]
InvoiceDate date [default: `SYSDATE`]
}

Table INVOICEDETAIL {
InvoiceDetailID number [pk, increment]
InvoiceID number [not null, ref: > INVOICE.InvoiceID]
ProductID number [null, ref: > PRODUCT.ProductID]
ComboID number [null, ref: > Combo.ComboID]
Quantity number [note: 'CHECK > 0']
UnitPrice number [note: 'CHECK >= 0']
DiscountAmount number [default: 0]
TotalAmount number [not null]
}

Table LIST_DISCOUNT {
OrderID number [pk, not null, ref: > Order.OrderID]
DiscountID number [pk, not null, ref: > Discount.DiscountID]
AppliedValue number [not null]
}

Table Order {
OrderID number [pk, increment]
CustomerID number [not null, ref: > Customer.CustomerID]
EmployeeID number [null, ref: > Employee.EmployeeID]
InvoiceID number [null, ref: > INVOICE.InvoiceID]
ShipperID number [null]
TotalAmount number [note: 'CHECK >= 0']
OrderStatus number [not null, note: 'CHECK IN (0,1,2,3,4,5)']
ShippingStatus number [null, note: 'CHECK IN (0,1,2,3)']
ShipmentNote varchar [null]
ShipCompanyID number [null, ref: > ShipCompany.ShipCompanyID]
TrackingCode varchar [unique, null]
ShippingFee number [null, note: 'CHECK >= 0']
ExportTicketID number [null, ref: > ExportTicket.TicketID]
CreatedDate date [default: `SYSDATE`]
}

Table OrderDetail {
OrderDetailID number [pk, increment]
OrderID number [not null, ref: > Order.OrderID]
ProductID number [null, ref: > PRODUCT.ProductID]
ComboID number [null, ref: > Combo.ComboID]
Quantity number [note: 'CHECK > 0']
UnitPrice number [note: 'CHECK >= 0']
DiscountAmount number [default: 0]
TotalAmount number [not null]
}

Table Feedback {
FeedbackID number [pk, increment]
OrderDetailID number [not null, ref: > OrderDetail.OrderDetailID]
CustomerID number [not null, ref: > Customer.CustomerID]
Comment varchar [not null]
FeedBackDate timestamp [default: `GETDATE()`]
AttachmentURL varchar [null]
Rating number [not null]
}

Table Payment {
PaymentID number [pk, increment]
InvoiceID number [not null, ref: > INVOICE.InvoiceID]
PaymentMethodID number [not null, ref: > PaymentMethod.PaymentMethodID]
AmountPaid number [note: 'CHECK > 0']
ReferenceCode varchar [null]
PaymentDate timestamp [default: `CURRENT_TIMESTAMP`]
}

Table PaymentMethod {
PaymentMethodID number [pk, increment]
PMName nvarchar [unique, not null]
Instruction nvarchar [null]
Status number [note: 'CHECK IN (0,1)']
}

Table ShipCompany {
ShipCompanyID number [pk, increment]
ShipCompanyName nvarchar [unique, not null]
SupportedRegion varchar [not null]
Phone varchar [not null]
Email varchar [null]
Address nvarchar [null]
Notes nvarchar [null]
Status number [default: 1, note: 'CHECK IN (0,1)']
}

Table Employee {
EmployeeID number [pk, increment]
Fullname nvarchar [not null]
Email varchar [unique, null]
Phone varchar [not null]
PasswordHash varchar [not null]
Status bit [default: 1]
}

Table Role {
RoleID number [pk, note: 'CHECK IN (0,1,2)']
RoleName varchar [not null]
}

Table EmployeeRole {
EmployeeID number [pk, not null, ref: > Employee.EmployeeID]
RoleID number [pk, not null, ref: > Role.RoleID]
}

Table WareHouse {
WareHouseID number [pk, increment]
WHName nvarchar [not null]
ManagerID number [not null, ref: > Employee.EmployeeID]
Address nvarchar [not null]
ContactNumber number [not null]
Capacity number [not null]
Status number [note: 'CHECK IN (0,1)']
WarehouseType number [note: 'CHECK IN (1,2,3)']
}

Table DetailedInventory {
WarehouseID number [pk, ref: > WareHouse.WareHouseID]
ProductID number [pk, ref: > PRODUCT.ProductID]
CurrentQuantity number [default: 0]
RealStock number [default: 0, note: 'CHECK >= 0']
AvailableStock number [default: 0, note: 'CHECK >= 0']
MinStock number [note: 'CHECK >= 0']
MaxStock number [note: 'CHECK >= 0']
IsAlertEnabled number [default: 1, note: 'CHECK IN (0,1)']
StorageLocation nvarchar [null]
}

Table Notification {
NotificationID number [pk, increment]
EmployeeID number [not null, ref: > Employee.EmployeeID]
Title nvarchar [not null]
ProductID number [null, ref: > PRODUCT.ProductID]
Message nvarchar [not null]
Type number [note: 'CHECK IN (1,2,3)']
Status bit [note: 'CHECK IN (0,1)']
CreatedDate datetime [not null, default: `GETDATE()`]
}

Table ReplenishRequest {
RequestID number [pk, increment]
EmployeeID number [not null, ref: > Employee.EmployeeID]
CreatedDate date [default: `SYSDATE`]
Status nvarchar [default: 'Chờ duyệt']
ApproverID number [null, ref: > Employee.EmployeeID]
RejectReason nvarchar [null]
}

Table RequestDetail {
RequestID number [pk, not null, ref: > ReplenishRequest.RequestID]
ProductID number [pk, not null, ref: > PRODUCT.ProductID]
Quantity number [note: 'CHECK > 0']
}

Table ImportReceipt {
ReceiptID number [pk, increment]
EmployeeID number [not null, ref: > Employee.EmployeeID]
WarehouseID number [not null, ref: > WareHouse.WareHouseID]
Status nvarchar [default: 'Bản nháp']
CreatedDate date [default: `SYSDATE`]
RequestID number [null, ref: > ReplenishRequest.RequestID]
DiscrepancyReason nvarchar [null]
DiscrepancyImageURL varchar [null]
HasDiscrepancy number [default: 0, note: 'CHECK IN (0,1)']
}

Table ImportReceiptDetail {
ReceiptID number [pk, not null, ref: > ImportReceipt.ReceiptID]
ProductID number [pk, not null, ref: > PRODUCT.ProductID]
ExpectedQuantity number [note: 'CHECK > 0']
ActualQuantity number [note: 'CHECK >= 0']
}

Table TransferTicket {
TransferID number [pk, increment]
EmployeeID number [not null, ref: > Employee.EmployeeID]
SourceWH_ID number [not null, ref: > WareHouse.WareHouseID]
DestWH_ID number [not null, ref: > WareHouse.WareHouseID]
Status nvarchar [default: 'Chờ xuất kho']
CreatedDate date [default: `SYSDATE`]
}

Table TransferTicketDetail {
TransferID number [pk, not null, ref: > TransferTicket.TransferID]
ProductID number [pk, not null, ref: > PRODUCT.ProductID]
ExportQuantity number [null]
ReceiveQuantity number [null]
RequestQuantity number [note: 'CHECK > 0']
}

Table ExportTicket {
TicketID number [pk, increment]
EmployeeID number [not null, ref: > Employee.EmployeeID]
Status nvarchar [default: 'Đã hoàn thành']
CreatedDate date [default: `SYSDATE`]
}

Table ExportTicketDetail {
TicketID number [pk, not null, ref: > ExportTicket.TicketID]
ProductID number [pk, not null, ref: > PRODUCT.ProductID]
Quantity number [note: 'CHECK > 0']
}

Table CountSheet {
CountSheetId number [pk, not null]
CreatedDate date [default: `SYSDATE`]
Status number [default: 0, not null, note: 'CHECK IN (0,1,2,3,4)']
}

Table CountSheetDetail {
CountSheetId number [pk, not null, ref: > CountSheet.CountSheetId]
WarehouseId number [pk, not null, ref: > WareHouse.WareHouseID]
ProductId number [pk, not null, ref: > PRODUCT.ProductID]
Quantity number [not null]
Note nvarchar [null]
}
