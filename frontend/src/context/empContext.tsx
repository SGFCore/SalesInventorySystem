import type { Employee, Role } from "@/lib/types";
import { createContext, useContext, useState, type ReactNode } from "react";

interface EmpContextType {
  emp: Employee;
  setEmp: (emp: Employee) => void;
  roles: Role[];
  setRoles: (roles: Role[]) => void;
  hasRole: (roleId: number) => boolean;
}

const EmpContext = createContext<EmpContextType | undefined>(undefined);

export const EmpProvider = ({ children }: { children: ReactNode }) => {
  const [emp, setEmp] = useState<Employee>({
    EmployeeID: 1,
    Fullname: "Nguyễn Giám Đốc",
    Email: "giamdoc.nguyen@sgf.vn",
    Phone: "0988111222",
    PasswordHash: "hashed_admin",
    Status: 1,
  });

  const [roles, setRoles] = useState<Role[]>([
    {
      RoleID: 0,
      RoleName: "Admin",
    },
    {
      RoleID: 1,
      RoleName: "Kế toán",
    },
    {
      RoleID: 2,
      RoleName: "Quản lý",
    },
    {
      RoleID: 3,
      RoleName: "Nhân viên bán hàng",
    },
    {
      RoleID: 4,
      RoleName: "Kế toán",
    },
  ]);

  const hasRole = (roleId: number): boolean => {
    return roles.some((role) => role.RoleID === roleId);
  };

  return (
    <EmpContext.Provider value={{ emp, setEmp, roles, setRoles, hasRole }}>
      {children}
    </EmpContext.Provider>
  );
};

export const useEmp = () => {
  const context = useContext(EmpContext);
  if (context === undefined) {
    throw new Error("useEmp must be used within EmpProvider");
  }
  return context;
};
