import { GroupedPageLayout, type TabConfig } from "@/components/GroupedPageLayout";
import RequestManagementPage from "@/pages/11.2-request-management-page/RequestManagementPage";
import ImportReceiptManagementPage from "@/pages/12.1-importreceipt-management-page/ImportReceiptManagementPage";
import CountsheetManagementPage from "@/pages/15-countsheet-management-page/CountsheetManagementPage";
import TransferTicketManagementPage from "@/pages/18-transfer-ticket-management/TransferTicketManagementPage";
import { FilePlus, FileInput, ClipboardCheck, ArrowLeftRight } from "lucide-react";

export default function CirculatingSlipsManagement() {
  const tabs: TabConfig[] = [
    {
      id: "replenishment-requests",
      label: "Đề xuất bổ sung hàng",
      icon: <FilePlus className="h-4 w-4" />,
      component: RequestManagementPage,
      roles: [1, 2],
    },
    {
      id: "import-receipts",
      label: "Phiếu nhập kho",
      icon: <FileInput className="h-4 w-4" />,
      component: ImportReceiptManagementPage,
      roles: [1, 2],
    },
    {
      id: "count-sheets",
      label: "Phiếu kiểm kê",
      icon: <ClipboardCheck className="h-4 w-4" />,
      component: CountsheetManagementPage,
      roles: [1, 2],
    },
    {
      id: "transfer-tickets",
      label: "Phiếu luân chuyển nội bộ",
      icon: <ArrowLeftRight className="h-4 w-4" />,
      component: TransferTicketManagementPage,
      roles: [1, 2, 3],
    },
  ];

  return (
    <GroupedPageLayout
      title="Quản lý các phiếu lưu hành"
      tabs={tabs}
    />
  );
}
