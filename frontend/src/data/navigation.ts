export const navbarData = {
  appName: "SGFMS",
};

export interface SidebarItem {
  directionTo: string;
  label: string;
  availableRole: number[];
}

export const sidebarData: SidebarItem[] = [
  {
    directionTo: "/",
    label: "Trang chủ",
    availableRole: [1, 2, 3, 4],
  },
  {
    directionTo: "/emp-management",
    label: "Quản lý nhân viên",
    availableRole: [1],
  },
  {
    directionTo: "/customer-partner-management",
    label: "Quản lý khách hàng/ đối tác",
    availableRole: [1, 3],
  },
  {
    directionTo: "/product-management",
    label: "Quản lý sản phẩm",
    availableRole: [1, 2, 3, 4],
  },
  {
    directionTo: "/combo-management",
    label: "Quản lý combo",
    availableRole: [1, 3],
  },
  {
    directionTo: "/multichannel-order-management",
    label: "Quản lý đơn hàng đa kênh",
    availableRole: [1, 2, 3],
  },
  {
    directionTo: "/policy-management",
    label: "Quản lý chính sách",
    availableRole: [1],
  },
  {
    directionTo: "/warehouse-management",
    label: "Quản lý kho",
    availableRole: [1, 2],
  },
  {
    directionTo: "/circulating-slips-management",
    label: "Quản lý các phiếu lưu hành",
    availableRole: [1, 2, 3],
  },
  {
    directionTo: "/order-processing",
    label: "Xử lý đơn hàng",
    availableRole: [1, 2],
  },
  {
    directionTo: "/shipping-management",
    label: "Quản lý giao vận",
    availableRole: [1, 2, 3],
  },
  {
    directionTo: "/accounting-management",
    label: "Xử lý hóa đơn và thanh toán",
    availableRole: [1, 4],
  },
  {
    directionTo: "/report-management",
    label: "Quản lý Báo cáo và Thống kê",
    availableRole: [1],
  },
];
