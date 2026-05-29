import { GroupedPageLayout, type TabConfig } from "@/components/GroupedPageLayout";
import ShippingManagementPage from "@/pages/17-shipping-management/ShippingManagementPage";
import { Truck } from "lucide-react";

export default function ShippingManagementGroup() {
  const tabs: TabConfig[] = [
    {
      id: "dispatch",
      label: "Điều phối giao vận",
      icon: <Truck className="h-4 w-4" />,
      component: ShippingManagementPage,
      roles: [1, 2],
    }
  ];

  return (
    <GroupedPageLayout
      title="Quản lý giao vận"
      tabs={tabs}
    />
  );
}
