import { GroupedPageLayout, type TabConfig } from "@/components/GroupedPageLayout";
import InvoiceManagementPage from "@/pages/8.1-invoice-management-page/InvoiceManagementPage";
import OrderManagementPage from "@/pages/8.2-order-management-page/OrderManagementPage";
import ReturnExchangeManagementPage from "@/pages/9-orderreturn-management-page/ReturnExchangeManagementPage";
import { ShoppingBag, Receipt, RefreshCcw } from "lucide-react";

export default function MultiChannelOrderManagement() {
  const tabs: TabConfig[] = [
    {
      id: "orders-offline",
      label: "Hóa đơn tại quầy",
      icon: <ShoppingBag className="h-4 w-4" />,
      component: () => <OrderManagementPage saleChannelCode={0} />,
      roles: [1, 3],
    },
    {
      id: "orders-online",
      label: "Đơn hàng trực tuyến",
      icon: <ShoppingBag className="h-4 w-4" />,
      component: () => <OrderManagementPage saleChannelCode={1} />,
      roles: [1, 2, 3],
    },
    {
      id: "return-exchange",
      label: "Xử lý đổi trả",
      icon: <RefreshCcw className="h-4 w-4" />,
      component: ReturnExchangeManagementPage,
      roles: [1, 3], // Quản lý và nhân viên
    },
    {
      id: "invoices",
      label: "Hóa đơn",
      icon: <Receipt className="h-4 w-4" />,
      component: InvoiceManagementPage,
      roles: [3],
    },
  ];

  return (
    <GroupedPageLayout
      title="Quản lý đơn hàng đa kênh"
      tabs={tabs}
    />
  );
}
