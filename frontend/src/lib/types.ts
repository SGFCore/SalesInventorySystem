// category.dto.ts
export type Category = {
  id: number;
  categoryname: string;
}

// combodetail.dto.ts
export type Combodetail = {
  comboId: number;
  productId: number;
  quantity: number;
}

// combo.dto.ts
export type Combo = {
  id: number;
  comboprice: number;
}

// countsheetdetail.dto.ts
export type Countsheetdetail = {
  countsheetId: number;
  warehouseId: number;
  productId: number;
  quantity: number;
  note: string;
}

// countsheet.dto.ts
export type Countsheet = {
  id: number;
  createddate: string; // LocalDate -> ISO date string
  status: number;
}

// customer.dto.ts
export type Customer = {
  id: number;
  customertypeId: number;
  firstname: string;
  lastname: string;
  companyname: string;
  phone: string;
  address: string;
  email: string;
  createddate: string; // LocalDate -> ISO date string
  totalaccumulatedspent: number;
}

// customertype.dto.ts
export type Customertype = {
  id: number;
  customertypename: string;
  discount: number;
  detail: string;
  spendinglimit: number;
}

// detailinventory.dto.ts
export type Detailinventory = {
  WarehouseID: number;
  ProductID: number;
  CurrentQuantity: number;
  RealStock: number;
  AvailableStock: number;
  MinStock: number;
  MaxStock: number;
  IsAlertEnabled: number;
  StorageLocation: string;
}

// discount.dto.ts
export type Discount = {
  id: number;
  customertypeId: number;
  discountname: string;
  value: number;
  detail: string;
  appliedproductids: string;
  status: number;
  expirydate: string; // LocalDate -> ISO date string
  startdate: string; // LocalDate -> ISO date string
}

// employee.dto.ts
export type Employee = {
  EmployeeID: number;
  Fullname: string;
  Email: string;
  Phone: string;
  password: string;
  Status: number;
}

// employeerole.dto.ts
export type Employeerole = {
  employeeId: number;
  roleId: number;
}

// exportreceiptdetail.dto.ts
export type Exportreceiptdetail = {
  ExportReceiptID: number;
  ProductID: number;
  Quantity: number;
}

// exportreceipt.dto.ts
export type Exportreceipt = {
  id: number;
  employeeId: number;
  exporttype: number;
  reason: string;
  status: string;
  createddate: string; // LocalDate -> ISO date string
  warehouseId: number;
}

// feedback.dto.ts
export type Feedback = {
  FeedbackID: number;
  OrderDetailID: number;
  CustomerID: number;
  FeedbackComment: string;
  FeedBackDate: string; // Instant -> ISO string
  AttachmentURL: string;
  Rating: number;
}

// importreceiptdetail.dto.ts
export type Importreceiptdetail = {
  ImportReceiptID: number;
  ProductID: number;
  ProductName: string;
  ExpectedQuantity: number;
  ActualQuantity: number;
}

// importreceipt.dto.ts
export type Importreceipt = {
  ImportReceiptID: number;
  EmployeeID: number;
  WarehouseID: number;
  Status: string;
  CreatedDate: string; // LocalDate -> ISO date string
  RequestID: number;
  DiscrepancyReason: string;
  DiscrepancyImageURL: string;
  HasDiscrepancy: number;
}

// invoicedetail.dto.ts
export type Invoicedetail = {
  InvoiceDetailID: number;
  InvoiceID: number;
  ProductID: number;
  ComboID: number;
  Quantity: number;
  UnitPrice: number;
  DiscountAmount: number;
  TotalAmount: number;
}

// invoice.dto.ts
export type Invoice = {
  InvoiceID: number;
  CustomerID: number;
  EmployeeID: number;
  SaleChannelCode: number;
  TotalAmount: number;
  TaxAmount: number;
  FinalAmount: number;
  Status: string;
  InvoiceDate: string; // LocalDate -> ISO date string
}

// listdiscount.dto.ts
export type Listdiscount = {
  orderId: number;
  discountId: number;
  appliedvalue: number;
}

