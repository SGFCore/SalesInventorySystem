// 1. CUSTOMERTYPE TABLE [cite: 6]
export type CustomerType = {
  CustomerTypeID: number;
  CustomerTypeName: string;
  Discount: number;
  Detail: string;
  SpendingLimit: number;
};

// 2. CUSTOMER TABLE [cite: 22]
export type Customer = {
  CustomerID: number;
  CustomerTypeID: number;
  FirstName: string;
  LastName: string;
  CompanyName: string;
  Phone: string;
  Address: string;
  Email: string;
  CreatedDate: Date;
  TotalAccumulatedSpent: number;
};

// 3. CATEGORY TABLE [cite: 50]
export type Category = {
  CategoryID: number;
  CategoryName: string;
};

// 4. PRODUCT TABLE [cite: 57]
export type Product = {
  ProductID: number;
  ProductName: string;
  Detail: string;
  ProductPrice: number;
  ProductStatus: number;
  CategoryName: string;
  AllowReturn: number;
  ImageURL: string;
  ProductTypeName: string;
};

// 5. PRODUCTTYPE TABLE [cite: 73]
export type ProductType = {
  ProductTypeID: number;
  ProductTypeName: string;
  CategoryID: number;
};

// 6. COMBO TABLE [cite: 89]
export type Combo = {
  ComboID: number;
  ComboPrice: number;
};

// 7. COMBODETAIL TABLE [cite: 96]
export type ComboDetail = {
  ComboID: number;
  ProductID: number;
  Quantity: number;
};

// 8. WAREHOUSE TABLE [cite: 106]
export type Warehouse = {
  WareHouseID: number;
  WareHouseName: string;
  ManagerID: number;
  Address: string;
  ContactNumber: string;
  Capacity: number;
  Status: number;
  WarehouseType: number;
};

// 9. EMPLOYEE TABLE [cite: 123]
export type Employee = {
  EmployeeID: number;
  Fullname: string;
  Email: string;
  Phone: string;
  PasswordHash: string;
  Status: number;
};

// 10. ROLE TABLE [cite: 141]
export type Role = {
  RoleID: number;
  RoleName: string;
};

// 11. EMPLOYEEROLE TABLE [cite: 148]
export type EmployeeRole = {
  EmployeeID: number;
  RoleID: number;
};

// 12. SHIPCOMPANY TABLE [cite: 159]
export type ShipCompany = {
  ShipCompanyID: number;
  ShipCompanyName: string;
  SupportedRegion: string;
  Phone: string;
  Email: string;
  Address: string;
  Notes: string;
  Status: number;
};

// 13. INVOICE TABLE [cite: 178]
export type Invoice = {
  InvoiceID: number;
  CustomerID: number;
  EmployeeID: number;
  SaleChannelCode: number;
  TotalAmount: number;
  TaxAmount: number;
  FinalAmount: number;
  Status: string;
  InvoiceDate: Date;
};

// 14. ORDER TABLE [cite: 198]
export type Order = {
  OrderID: number;
  CustomerName: string;
  EmployeeID: number;
  InvoiceID: number;
  ShipCode: string;
  ShipCompanyID: number;
  TotalAmount: number;
  OrderStatus: number;
  ShippingStatus: number;
  ShipmentNote: string;
  ShippingFee: number;
  ExportReceiptID: number;
};

// 15. ORDERDETAIL TABLE [cite: 224]
export type OrderDetail = {
  OrderDetailID: number;
  OrderID: number;
  ProductID: number;
  ComboID: number;
  Quantity: number;
  UnitPrice: number;
  DiscountAmount: number;
  TotalAmount: number;
};

// 16. INVOICEDETAIL TABLE [cite: 246]
export type InvoiceDetail = {
  InvoiceDetailID: number;
  InvoiceID: number;
  ProductID: number;
  ComboID: number;
  Quantity: number;
  UnitPrice: number;
  DiscountAmount: number;
  TotalAmount: number;
};

// 17. PAYMENTMETHOD TABLE [cite: 268]
export type PaymentMethod = {
  PaymentMethodID: number;
  PaymentName: string;
  Status: number;
};

// 18. PAYMENT TABLE [cite: 279]
export type Payment = {
  PaymentID: number;
  InvoiceID: number;
  PaymentMethodID: number;
  AmountPaid: number;
  ReferenceCode: string;
  PaymentDate: Date;
};

// 19. RETURNPOLICY TABLE [cite: 293]
export type ReturnPolicy = {
  PolicyID: number;
  PolicyName: string;
  MaxReturnDays: number;
  PenaltyFeeRate: number;
  EffectiveDate: Date;
  IsActive: number;
};

