import { GroupedPageLayout, type TabConfig } from "@/components/GroupedPageLayout";
import RevenueReportPage from "@/pages/16-report-management/RevenueReportPage";
import InventoryReportPage from "@/pages/16-report-management/InventoryReportPage";
import AuditLogPage from "@/pages/16-report-management/AuditLogPage";
import { BarChart3, Box, History } from "lucide-react";

export default function ReportManagementGroup() {
  const tabs: TabConfig[] = [
    {
      id: "revenue",
      label: "Báo cáo doanh thu",
      icon: <BarChart3 className="h-4 w-4" />,
      component: RevenueReportPage,
      roles: [1],
    },
    {
      id: "inventory",
      label: "Báo cáo tồn kho",
      icon: <Box className="h-4 w-4" />,
      component: InventoryReportPage,
      roles: [1],
    },
    {
      id: "audit-log",
      label: "Lịch sử thao tác",
      icon: <History className="h-4 w-4" />,
      component: AuditLogPage,
      roles: [1],
    },
  ];

  return (
    <GroupedPageLayout
      title="Quản lý Báo cáo và Thống kê"
      tabs={tabs}
    />
  );
}
