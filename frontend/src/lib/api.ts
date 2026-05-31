import { apiClient } from "./api-client";
import type {
  Customertype,
  Customer,
  Category,
  Product,
  Producttype,
  Combo,
  Combodetail,
  Warehouse,
  Employee,
  Role,
  Employeerole,
  Shipcompany,
  Invoice,
  Order,
  OrderDetail,
  Invoicedetail,
  PaymentMethod,
  Payment,
  ReturnPolicy,
  OrderReturn,
  ReturnDetail,
  Detailinventory,
  Notification,
  RequestForm,
  RequestDetail,
  Transferticket,
  Transferticketdetail,
  Importreceipt,
  Importreceiptdetail,
  Exportreceipt,
  Exportreceiptdetail,
  Countsheet,
  Countsheetdetail,
  Discount,
  Listdiscount,
  Feedback,
} from "./types";

export const api = {
  // Auth API
  auth: {
    signin: (credentials) =>
      apiClient.post("/auth/signin", credentials),
    signout: () =>
      apiClient.post("/auth/signout", {}),
  },

  // 1. Customertype TABLE
  customerTypes: {
    list: () => apiClient.get<Customertype[]>("/customer-types"),
    get: (id: number) => apiClient.get<Customertype>(`/customer-types/${id}`),
    create: (data: Omit<Customertype, "id">) =>
      apiClient.post<Customertype>("/customer-types", data),
    update: (id: number, data: Customertype) =>
      apiClient.put<Customertype>(`/customer-types/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/customer-types/${id}`),
  },

  // 2. CUSTOMER TABLE
  customers: {
    list: () => apiClient.get<Customer[]>("/customers"),
    get: (id: number) => apiClient.get<Customer>(`/customers/${id}`),
    create: (data: Omit<Customer, "id">) => apiClient.post<Customer>("/customers", data),
    update: (id: number, data: Customer) =>
      apiClient.put<Customer>(`/customers/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/customers/${id}`),
  },

  // 3. CATEGORY TABLE
  categories: {
    list: () => apiClient.get<Category[]>("/categories"),
    get: (id: number) => apiClient.get<Category>(`/categories/${id}`),
    create: (data: Omit<Category, "id">) => apiClient.post<Category>("/categories", data),
    update: (id: number, data: Category) =>
      apiClient.put<Category>(`/categories/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/categories/${id}`),
  },

  // 4. PRODUCT TABLE
  products: {
    list: () => apiClient.get<Product[]>("/products"),
    get: (id: number) => apiClient.get<Product>(`/products/${id}`),
    create: (data: Omit<Product, "ProductID">) => apiClient.post<Product>("/products", data),
    update: (id: number, data: Product) =>
      apiClient.put<Product>(`/products/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/products/${id}`),
  },

  // 5. Producttype TABLE
  productTypes: {
    list: () => apiClient.get<Producttype[]>("/product-types"),
    get: (id: number) => apiClient.get<Producttype>(`/product-types/${id}`),
    create: (data: Omit<Producttype, "id">) =>
      apiClient.post<Producttype>("/product-types", data),
    update: (id: number, data: Producttype) =>
      apiClient.put<Producttype>(`/product-types/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/product-types/${id}`),
  },

  // 6. COMBO TABLE
  combos: {
    list: () => apiClient.get<Combo[]>("/combos"),
    get: (id: number) => apiClient.get<Combo>(`/combos/${id}`),
    create: (data: Omit<Combo, "id">) => apiClient.post<Combo>("/combos", data),
    update: (id: number, data: Combo) =>
      apiClient.put<Combo>(`/combos/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/combos/${id}`),
  },

  // 7. Combodetail TABLE
  comboDetails: {
    list: () => apiClient.get<Combodetail[]>("/combo-details"),
    get: (comboId: number, productId: number) =>
      apiClient.get<Combodetail>(`/combo-details/${comboId}/${productId}`),
    create: (data: Combodetail) =>
      apiClient.post<Combodetail>("/combo-details", data),
    update: (comboId: number, productId: number, data: Combodetail) =>
      apiClient.put<Combodetail>(`/combo-details/${comboId}/${productId}`, data),
    delete: (comboId: number, productId: number) =>
      apiClient.delete<void>(`/combo-details/${comboId}/${productId}`),
  },

  // 8. WAREHOUSE TABLE
  warehouses: {
    list: () => apiClient.get<Warehouse[]>("/warehouses"),
    get: (id: number) => apiClient.get<Warehouse>(`/warehouses/${id}`),
    create: (data: Omit<Warehouse, "WareHouseID">) => apiClient.post<Warehouse>("/warehouses", data),
    update: (id: number, data: Warehouse) =>
      apiClient.put<Warehouse>(`/warehouses/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/warehouses/${id}`),
  },

  // 9. EMPLOYEE TABLE
  employees: {
    list: () => apiClient.get<Employee[]>("/employees"),
    get: (id: number) => apiClient.get<Employee>(`/employees/${id}`),
    create: (data: Omit<Employee, "EmployeeID">) => apiClient.post<Employee>("/employees", data),
    update: (id: number, data: Employee) =>
      apiClient.put<Employee>(`/employees/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/employees/${id}`),
  },

  // 10. ROLE TABLE
  roles: {
    list: () => apiClient.get<Role[]>("/roles"),
    get: (id: number) => apiClient.get<Role>(`/roles/${id}`),
    create: (data: Omit<Role, "RoleID">) => apiClient.post<Role>("/roles", data),
    update: (id: number, data: Role) =>
      apiClient.put<Role>(`/roles/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/roles/${id}`),
  },

  // 11. Employeerole TABLE
  employeeRoles: {
    list: () => apiClient.get<Employeerole[]>("/employee-roles"),
    get: (employeeId: number, roleId: number) => apiClient.get<Employeerole>(`/employee-roles/${employeeId}/${roleId}`),
    create: (data: Employeerole) =>
      apiClient.post<Employeerole>("/employee-roles", data),
    update: (employeeId: number, roleId: number, data: Employeerole) =>
      apiClient.put<Employeerole>(`/employee-roles/${employeeId}/${roleId}`, data),
    delete: (employeeId: number, roleId: number) => apiClient.delete<void>(`/employee-roles/${employeeId}/${roleId}`),
  },

  // 12. Shipcompany TABLE
  shipCompanies: {
    list: () => apiClient.get<Shipcompany[]>("/ship-companies"),
    get: (id: number) => apiClient.get<Shipcompany>(`/ship-companies/${id}`),
    create: (data: Omit<Shipcompany, "ShipCompanyID">) =>
      apiClient.post<Shipcompany>("/ship-companies", data),
    update: (id: number, data: Shipcompany) =>
      apiClient.put<Shipcompany>(`/ship-companies/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/ship-companies/${id}`),
  },

  // 13. INVOICE TABLE
  invoices: {
    list: () => apiClient.get<Invoice[]>("/invoices"),
    get: (id: number) => apiClient.get<Invoice>(`/invoices/${id}`),
    create: (data: Omit<Invoice, "InvoiceID">) => apiClient.post<Invoice>("/invoices", data),
    update: (id: number, data: Invoice) =>
      apiClient.put<Invoice>(`/invoices/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/invoices/${id}`),
    generatePdf: (invoiceId: number, isVat: boolean, vatInfo?: any) => 
      apiClient.downloadPost("/invoices/generate-pdf", { invoiceId, isVat, vatInfo }, `invoice_${invoiceId}.pdf`),
    getPending: () => apiClient.get<Invoice[]>("/invoices/pending"),
  },

  // 14. ORDER TABLE
  orders: {
    list: () => apiClient.get<Order[]>("/orders"),
    get: (id: number) => apiClient.get<Order>(`/orders/${id}`),
    create: (data: Omit<Order, "id">) => apiClient.post<Order>("/orders", data),
    update: (id: number, data: Order) =>
      apiClient.put<Order>(`/orders/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/orders/${id}`),
  },

  // 15. ORDERDETAIL TABLE
  orderDetails: {
    list: () => apiClient.get<OrderDetail[]>("/order-details"),
    get: (id: number) => apiClient.get<OrderDetail>(`/order-details/${id}`),
    create: (data: Omit<OrderDetail, "OrderDetailID">) =>
      apiClient.post<OrderDetail>("/order-details", data),
    update: (id: number, data: OrderDetail) =>
      apiClient.put<OrderDetail>(`/order-details/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/order-details/${id}`),
  },

  // 16. Invoicedetail TABLE
  invoiceDetails: {
    list: () => apiClient.get<Invoicedetail[]>("/invoice-details"),
    get: (id: number) => apiClient.get<Invoicedetail>(`/invoice-details/${id}`),
    create: (data: Omit<Invoicedetail, "InvoiceDetailID">) =>
      apiClient.post<Invoicedetail>("/invoice-details", data),
    update: (id: number, data: Invoicedetail) =>
      apiClient.put<Invoicedetail>(`/invoice-details/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/invoice-details/${id}`),
  },

  // 17. PAYMENTMETHOD TABLE
  paymentMethods: {
    list: () => apiClient.get<PaymentMethod[]>("/payment-methods"),
    get: (id: number) => apiClient.get<PaymentMethod>(`/payment-methods/${id}`),
    create: (data: Omit<PaymentMethod, "PaymentMethodID">) =>
      apiClient.post<PaymentMethod>("/payment-methods", data),
    update: (id: number, data: PaymentMethod) =>
      apiClient.put<PaymentMethod>(`/payment-methods/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/payment-methods/${id}`),
  },

  // 18. PAYMENT TABLE
  payments: {
    list: () => apiClient.get<Payment[]>("/payments"),
    get: (id: number) => apiClient.get<Payment>(`/payments/${id}`),
    create: (data: Omit<Payment, "PaymentID">) => apiClient.post<Payment>("/payments", data),
    update: (id: number, data: Payment) =>
      apiClient.put<Payment>(`/payments/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/payments/${id}`),
    record: (data: any) => apiClient.post("/payments/record", data),
  },

  // 19. RETURNPOLICY TABLE
  returnPolicies: {
    list: () => apiClient.get<ReturnPolicy[]>("/return-policies"),
    get: (id: number) => apiClient.get<ReturnPolicy>(`/return-policies/${id}`),
    create: (data: Omit<ReturnPolicy, "PolicyID">) =>
      apiClient.post<ReturnPolicy>("/return-policies", data),
    update: (id: number, data: ReturnPolicy) =>
      apiClient.put<ReturnPolicy>(`/return-policies/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/return-policies/${id}`),
  },

  // 20. ORDERRETURN TABLE
  orderReturns: {
    list: () => apiClient.get<OrderReturn[]>("/order-returns"),
    get: (id: number) => apiClient.get<OrderReturn>(`/order-returns/${id}`),
    create: (data: Omit<OrderReturn, "id">) =>
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

  // 22. Detailinventory TABLE
  detailInventories: {
    list: () => apiClient.get<Detailinventory[]>("/detail-inventories"),
    get: (id: number) =>
      apiClient.get<Detailinventory>(`/detail-inventories/${id}`),
    create: (data: Detailinventory) =>
      apiClient.post<Detailinventory>("/detail-inventories", data),
    update: (id: number, data: Detailinventory) =>
      apiClient.put<Detailinventory>(`/detail-inventories/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/detail-inventories/${id}`),
  },

  // 23. NOTIFICATION TABLE
  notifications: {
    list: () => apiClient.get<Notification[]>("/notifications"),
    get: (id: number) => apiClient.get<Notification>(`/notifications/${id}`),
    create: (data: Omit<Notification, "NotificationID">) =>
      apiClient.post<Notification>("/notifications", data),
    update: (id: number, data: Notification) =>
      apiClient.put<Notification>(`/notifications/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/notifications/${id}`),
  },

  // 24. REQUESTFORM TABLE
  requestForms: {
    list: () => apiClient.get<RequestForm[]>("/request-forms"),
    get: (id: number) => apiClient.get<RequestForm>(`/request-forms/${id}`),
    create: (data: Omit<RequestForm, "RequestID">) =>
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

  // 26. Transferticket TABLE
  transferTickets: {
    list: () => apiClient.get<Transferticket[]>("/transfer-tickets"),
    get: (id: number) =>
      apiClient.get<Transferticket>(`/transfer-tickets/${id}`),
    create: (data: Omit<Transferticket, "TransferID">) =>
      apiClient.post<Transferticket>("/transfer-tickets", data),
    update: (id: number, data: Transferticket) =>
      apiClient.put<Transferticket>(`/transfer-tickets/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/transfer-tickets/${id}`),
  },

  // 27. Transferticketdetail TABLE
  transferTicketDetails: {
    list: () =>
      apiClient.get<Transferticketdetail[]>("/transfer-ticket-details"),
    get: (id: number) =>
      apiClient.get<Transferticketdetail>(`/transfer-ticket-details/${id}`),
    create: (data: Transferticketdetail) =>
      apiClient.post<Transferticketdetail>("/transfer-ticket-details", data),
    update: (id: number, data: Transferticketdetail) =>
      apiClient.put<Transferticketdetail>(
        `/transfer-ticket-details/${id}`,
        data,
      ),
    delete: (id: number) =>
      apiClient.delete<void>(`/transfer-ticket-details/${id}`),
  },

  // 28. Importreceipt TABLE
  importReceipts: {
    list: () => apiClient.get<Importreceipt[]>("/import-receipts"),
    get: (id: number) => apiClient.get<Importreceipt>(`/import-receipts/${id}`),
    create: (data: Omit<Importreceipt, "ImportReceiptID">) =>
      apiClient.post<Importreceipt>("/import-receipts", data),
    update: (id: number, data: Importreceipt) =>
      apiClient.put<Importreceipt>(`/import-receipts/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/import-receipts/${id}`),
  },

  // 29. Importreceiptdetail TABLE
  importReceiptDetails: {
    list: () => apiClient.get<Importreceiptdetail[]>("/import-receipt-details"),
    get: (id: number) =>
      apiClient.get<Importreceiptdetail>(`/import-receipt-details/${id}`),
    create: (data: Importreceiptdetail) =>
      apiClient.post<Importreceiptdetail>("/import-receipt-details", data),
    update: (id: number, data: Importreceiptdetail) =>
      apiClient.put<Importreceiptdetail>(`/import-receipt-details/${id}`, data),
    delete: (id: number) =>
      apiClient.delete<void>(`/import-receipt-details/${id}`),
  },

  // 30. Exportreceipt TABLE
  exportReceipts: {
    list: () => apiClient.get<Exportreceipt[]>("/export-receipts"),
    get: (id: number) => apiClient.get<Exportreceipt>(`/export-receipts/${id}`),
    create: (data: Omit<Exportreceipt, "id">) =>
      apiClient.post<Exportreceipt>("/export-receipts", data),
    update: (id: number, data: Exportreceipt) =>
      apiClient.put<Exportreceipt>(`/export-receipts/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/export-receipts/${id}`),
  },

  // 31. Exportreceiptdetail TABLE
  exportReceiptDetails: {
    list: () => apiClient.get<Exportreceiptdetail[]>("/export-receipt-details"),
    get: (id: number) =>
      apiClient.get<Exportreceiptdetail>(`/export-receipt-details/${id}`),
    create: (data: Exportreceiptdetail) =>
      apiClient.post<Exportreceiptdetail>("/export-receipt-details", data),
    update: (id: number, data: Exportreceiptdetail) =>
      apiClient.put<Exportreceiptdetail>(`/export-receipt-details/${id}`, data),
    delete: (id: number) =>
      apiClient.delete<void>(`/export-receipt-details/${id}`),
  },

  // 32. Countsheet TABLE
  countSheets: {
    list: () => apiClient.get<Countsheet[]>("/count-sheets"),
    get: (id: number) => apiClient.get<Countsheet>(`/count-sheets/${id}`),
    create: (data: Omit<Countsheet, "id">) =>
      apiClient.post<Countsheet>("/count-sheets", data),
    update: (id: number, data: Countsheet) =>
      apiClient.put<Countsheet>(`/count-sheets/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/count-sheets/${id}`),
  },

  // 33. Countsheetdetail TABLE
  countSheetDetails: {
    list: () => apiClient.get<Countsheetdetail[]>("/count-sheet-details"),
    get: (id: number) =>
      apiClient.get<Countsheetdetail>(`/count-sheet-details/${id}`),
    create: (data: Countsheetdetail) =>
      apiClient.post<Countsheetdetail>("/count-sheet-details", data),
    update: (id: number, data: Countsheetdetail) =>
      apiClient.put<Countsheetdetail>(`/count-sheet-details/${id}`, data),
    delete: (id: number) =>
      apiClient.delete<void>(`/count-sheet-details/${id}`),
  },

  // 34. DISCOUNT TABLE
  discounts: {
    list: () => apiClient.get<Discount[]>("/discounts"),
    get: (id: number) => apiClient.get<Discount>(`/discounts/${id}`),
    create: (data: Omit<Discount, "id">) => apiClient.post<Discount>("/discounts", data),
    update: (id: number, data: Discount) =>
      apiClient.put<Discount>(`/discounts/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/discounts/${id}`),
  },

  // 35. Listdiscount TABLE
  listDiscounts: {
    list: () => apiClient.get<Listdiscount[]>("/list-discounts"),
    get: (id: number) => apiClient.get<Listdiscount>(`/list-discounts/${id}`),
    create: (data: Listdiscount) =>
      apiClient.post<Listdiscount>("/list-discounts", data),
    update: (id: number, data: Listdiscount) =>
      apiClient.put<Listdiscount>(`/list-discounts/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/list-discounts/${id}`),
  },

  // 36. FEEDBACK TABLE
  feedbacks: {
    list: () => apiClient.get<Feedback[]>("/feedbacks"),
    get: (id: number) => apiClient.get<Feedback>(`/feedbacks/${id}`),
    create: (data: Omit<Feedback, "FeedbackID">) => apiClient.post<Feedback>("/feedbacks", data),
    update: (id: number, data: Feedback) =>
      apiClient.put<Feedback>(`/feedbacks/${id}`, data),
    delete: (id: number) => apiClient.delete<void>(`/feedbacks/${id}`),
  },

  uploads: {
    uploadImage: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiClient.upload<{ url: string }>("/uploads", formData);
    },
  },

  reports: {
    downloadRevenuePdf: (startDate: string, endDate: string) =>
      apiClient.download(`/reports/revenue/pdf?startDate=${startDate}&endDate=${endDate}`, `revenue_report_${startDate}_${endDate}.pdf`),
    downloadInventoryPdf: (warehouseId?: string, productId?: string) => {
      let url = "/reports/inventory/pdf";
      const params = [];
      if (warehouseId && warehouseId !== "ALL") params.push(`warehouseId=${warehouseId}`);
      if (productId && productId !== "ALL") params.push(`productId=${productId}`);
      if (params.length > 0) url += "?" + params.join("&");
      return apiClient.download(url, "inventory_report.pdf");
    },
  },

  shipping: {
    getShippingReadyOrders: () => apiClient.get<Order[]>("/orders/shipping-ready"),
    assignShip: (orderId: number, shipcompanyid: number) =>
      apiClient.post<Order>(`/orders/${orderId}/assign-ship`, { shipcompanyid }),
    cancelShip: (orderId: number) =>
      apiClient.post<Order>(`/orders/${orderId}/cancel-ship`, {}),
  },

  sales: {
    searchOrders: (keyword: string) => apiClient.get<Order[]>(`/sales/orders/search?keyword=${encodeURIComponent(keyword)}`),
    exchange: (data: { orderId: number, oldProductId: number, newProductId: number, quantity: number, employeeId: number }) => 
      apiClient.post("/sales/exchange", data),
    return: (data: { orderId: number, reason: string, employeeId: number, items: { productId: number, quantity: number, condition: string, qcStatus: string, targetWarehouseId: number, actionTaken: string }[] }) => 
      apiClient.post("/sales/return", data),
    getTransferTickets: () => apiClient.get<Transferticket[]>("/sales/transfer-tickets"),
    createTransferTicket: (data: any) => apiClient.post("/sales/transfer-tickets", data),
    confirmTransferReceive: (id: number) => apiClient.put(`/sales/transfer-tickets/${id}/confirm-receive`, {}),
  },
};