// 20. ORDERRETURN TABLE [cite: 307]
export type OrderReturn = {
  ReturnID: number;
  OrderName: string;
  EmployeeName: string;
  ReturnDate: Date;
  Reason: string;
  TotalRefund: number;
  ReturnRefCode: string;
  Status: string;
};

// 21. RETURNDETAIL TABLE [cite: 323]
export type ReturnDetail = {
  ReturnID: number;
  ProductID: number;
  Quantity: number;
  QC_Status: string;
  TargetWarehouseID: number;
  ActionTaken: string;
};

// 22. DETAILINVENTORY TABLE [cite: 343]
export type DetailInventory = {
  WarehouseID: number;
  ProductID: number;
  CurrentQuantity: number;
  RealStock: number;
  AvailableStock: number;
  MinStock: number;
  MaxStock: number;
  IsAlertEnabled: number;
  StorageLocation: string;
};

// 23. NOTIFICATION TABLE [cite: 363]
export type Notification = {
  NotificationID: number;
  EmployeeID: number;
  Title: string;
  ProductID: number;
  Message: string;
  Type: number;
  Status: number;
  CreatedDate: Date;
};

// 24. REQUESTFORM TABLE [cite: 384]
export type RequestForm = {
  RequestID: number;
  EmployeeID: number;
  CreatedDate: Date;
  Status: string;
  ApproverID: number;
  RejectReason: string;
};

// 25. REQUESTDETAIL TABLE [cite: 401]
export type RequestDetail = {
  RequestID: number;
  ProductId: number;
  ProductName: string;
  Quantity: number;
};

// 26. TRANSFERTICKET TABLE [cite: 415]
export type TransferTicket = {
  TransferID: number;
  EmployeeID: number;
  SourceWHID: number;
  DestWHID: number;
  Status: string;
  CreatedDate: Date;
};

// 27. TRANSFERTICKETDETAIL TABLE [cite: 434]
export type TransferTicketDetail = {
  TransferID: number;
  ProductID: number;
  ExportQuantity: number;
  ReceiveQuantity: number;
  RequestQuantity: number;
};

// 28. IMPORTRECEIPT TABLE [cite: 451]
export type ImportReceipt = {
  ImportReceiptID: number;
  EmployeeID: number;
  WarehouseID: number;
  Status: string;
  CreatedDate: Date;
  RequestID: number;
  DiscrepancyReason: string;
  DiscrepancyImageURL: string;
  HasDiscrepancy: number;
};

// 29. IMPORTRECEIPTDETAIL TABLE [cite: 478]
export type ImportReceiptDetail = {
  ImportReceiptID: number;
  ProductID: number;
  ProductName: string;
  ExpectedQuantity: number;
  ActualQuantity: number;
};

// 30. EXPORTRECEIPT TABLE [cite: 492]
export type ExportReceipt = {
  ExportReceiptID: number;
  EmployeeID: number;
  ExportType: number;
  Reason: string;
  Status: string;
  CreatedDate: Date;
  WarehouseID: number;
};

// 31. EXPORTRECEIPTDETAIL TABLE [cite: 512]
export type ExportReceiptDetail = {
  ExportReceiptID: number;
  ProductID: number;
  Quantity: number;
};

// 32. COUNTSHEET TABLE [cite: 525]
export type CountSheet = {
  CountSheetId: number;
  CreatedDate: Date;
  Status: number;
};

// 33. COUNTSHEETDETAIL TABLE [cite: 535]
export type CountSheetDetail = {
  CountSheetld: number;
  WarehouseID: number;
  ProductId: number;
  Quantity: number;
  Note: string;
};

// 34. DISCOUNT TABLE [cite: 555]
export type Discount = {
  DiscountID: number;
  CustomerTypeID: number;
  DiscountName: string;
  Value: number;
  Detail: string;
  Status: number;
  ExpiryDate: Date;
  StartDate: Date;
  AppliedProductID: string;
};

// 35. LISTDISCOUNT TABLE [cite: 575]
export type ListDiscount = {
  OrderID: number;
  DiscountID: number;
  AppliedValue: number;
};

// 36. FEEDBACK TABLE [cite: 587]
export type Feedback = {
  FeedbackID: number;
  OrderDetailID: number;
  CustomerID: number;
  FeedbackComment: string;
  FeedBackDate: Date;
  AttachmentURL: string;
  Rating: number;
};
