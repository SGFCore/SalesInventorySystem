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
    availableRole: [1],
  },
  {
    directionTo: "/emp-management",
    label: "Quản lý nhân viên",
    availableRole: [1],
  },
  {
    directionTo: "/comp-management",
    label: "Quản lý đối tác",
    availableRole: [1, 3],
  },
  {
    directionTo: "/customer-management",
    label: "Quản lý khách hàng",
    availableRole: [3],
  },
  {
    directionTo: "/customertype-management",
    label: "Quản lý nhóm khách hàng",
    availableRole: [1],
  },
  {
    directionTo: "/cat-management",
    label: "Quản lý danh mục sản phẩm",
    availableRole: [1],
  },
  {
    directionTo: "/producttype-management",
    label: "Quản lý loại sản phẩm",
    availableRole: [1],
  },
  {
    directionTo: "/product-management",
    label: "Quản lý sản phẩm",
    availableRole: [1, 2, 3, 4],
  },
  {
    directionTo: "/combo-management",
    label: "Quản lý gói sản phẩm",
    availableRole: [1],
  },
  {
    directionTo: "/discount-management",
    label: "Quản lý khuyến mãi",
    availableRole: [1],
  },
  {
    directionTo: "/invoice-management",
    label: "Quản lý hóa đơn",
    availableRole: [3, 4],
  },
  {
    directionTo: "/order-management",
    label: "Quản lý đơn hàng",
    availableRole: [1, 2, 3],
  },
  {
    directionTo: "/orderreturn-management",
    label: "Quản lý hoàn tiền",
    availableRole: [4],
  },
  {
    directionTo: "/policy-management",
    label: "Quản lý chính sách đổi trả",
    availableRole: [1],
  },
  {
    directionTo: "/warehouse-management",
    label: "Quản lý kho",
    availableRole: [1, 2],
  },
  {
    directionTo: "/request-management",
    label: "Đề xuất bổ sung hàng",
    availableRole: [1, 2],
  },
  {
    directionTo: "/importreceipt-management",
    label: "Phiếu nhập kho",
    availableRole: [1, 2],
  },
  {
    directionTo: "/countsheet-management",
    label: "Phiếu kiểm kê",
    availableRole: [1, 2],
  },
];