// listdiscountId.dto.ts
export type ListdiscountId = {
  orderid: number;
  discountid: number;
}

// notification.dto.ts
export type Notification = {
  NotificationID: number;
  EmployeeID: number;
  Title: string;
  ProductID: number;
  Message: string;
  Type: number;
  Status: number;
  CreatedDate: string; // LocalDate -> ISO date string
}

// orderdetail.dto.ts
export type OrderDetail = {
  OrderDetailID: number;
  OrderID: number;
  ProductID: number;
  ComboID: number;
  Quantity: number;
  UnitPrice: number;
  DiscountAmount: number;
  TotalAmount: number;
}

// order.dto.ts
export type Order = {
  id: number;
  customerId: number;
  employeeId: number;
  invoiceId: number;
  shipcode: string;
  shipcompanyId: number;
  totalamount: number;
  orderstatus: number;
  shippingstatus: number;
  shipmentnote: string;
  shippingfee: number;
  exportreceiptId: number;
}

// orderreturn.dto.ts
export type OrderReturn = {
  id: number;
  orderId: number;
  employeeId: number;
  returndate: string; // LocalDate -> ISO date string
  reason: string;
  totalrefund: number;
  returnrefcode: string;
  status: string;
}

// payment.dto.ts
export type Payment = {
  PaymentID: number;
  InvoiceID: number;
  PaymentMethodID: number;
  AmountPaid: number;
  ReferenceCode: string;
  PaymentDate: string; // Instant -> ISO string
}

// paymentmethod.dto.ts
export type PaymentMethod = {
  PaymentMethodID: number;
  PaymentName: string;
  Status: number;
}

// product.dto.ts
export type Product = {
  ProductID: number;
  ProductName: string;
  Detail: string;
  ProductPrice: number;
  ProductStatus: number;
  CategoryID: number;
  AllowReturn: number;
  ImageURL: string;
  ProductTypeID: number;
}

// producttype.dto.ts
export type Producttype = {
  id: number;
  producttypename: string;
  categoryid: number;
}

// requestdetail.dto.ts
export type RequestDetail = {
  RequestID: number;
  ProductID: number;
  Quantity: number;
}

// requestdetailId.dto.ts
export type RequestdetailId = {
  requestid: number;
  productid: number;
}

// requestform.dto.ts
export type RequestForm = {
  RequestID: number;
  EmployeeID: number;
  CreatedDate: string; // LocalDate -> ISO date string
  Status: string;
  ApproverID: number;
  RejectReason: string;
}

// returndetail.dto.ts
export type ReturnDetail = {
  ReturnID: number;
  ProductID: number;
  Quantity: number;
  QC_Status: string;
  TargetWarehouseID: number;
  ActionTaken: string;
}

// returnpolicy.dto.ts
export type ReturnPolicy = {
  PolicyID: number;
  PolicyName: string;
  MaxReturnDays: number;
  PenaltyFeeRate: number;
  EffectiveDate: string; // LocalDate -> ISO date string
  IsActive: number;
}

// role.dto.ts
export type Role = {
  RoleID: number;
  RoleName: string;
}

// shipcompany.dto.ts
export type Shipcompany = {
  ShipCompanyID: number;
  ShipCompanyName: string;
  SupportedRegion: string;
  Phone: string;
  Email: string;
  Address: string;
  Notes: string;
  Status: number;
}

// transferticketdetail.dto.ts
export type Transferticketdetail = {
  TransferID: number;
  ProductID: number;
  ExportQuantity: number;
  ReceiveQuantity: number;
  RequestQuantity: number;
}

// transferticket.dto.ts
export type Transferticket = {
  TransferID: number;
  EmployeeID: number;
  SourceWHID: number;
  DestWHID: number;
  Status: string;
  CreatedDate: string; // LocalDate -> ISO date string
}

// warehouse.dto.ts
export type Warehouse = {
  WareHouseID: number;
  WareHouseName: string;
  ManagerID: number;
  Address: string;
  ContactNumber: string;
  Capacity: number;
  Status: number;
  WarehouseType: number;
}