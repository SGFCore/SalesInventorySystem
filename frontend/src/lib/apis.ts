import { apiClient } from "./api-client";
import type { Employee } from "./types";

export type LoginCredentials = {
  EmployeeID: number; // Sử dụng Mã nhân viên kiểu Number
  PasswordHash: string; // Mật khẩu đã được mã hóa từ bảng EMPLOYEE
};

export const api = {
  // Auth để Bảo làm

  // ================= EMPLOYEES & ROLES (UC04 - UC08) =================
  employees: {
    list: () => apiClient.get<Employee[]>("/employees"),
    get: (id: number) => apiClient.get<Employee>(`/employees/${id}`),
    create: (data: Employee) => apiClient.post<Employee>("/employees", data),
    update: (id: number, data: Employee) =>
      apiClient.put<Employee>(`/employees/${id}`, data),
    delete: (id: number) => apiClient.delete(`employee/${id}`),
  },
};
