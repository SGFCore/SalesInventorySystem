import { GroupedPageLayout, type TabConfig } from "@/components/GroupedPageLayout";
import CompManagementPage from "@/pages/3-comp-management/CompManagementPage";
import CustomerManagementPage from "@/pages/4-customer-management-page/CustomerManagementPage";
import CustomerTypeManagementPage from "@/pages/7.1-customertype-management-page/CustomerTypeManagementPage";
import { Handshake, Users, UserCheck } from "lucide-react";

export default function CustomerPartnerManagement() {
  const tabs: TabConfig[] = [
    {
      id: "partners",
      label: "Quản lý đối tác",
      icon: <Handshake className="h-4 w-4" />,
      component: CompManagementPage,
      roles: [1, 3],
    },
    {
      id: "customers",
      label: "Quản lý khách hàng",
      icon: <Users className="h-4 w-4" />,
      component: CustomerManagementPage,
      roles: [3],
    },
    {
      id: "customer-types",
      label: "Quản lý nhóm khách hàng",
      icon: <UserCheck className="h-4 w-4" />,
      component: CustomerTypeManagementPage,
      roles: [1],
    },
  ];

  return (
    <GroupedPageLayout
      title="Quản lý khách hàng / Đối tác"
      tabs={tabs}
    />
  );
}
