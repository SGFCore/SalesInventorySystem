import { apiClient } from "./api-client";
import type {
  CustomerType,
  Customer,
  Category,
  Product,
  ProductType,
  Combo,
  ComboDetail,
  Warehouse,
  Employee,
  Role,
  EmployeeRole,
  ShipCompany,
  Invoice,
  Order,
  OrderDetail,
  InvoiceDetail,
  PaymentMethod,
  Payment,
  ReturnPolicy,
  OrderReturn,
  ReturnDetail,
  DetailInventory,
  Notification,
  RequestForm,
  RequestDetail,
  TransferTicket,
  TransferTicketDetail,
  ImportReceipt,
  ImportReceiptDetail,
  ExportReceipt,
  ExportReceiptDetail,
  CountSheet,
  CountSheetDetail,
  Discount,
  ListDiscount,
  Feedback,
} from "./types";

export const api = {
  // Auth để Bảo làm

  // 1. CUSTOMERTYPE TABLE
  customerTypes: {
    list: () => apiClient.get<CustomerType[]>("/customer-types"),
    get: (id: number) => apiClient.get<CustomerType>(`/customer-types/${id}`),
    create: (data: CustomerType) =>
      apiClient.post<CustomerType>("/customer-types", data),
    update: (id: number, data: CustomerType) =>
      apiClient.put<CustomerType>(`/customer-types/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/customer-types/${id}`),
  },

  // 2. CUSTOMER TABLE
  customers: {
    list: () => apiClient.get<Customer[]>("/customers"),
    get: (id: number) => apiClient.get<Customer>(`/customers/${id}`),
    create: (data: Customer) => apiClient.post<Customer>("/customers", data),
    update: (id: number, data: Customer) =>
      apiClient.put<Customer>(`/customers/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/customers/${id}`),
  },

  // 3. CATEGORY TABLE
  categories: {
    list: () => apiClient.get<Category[]>("/categories"),
    get: (id: number) => apiClient.get<Category>(`/categories/${id}`),
    create: (data: Category) => apiClient.post<Category>("/categories", data),
    update: (id: number, data: Category) =>
      apiClient.put<Category>(`/categories/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/categories/${id}`),
  },

  // 4. PRODUCT TABLE
  products: {
    list: () => apiClient.get<Product[]>("/products"),
    get: (id: number) => apiClient.get<Product>(`/products/${id}`),
    create: (data: Product) => apiClient.post<Product>("/products", data),
    update: (id: number, data: Product) =>
      apiClient.put<Product>(`/products/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/products/${id}`),
  },

  // 5. PRODUCTTYPE TABLE
  productTypes: {
    list: () => apiClient.get<ProductType[]>("/product-types"),
    get: (id: number) => apiClient.get<ProductType>(`/product-types/${id}`),
    create: (data: ProductType) =>
      apiClient.post<ProductType>("/product-types", data),
    update: (id: number, data: ProductType) =>
      apiClient.put<ProductType>(`/product-types/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/product-types/${id}`),
  },

  // 6. COMBO TABLE
  combos: {
    list: () => apiClient.get<Combo[]>("/combos"),
    get: (id: number) => apiClient.get<Combo>(`/combos/${id}`),
    create: (data: Combo) => apiClient.post<Combo>("/combos", data),
    update: (id: number, data: Combo) =>
      apiClient.put<Combo>(`/combos/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/combos/${id}`),
  },

  // 7. COMBODETAIL TABLE
  comboDetails: {
    list: () => apiClient.get<ComboDetail[]>("/combo-details"),
    get: (id: number) => apiClient.get<ComboDetail>(`/combo-details/${id}`),
    create: (data: ComboDetail) =>
      apiClient.post<ComboDetail>("/combo-details", data),
    update: (id: number, data: ComboDetail) =>
      apiClient.put<ComboDetail>(`/combo-details/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/combo-details/${id}`),
  },

  // 8. WAREHOUSE TABLE
  warehouses: {
    list: () => apiClient.get<Warehouse[]>("/warehouses"),
    get: (id: number) => apiClient.get<Warehouse>(`/warehouses/${id}`),
    create: (data: Warehouse) => apiClient.post<Warehouse>("/warehouses", data),
    update: (id: number, data: Warehouse) =>
      apiClient.put<Warehouse>(`/warehouses/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/warehouses/${id}`),
  },

  // 9. EMPLOYEE TABLE
  employees: {
    list: () => apiClient.get<Employee[]>("/employees"),
    get: (id: number) => apiClient.get<Employee>(`/employees/${id}`),
    create: (data: Employee) => apiClient.post<Employee>("/employees", data),
    update: (id: number, data: Employee) =>
      apiClient.put<Employee>(`/employees/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/employees/${id}`),
  },

  // 10. ROLE TABLE
  roles: {
    list: () => apiClient.get<Role[]>("/roles"),
    get: (id: number) => apiClient.get<Role>(`/roles/${id}`),
    create: (data: Role) => apiClient.post<Role>("/roles", data),
    update: (id: number, data: Role) =>
      apiClient.put<Role>(`/roles/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/roles/${id}`),
  },

  // 11. EMPLOYEEROLE TABLE
  employeeRoles: {
    list: () => apiClient.get<EmployeeRole[]>("/employee-roles"),
    get: (id: number) => apiClient.get<EmployeeRole>(`/employee-roles/${id}`),
    create: (data: EmployeeRole) =>
      apiClient.post<EmployeeRole>("/employee-roles", data),
    update: (id: number, data: EmployeeRole) =>
      apiClient.put<EmployeeRole>(`/employee-roles/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/employee-roles/${id}`),
  },

  // 12. SHIPCOMPANY TABLE
  shipCompanies: {
    list: () => apiClient.get<ShipCompany[]>("/ship-companies"),
    get: (id: number) => apiClient.get<ShipCompany>(`/ship-companies/${id}`),
    create: (data: ShipCompany) =>
      apiClient.post<ShipCompany>("/ship-companies", data),
    update: (id: number, data: ShipCompany) =>
      apiClient.put<ShipCompany>(`/ship-companies/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/ship-companies/${id}`),
  },

  // 13. INVOICE TABLE
  invoices: {
    list: () => apiClient.get<Invoice[]>("/invoices"),
    get: (id: number) => apiClient.get<Invoice>(`/invoices/${id}`),
    create: (data: Invoice) => apiClient.post<Invoice>("/invoices", data),
    update: (id: number, data: Invoice) =>
      apiClient.put<Invoice>(`/invoices/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/invoices/${id}`),
  },

  // 14. ORDER TABLE
  orders: {
    list: () => apiClient.get<Order[]>("/orders"),
    get: (id: number) => apiClient.get<Order>(`/orders/${id}`),
    create: (data: Order) => apiClient.post<Order>("/orders", data),
    update: (id: number, data: Order) =>
      apiClient.put<Order>(`/orders/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/orders/${id}`),
  },

  // 15. ORDERDETAIL TABLE
  orderDetails: {
    list: () => apiClient.get<OrderDetail[]>("/order-details"),
    get: (id: number) => apiClient.get<OrderDetail>(`/order-details/${id}`),
    create: (data: OrderDetail) =>
      apiClient.post<OrderDetail>("/order-details", data),
    update: (id: number, data: OrderDetail) =>
      apiClient.put<OrderDetail>(`/order-details/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/order-details/${id}`),
  },

  // 16. INVOICEDETAIL TABLE
  invoiceDetails: {
    list: () => apiClient.get<InvoiceDetail[]>("/invoice-details"),
    get: (id: number) => apiClient.get<InvoiceDetail>(`/invoice-details/${id}`),
    create: (data: InvoiceDetail) =>
      apiClient.post<InvoiceDetail>("/invoice-details", data),
    update: (id: number, data: InvoiceDetail) =>
      apiClient.put<InvoiceDetail>(`/invoice-details/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/invoice-details/${id}`),
  },

  // 17. PAYMENTMETHOD TABLE
  paymentMethods: {
    list: () => apiClient.get<PaymentMethod[]>("/payment-methods"),
    get: (id: number) => apiClient.get<PaymentMethod>(`/payment-methods/${id}`),
    create: (data: PaymentMethod) =>
      apiClient.post<PaymentMethod>("/payment-methods", data),
    update: (id: number, data: PaymentMethod) =>
      apiClient.put<PaymentMethod>(`/payment-methods/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/payment-methods/${id}`),
  },

  // 18. PAYMENT TABLE
  payments: {
    list: () => apiClient.get<Payment[]>("/payments"),
    get: (id: number) => apiClient.get<Payment>(`/payments/${id}`),
    create: (data: Payment) => apiClient.post<Payment>("/payments", data),
    update: (id: number, data: Payment) =>
      apiClient.put<Payment>(`/payments/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/payments/${id}`),
  },

  // 19. RETURNPOLICY TABLE
  returnPolicies: {
    list: () => apiClient.get<ReturnPolicy[]>("/return-policies"),
    get: (id: number) => apiClient.get<ReturnPolicy>(`/return-policies/${id}`),
    create: (data: ReturnPolicy) =>
      apiClient.post<ReturnPolicy>("/return-policies", data),
    update: (id: number, data: ReturnPolicy) =>
      apiClient.put<ReturnPolicy>(`/return-policies/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/return-policies/${id}`),
  },

  // 20. ORDERRETURN TABLE
  orderReturns: {
    list: () => apiClient.get<OrderReturn[]>("/order-returns"),
    get: (id: number) => apiClient.get<OrderReturn>(`/order-returns/${id}`),
    create: (data: OrderReturn) =>
      apiClient.post<OrderReturn>("/order-returns", data),
    update: (id: number, data: OrderReturn) =>
      apiClient.put<OrderReturn>(`/order-returns/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/order-returns/${id}`),
  },

  // 21. RETURNDETAIL TABLE
  returnDetails: {
    list: () => apiClient.get<ReturnDetail[]>("/return-details"),
    get: (id: number) => apiClient.get<ReturnDetail>(`/return-details/${id}`),
    create: (data: ReturnDetail) =>
      apiClient.post<ReturnDetail>("/return-details", data),
    update: (id: number, data: ReturnDetail) =>
      apiClient.put<ReturnDetail>(`/return-details/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/return-details/${id}`),
  },

  // 22. DETAILINVENTORY TABLE
  detailInventories: {
    list: () => apiClient.get<DetailInventory[]>("/detail-inventories"),
    get: (id: number) =>
      apiClient.get<DetailInventory>(`/detail-inventories/${id}`),
    create: (data: DetailInventory) =>
      apiClient.post<DetailInventory>("/detail-inventories", data),
    update: (id: number, data: DetailInventory) =>
      apiClient.put<DetailInventory>(`/detail-inventories/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/detail-inventories/${id}`),
  },

  // 23. NOTIFICATION TABLE
  notifications: {
    list: () => apiClient.get<Notification[]>("/notifications"),
    get: (id: number) => apiClient.get<Notification>(`/notifications/${id}`),
    create: (data: Notification) =>
      apiClient.post<Notification>("/notifications", data),
    update: (id: number, data: Notification) =>
      apiClient.put<Notification>(`/notifications/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/notifications/${id}`),
  },

  // 24. REQUESTFORM TABLE
  requestForms: {
    list: () => apiClient.get<RequestForm[]>("/request-forms"),
    get: (id: number) => apiClient.get<RequestForm>(`/request-forms/${id}`),
    create: (data: RequestForm) =>
      apiClient.post<RequestForm>("/request-forms", data),
    update: (id: number, data: RequestForm) =>
      apiClient.put<RequestForm>(`/request-forms/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/request-forms/${id}`),
  },

  // 25. REQUESTDETAIL TABLE
  requestDetails: {
    list: () => apiClient.get<RequestDetail[]>("/request-details"),
    get: (id: number) => apiClient.get<RequestDetail>(`/request-details/${id}`),
    create: (data: RequestDetail) =>
      apiClient.post<RequestDetail>("/request-details", data),
    update: (id: number, data: RequestDetail) =>
      apiClient.put<RequestDetail>(`/request-details/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/request-details/${id}`),
  },

  // 26. TRANSFERTICKET TABLE
  transferTickets: {
    list: () => apiClient.get<TransferTicket[]>("/transfer-tickets"),
    get: (id: number) =>
      apiClient.get<TransferTicket>(`/transfer-tickets/${id}`),
    create: (data: TransferTicket) =>
      apiClient.post<TransferTicket>("/transfer-tickets", data),
    update: (id: number, data: TransferTicket) =>
      apiClient.put<TransferTicket>(`/transfer-tickets/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/transfer-tickets/${id}`),
  },

  // 27. TRANSFERTICKETDETAIL TABLE
  transferTicketDetails: {
    list: () =>
      apiClient.get<TransferTicketDetail[]>("/transfer-ticket-details"),
    get: (id: number) =>
      apiClient.get<TransferTicketDetail>(`/transfer-ticket-details/${id}`),
    create: (data: TransferTicketDetail) =>
      apiClient.post<TransferTicketDetail>("/transfer-ticket-details", data),
    update: (id: number, data: TransferTicketDetail) =>
      apiClient.put<TransferTicketDetail>(
        `/transfer-ticket-details/${id}`,
        data,
      ),
    delete: (id: number) =>
      apiClient.delete<void>(`/transfer-ticket-details/${id}`),
  },

  // 28. IMPORTRECEIPT TABLE
  importReceipts: {
    list: () => apiClient.get<ImportReceipt[]>("/import-receipts"),
    get: (id: number) => apiClient.get<ImportReceipt>(`/import-receipts/${id}`),
    create: (data: ImportReceipt) =>
      apiClient.post<ImportReceipt>("/import-receipts", data),
    update: (id: number, data: ImportReceipt) =>
      apiClient.put<ImportReceipt>(`/import-receipts/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/import-receipts/${id}`),
  },

  // 29. IMPORTRECEIPTDETAIL TABLE
  importReceiptDetails: {
    list: () => apiClient.get<ImportReceiptDetail[]>("/import-receipt-details"),
    get: (id: number) =>
      apiClient.get<ImportReceiptDetail>(`/import-receipt-details/${id}`),
    create: (data: ImportReceiptDetail) =>
      apiClient.post<ImportReceiptDetail>("/import-receipt-details", data),
    update: (id: number, data: ImportReceiptDetail) =>
      apiClient.put<ImportReceiptDetail>(`/import-receipt-details/${id}`, data),
    delete: (id: number) =>
      apiClient.delete<void>(`/import-receipt-details/${id}`),
  },

  // 30. EXPORTRECEIPT TABLE
  exportReceipts: {
    list: () => apiClient.get<ExportReceipt[]>("/export-receipts"),
    get: (id: number) => apiClient.get<ExportReceipt>(`/export-receipts/${id}`),
    create: (data: ExportReceipt) =>
      apiClient.post<ExportReceipt>("/export-receipts", data),
    update: (id: number, data: ExportReceipt) =>
      apiClient.put<ExportReceipt>(`/export-receipts/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/export-receipts/${id}`),
  },

  // 31. EXPORTRECEIPTDETAIL TABLE
  exportReceiptDetails: {
    list: () => apiClient.get<ExportReceiptDetail[]>("/export-receipt-details"),
    get: (id: number) =>
      apiClient.get<ExportReceiptDetail>(`/export-receipt-details/${id}`),
    create: (data: ExportReceiptDetail) =>
      apiClient.post<ExportReceiptDetail>("/export-receipt-details", data),
    update: (id: number, data: ExportReceiptDetail) =>
      apiClient.put<ExportReceiptDetail>(`/export-receipt-details/${id}`, data),
    delete: (id: number) =>
      apiClient.delete<void>(`/export-receipt-details/${id}`),
  },

  // 32. COUNTSHEET TABLE
  countSheets: {
    list: () => apiClient.get<CountSheet[]>("/count-sheets"),
    get: (id: number) => apiClient.get<CountSheet>(`/count-sheets/${id}`),
    create: (data: CountSheet) =>
      apiClient.post<CountSheet>("/count-sheets", data),
    update: (id: number, data: CountSheet) =>
      apiClient.put<CountSheet>(`/count-sheets/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/count-sheets/${id}`),
  },

  // 33. COUNTSHEETDETAIL TABLE
  countSheetDetails: {
    list: () => apiClient.get<CountSheetDetail[]>("/count-sheet-details"),
    get: (id: number) =>
      apiClient.get<CountSheetDetail>(`/count-sheet-details/${id}`),
    create: (data: CountSheetDetail) =>
      apiClient.post<CountSheetDetail>("/count-sheet-details", data),
    update: (id: number, data: CountSheetDetail) =>
      apiClient.put<CountSheetDetail>(`/count-sheet-details/${id}`, data),
    delete: (id: number) =>
      apiClient.delete<void>(`/count-sheet-details/${id}`),
  },

  // 34. DISCOUNT TABLE
  discounts: {
    list: () => apiClient.get<Discount[]>("/discounts"),
    get: (id: number) => apiClient.get<Discount>(`/discounts/${id}`),
    create: (data: Discount) => apiClient.post<Discount>("/discounts", data),
    update: (id: number, data: Discount) =>
      apiClient.put<Discount>(`/discounts/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/discounts/${id}`),
  },

  // 35. LISTDISCOUNT TABLE
  listDiscounts: {
    list: () => apiClient.get<ListDiscount[]>("/list-discounts"),
    get: (id: number) => apiClient.get<ListDiscount>(`/list-discounts/${id}`),
    create: (data: ListDiscount) =>
      apiClient.post<ListDiscount>("/list-discounts", data),
    update: (id: number, data: ListDiscount) =>
      apiClient.put<ListDiscount>(`/list-discounts/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/list-discounts/${id}`),
  },

  // 36. FEEDBACK TABLE
  feedbacks: {
    list: () => apiClient.get<Feedback[]>("/feedbacks"),
    get: (id: number) => apiClient.get<Feedback>(`/feedbacks/${id}`),
    create: (data: Feedback) => apiClient.post<Feedback>("/feedbacks", data),
    update: (id: number, data: Feedback) =>
      apiClient.put<Feedback>(`/feedbacks/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/feedbacks/${id}`),
  },
};
