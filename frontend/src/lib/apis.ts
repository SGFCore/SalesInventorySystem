import { apiClient } from "./api-client";
import type {
  Category, ProductType, Product, Combo, ComboDetail,
  Employee, Role, EmployeeRole, ShipCompany,
  Customer, CustomerType, Discount, Feedback,
  Order, OrderDetail, Invoice, InvoiceDetail, PaymentMethod, Payment,
  ReturnPolicy, OrderReturn, ReturnDetail,
  Warehouse, DetailInventory, Notification,
  RequestForm, RequestDetail, TransferTicket, TransferTicketDetail,
  ImportReceipt, ImportReceiptDetail, ExportReceipt, ExportReceiptDetail,
  CountSheet, CountSheetDetail
} from "./types";

export type LoginCredentials = {
  EmployeeID: number;     // Sử dụng Mã nhân viên kiểu Number 
  PasswordHash: string;   // Mật khẩu đã được mã hóa từ bảng EMPLOYEE 
};

export const api = {
  // ================= AUTH & LOGS =================
  auth: {
    login: (credentials: LoginCredentials) => 
      apiClient.post<{ token: string, employee: Employee }>('/auth/login', credentials),
    
    logout: () => apiClient.delete<void>('/auth/logout'),
    getProfile: () => apiClient.get<Employee>('/auth/profile'),
    getLogs: () => apiClient.get<string>('/logs')
  },

  // ================= EMPLOYEES & ROLES (UC04 - UC08) =================
  employees: {
    list: () => apiClient.get<Employee[]>('/employees'), // A8, A11
    get: (id: number) => apiClient.get<Employee>(`/employees/${id}`), // A6, A9
    create: (data: Omit<Employee, 'EmployeeID'>) => apiClient.post<Employee>('/employees', data), // A10
    update: (id: number, data: Partial<Employee>) => apiClient.put<Employee>(`/employees/${id}`, data), // A7, A12
    updateStatus: (id: number, status: number) => apiClient.put<Employee>(`/employees/${id}/status`, { Status: status }), // A13
  },
  roles: {
    list: () => apiClient.get<Role[]>('/roles'), // A14
    assignToEmployee: (data: EmployeeRole) => apiClient.post<void>('/roles/assign', data), // A15
    removeFromEmployee: (employeeId: number, roleId: number) => apiClient.delete<void>(`/roles/remove?employeeId=${employeeId}&roleId=${roleId}`), // A16
  },

  // ================= SHIP COMPANIES (UC09 - UC12) =================
  shipCompanies: {
    list: () => apiClient.get<ShipCompany[]>('/ship-companies'), // A17, A23
    get: (id: number) => apiClient.get<ShipCompany>(`/ship-companies/${id}`), // A18
    create: (data: Omit<ShipCompany, 'ShipCompanyID'>) => apiClient.post<ShipCompany>('/ship-companies', data), // A19
    update: (id: number, data: Partial<ShipCompany>) => apiClient.put<ShipCompany>(`/ship-companies/${id}`, data), // A20, A21
  },

  // ================= CUSTOMERS & TYPES (UC13 - UC15, UC29, UC30) =================
  customers: {
    list: () => apiClient.get<Customer[]>('/customers'), // A24
    get: (id: number) => apiClient.get<Customer>(`/customers/${id}`), // A25
    create: (data: Omit<Customer, 'CustomerID' | 'CreatedDate' | 'TotalAccumulatedSpent'>) => apiClient.post<Customer>('/customers', data), // A26, A84, A92
    update: (id: number, data: Partial<Customer>) => apiClient.put<Customer>(`/customers/${id}`, data), // A27
  },
  customerTypes: {
    list: () => apiClient.get<CustomerType[]>('/customer-types'), // A65, A69, A73
    updateDiscount: (id: number, discount: number) => apiClient.put<CustomerType>(`/customer-types/${id}/discount`, { Discount: discount }), // A67
  },

  // ================= CATEGORIES & PRODUCT TYPES (UC18 - UC24) =================
  categories: {
    list: () => apiClient.get<Category[]>('/categories'), // A33, A41, A47, A51
    get: (id: number) => apiClient.get<Category>(`/categories/${id}`), // A31, A37
    create: (data: Omit<Category, 'CategoryID'>) => apiClient.post<Category>('/categories', data), // A32
    update: (id: number, data: Partial<Category>) => apiClient.put<Category>(`/categories/${id}`, data), // A34
    delete: (id: number) => apiClient.delete<void>(`/categories/${id}`), // A36
  },
  productTypes: {
    list: () => apiClient.get<ProductType[]>('/product-types'), // A40
    getByCategory: (categoryId: number) => apiClient.get<ProductType[]>(`/product-types?categoryId=${categoryId}`), // A35
    get: (id: number) => apiClient.get<ProductType>(`/product-types/${id}`), // A38, A42, A44
    create: (data: Omit<ProductType, 'ProductTypeID'>) => apiClient.post<ProductType>('/product-types', data), // A39
    update: (id: number, data: Partial<ProductType>) => apiClient.put<ProductType>(`/product-types/${id}`, data), // A43
    delete: (id: number) => apiClient.delete<void>(`/product-types/${id}`), // A46
  },

  // ================= PRODUCTS & COMBOS (UC24 - UC28, UC46) =================
  products: {
    list: () => apiClient.get<Product[]>('/products'), // A50, A59
    get: (id: number) => apiClient.get<Product>(`/products/${id}`), // A55, A58, A62
    create: (data: Omit<Product, 'ProductID'>) => apiClient.post<Product>('/products', data), // A49
    update: (id: number, data: Partial<Product>) => apiClient.put<Product>(`/products/${id}`, data), // A54
    updateStatus: (id: number, status: number) => apiClient.put<Product>(`/products/${id}/status`, { ProductStatus: status }), // A57
  },
  combos: {
    create: (data: Omit<Combo, 'ComboID'> & { details: Omit<ComboDetail, 'ComboID'>[] }) => apiClient.post<Combo>('/combos', data), // A63, A64
  },

  // ================= DISCOUNTS (UC29 - UC33) =================
  discounts: {
    list: () => apiClient.get<Discount[]>('/discounts'), // A72
    get: (id: number) => apiClient.get<Discount>(`/discounts/${id}`), // A70, A75
    create: (data: Omit<Discount, 'DiscountID'>) => apiClient.post<Discount>('/discounts', data), // A66, A71
    update: (id: number, data: Partial<Discount>) => apiClient.put<Discount>(`/discounts/${id}`, data), // A74, A77, A80, A82
  },

  // ================= ORDERS & INVOICES & PAYMENTS (UC34 - UC40) =================
  orders: {
    list: () => apiClient.get<Order[]>('/orders'), // A98, A108, A115
    get: (id: number) => apiClient.get<Order>(`/orders/${id}`), // A30, A99
    create: (data: Omit<Order, 'OrderID'> & { details: Omit<OrderDetail, 'OrderDetailID' | 'OrderID'>[] }) => apiClient.post<Order>('/orders', data), // A95, A96, A105
    update: (id: number, data: Partial<Order>) => apiClient.put<Order>(`/orders/${id}`, data), // A103
    updateStatus: (id: number, status: number) => apiClient.put<Order>(`/orders/${id}/status`, { OrderStatus: status }), // A160, A162, A164, A167
    deleteDetail: (detailId: number) => apiClient.delete<void>(`/orders/details/${detailId}`), // A106
  },
  invoices: {
    list: () => apiClient.get<Invoice[]>('/invoices'), // A126
    create: (data: Omit<Invoice, 'InvoiceID'> & { details: Omit<InvoiceDetail, 'InvoiceDetailID' | 'InvoiceID'>[] }) => apiClient.post<Invoice>('/invoices', data), // A88, A89, A118, A119
    updateStatus: (id: number, status: string) => apiClient.put<Invoice>(`/invoices/${id}/status`, { Status: status }), // A123
  },
  payments: {
    getMethods: () => apiClient.get<PaymentMethod[]>('/payment-methods'), // A121
    create: (data: Omit<Payment, 'PaymentID'>) => apiClient.post<Payment>('/payments', data), // A122
  },

  // ================= RETURNS & POLICIES (UC41 - UC45) =================
  returns: {
    policies: {
      list: () => apiClient.get<ReturnPolicy[]>('/return-policies'), // A127, A130, A133
      create: (data: Omit<ReturnPolicy, 'PolicyID'>) => apiClient.post<ReturnPolicy>('/return-policies', data), // A134
      update: (id: number, data: Partial<ReturnPolicy>) => apiClient.put<ReturnPolicy>(`/return-policies/${id}`, data), // A135
    },
    orders: {
      list: () => apiClient.get<OrderReturn[]>('/order-returns'), // A124
      create: (data: Omit<OrderReturn, 'ReturnID'> & { details: Omit<ReturnDetail, 'ReturnID'>[] }) => apiClient.post<OrderReturn>('/order-returns', data), // A128, A131, A153
      updateStatus: (id: number, status: string) => apiClient.put<OrderReturn>(`/order-returns/${id}/status`, { Status: status }), // A125
    }
  },

  // ================= INVENTORY & WAREHOUSE OPERATIONS (UC48 - UC66) =================
  inventory: {
    getDetail: (warehouseId: number, productId: number) => apiClient.get<DetailInventory>(`/inventory/${warehouseId}/products/${productId}`), // A56, A61, A86, A102
    updateStock: (warehouseId: number, productId: number, data: Partial<DetailInventory>) => apiClient.put<DetailInventory>(`/inventory/${warehouseId}/products/${productId}`, data), // A90, A97, A107, A129, A132, A148, A151, A154, A157, A173, A176
    updateThresholds: (warehouseId: number, productId: number, data: { MinStock: number, MaxStock: number, IsAlertEnabled: number }) => apiClient.put<DetailInventory>(`/inventory/${warehouseId}/products/${productId}/thresholds`, data), // A137
  },
  warehouses: {
    list: () => apiClient.get<Warehouse[]>('/warehouses'), // A168, A174
  },
  // UC48, UC49, UC50 - Yêu cầu nhập/xuất
  requests: {
    list: () => apiClient.get<RequestForm[]>('/requests'), // A140, A142, A144
    create: (data: Omit<RequestForm, 'RequestID'> & { details: Omit<RequestDetail, 'RequestID'>[] }) => apiClient.post<RequestForm>('/requests', data), // A141
    updateStatus: (id: number, data: { Status: string, ApproverID?: number, RejectReason?: string }) => apiClient.put<RequestForm>(`/requests/${id}/status`, data), // A143
  },
  // UC50, UC51 - Nhập kho
  imports: {
    list: () => apiClient.get<ImportReceipt[]>('/imports'), // A146
    create: (data: Omit<ImportReceipt, 'ImportReceiptID'> & { details: Omit<ImportReceiptDetail, 'ImportReceiptID'>[] }) => apiClient.post<ImportReceipt>('/imports', data), // A145
  },
  // UC54, UC64, UC65 - Xuất kho
  exports: {
    list: () => apiClient.get<ExportReceipt[]>('/exports'), // A177
    create: (data: Omit<ExportReceipt, 'ExportReceiptID'> & { details: Omit<ExportReceiptDetail, 'ExportReceiptID'>[] }) => apiClient.post<ExportReceipt>('/exports', data), // A155, A175
  },
  // UC52 - Chuyển kho
  transfers: {
    create: (data: Omit<TransferTicket, 'TransferID'> & { details: Omit<TransferTicketDetail, 'TransferID'>[] }) => apiClient.post<TransferTicket>('/transfers', data), // A149
  },
  // UC61, UC62, UC63, UC66 - Kiểm kê kho
  countSheets: {
    list: () => apiClient.get<CountSheet[]>('/count-sheets'), // A170, A172, A178
    create: (data: Omit<CountSheet, 'CountSheetId'> & { details: Omit<CountSheetDetail, 'CountSheetld'>[] }) => apiClient.post<CountSheet>('/count-sheets', data), // A169
    updateStatus: (id: number, data: { Status: number, details: CountSheetDetail[] }) => apiClient.put<CountSheet>(`/count-sheets/${id}`, data), // A171, A173
  },

  // ================= NOTIFICATIONS & FEEDBACKS =================
  notifications: {
    list: () => apiClient.get<Notification[]>('/notifications'), // A138
    create: (data: Omit<Notification, 'NotificationID'>) => apiClient.post<Notification>('/notifications', data), // A139, A147
  },
  feedbacks: {
    create: (data: Omit<Feedback, 'FeedbackID'>) => apiClient.post<Feedback>('/feedbacks', data), // A29 (UC16)
  },

  // ================= REPORTS (UC67, UC68, UC69) =================
  reports: {
    getOrders: (params?: Record<string, string>) => apiClient.get<any>('/reports/orders', params), // A179
    getFinance: (params?: Record<string, string>) => apiClient.get<any>('/reports/finance', params), // A180
    getInventory: (params?: Record<string, string>) => apiClient.get<any>('/reports/inventory', params), // A181
  }
};