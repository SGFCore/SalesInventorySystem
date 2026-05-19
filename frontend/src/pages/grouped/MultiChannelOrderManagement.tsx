import { GroupedPageLayout, type TabConfig } from "@/components/GroupedPageLayout";
import InvoiceManagementPage from "@/pages/8.1-invoice-management-page/InvoiceManagementPage";
import OrderManagementPage from "@/pages/8.2-order-management-page/OrderManagementPage";
import { ShoppingBag, Receipt } from "lucide-react";

export default function MultiChannelOrderManagement() {
  const tabs: TabConfig[] = [
    {
      id: "orders",
      label: "Quản lý đơn hàng",
      icon: <ShoppingBag className="h-4 w-4" />,
      component: OrderManagementPage,
      roles: [1, 2, 3],
    },
    {
      id: "invoices",
      label: "Quản lý hóa đơn",
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
