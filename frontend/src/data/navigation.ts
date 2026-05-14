export const navbarData = {
  appName: "SGFMS",
};

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  children?: SidebarItem[];
}

export const sidebarData: SidebarItem[] = [
  {
    id: "management",
    label: "Quản lý",
    children: [
      {
        id: "employee-management",
        label: "Quản lý nhân viên",
      },
    ],
  },
  {
    id: "sales",
    label: "Nhân viên bán hàng",
    children: [
      {
        id: "sales-management",
        label: "Quản lý bán hàng",
      },
    ],
  },
];
