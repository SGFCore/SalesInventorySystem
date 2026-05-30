import { GroupedPageLayout, type TabConfig } from "@/components/GroupedPageLayout";
import InvoiceSearchPage from "@/pages/19-accounting-management/InvoiceSearchPage";
import PaymentRecordingPage from "@/pages/19-accounting-management/PaymentRecordingPage";
import OrderReturnManagementPage from "@/pages/9-orderreturn-management-page/OrderReturnManagementPage";
import { Search, CreditCard, RefreshCw } from "lucide-react";

export default function AccountingManagementGroup() {
  const tabs: TabConfig[] = [
    {
      id: "search-invoice",
      label: "Tra cứu hóa đơn",
      icon: <Search className="h-4 w-4" />,
      component: InvoiceSearchPage,
      roles: [1, 3, 4],
    },
    {
      id: "record-payment",
      label: "Ghi nhận thanh toán",
      icon: <CreditCard className="h-4 w-4" />,
      component: PaymentRecordingPage,
      roles: [1, 4],
    },
    {
      id: "returns",
      label: "Hoàn tiền",
      icon: <RefreshCw className="h-4 w-4" />,
      component: OrderReturnManagementPage,
      roles: [1, 4],
    },
  ];

  return (
    <GroupedPageLayout
      title="Xử lý hóa đơn và thanh toán"
      tabs={tabs}
    />
  );
}
