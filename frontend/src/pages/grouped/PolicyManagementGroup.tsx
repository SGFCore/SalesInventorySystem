import { GroupedPageLayout, type TabConfig } from "@/components/GroupedPageLayout";
import DiscountManagementPage from "@/pages/7.2-discount-management-page/DiscountManagementPage";
import OrderReturnManagementPage from "@/pages/9-orderreturn-management-page/OrderReturnManagementPage";
import PolicyManagementPage from "@/pages/10-policy-management-page/PolicyManagementPage";
import { Sparkles, RefreshCw, FileText } from "lucide-react";

export default function PolicyManagementGroup() {
  const tabs: TabConfig[] = [
    {
      id: "promotions",
      label: "Quản lý khuyến mãi",
      icon: <Sparkles className="h-4 w-4" />,
      component: DiscountManagementPage,
      roles: [1],
    },
    {
      id: "returns",
      label: "Quản lý hoàn tiền",
      icon: <RefreshCw className="h-4 w-4" />,
      component: OrderReturnManagementPage,
      roles: [4],
    },
    {
      id: "policies",
      label: "Quản lý chính sách đổi trả",
      icon: <FileText className="h-4 w-4" />,
      component: PolicyManagementPage,
      roles: [1],
    },
  ];

  return (
    <GroupedPageLayout
      title="Quản lý chính sách"
      tabs={tabs}
    />
  );
}
