import { GroupedPageLayout, type TabConfig } from "@/components/GroupedPageLayout";
import InvoiceManagementPage from "@/pages/8.1-invoice-management-page/InvoiceManagementPage";
import OrderManagementPage from "@/pages/8.2-order-management-page/OrderManagementPage";
import { ShoppingBag, Receipt } from "lucide-react";

export default function MultiChannelOrderManagement() {
  const tabs: TabConfig[] = [
    {
      id: "orders-offline",
      label: "Đơn hàng tại quầy",
      icon: <ShoppingBag className="h-4 w-4" />,
      component: () => <OrderManagementPage saleChannelCode={0} />,
      roles: [1, 2, 3],
    },
    {
      id: "orders-online",
      label: "Đơn hàng trực tuyến",
      icon: <ShoppingBag className="h-4 w-4" />,
      component: () => <OrderManagementPage saleChannelCode={1} />,
      roles: [1, 2, 3],
    },
    {
      id: "invoices",
      label: "Hóa đơn",
      icon: <Receipt className="h-4 w-4" />,
      component: InvoiceManagementPage,
      roles: [3, 4],
    },
  ];

  return (
    <GroupedPageLayout
      title="Quản lý đơn hàng đa kênh"
      tabs={tabs}
    />
  );
}
