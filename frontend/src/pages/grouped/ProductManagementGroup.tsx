import { GroupedPageLayout, type TabConfig } from "@/components/GroupedPageLayout";
import CatManagementPage from "@/pages/5.1-category-management-page/CatManagementPage";
import ProductTypeManagementPage from "@/pages/5.2-producttype-management-page/ProductTypeManagementPage";
import ProductManagementPage from "@/pages/6.1-product-management/ProductManagementPage";
import { Package, FolderTree, Layers } from "lucide-react";

export default function ProductManagementGroup() {
  const tabs: TabConfig[] = [
    {
      id: "products",
      label: "Quản lý sản phẩm",
      icon: <Package className="h-4 w-4" />,
      component: ProductManagementPage,
      roles: [1, 2, 3, 4],
    },
    {
      id: "categories",
      label: "Quản lý danh mục sản phẩm",
      icon: <FolderTree className="h-4 w-4" />,
      component: CatManagementPage,
      roles: [1],
    },
    {
      id: "product-types",
      label: "Quản lý loại sản phẩm",
      icon: <Layers className="h-4 w-4" />,
      component: ProductTypeManagementPage,
      roles: [1],
    },
  ];

  return (
    <GroupedPageLayout
      title="Quản lý sản phẩm"
      tabs={tabs}
    />
  );
}
