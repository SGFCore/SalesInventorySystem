import { useEmp } from "@/context/empContext";
import { api } from "@/lib/api";
import Dashboard from "@/pages/Dashboard";
import {
  Loader2
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LowStockItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
}

interface PendingReqItem {
  id: string;
  title: string;
  creator: string;
  date: string;
  itemsCount: number;
}

export default function Home() {
  const { emp } = useEmp();

  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    productsCount: 0,
    lowStockCount: 0,
    warehousesCount: 0,
    pendingReqsCount: 0,
  });

  const [lowStockProducts, setLowStockProducts] = useState<LowStockItem[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PendingReqItem[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [prodList, whList, invList, reqList, reqDetailsList, empList] = await Promise.all([
          api.products.list(),
          api.warehouses.list(),
          api.detailInventories.list(),
          api.requestForms.list(),
          api.requestDetails.list(),
          api.employees.list(),
        ]);

        // 1. Tổng số sản phẩm
        const totalProds = prodList.length;

        // 2. Chi nhánh kho hoạt động
        const activeWH = whList.filter((w) => w.Status === 1).length;

        // 3. Sản phẩm sắp hết hàng (CurrentQuantity < MinStock)
        const lowStockItems: LowStockItem[] = [];
        invList.forEach((inv) => {
          if (inv.CurrentQuantity < inv.MinStock) {
            const prod = prodList.find((p) => p.ProductID === inv.ProductID);
            if (prod) {
              const name = prod.ProductName;
              // Tránh trùng lặp sản phẩm nếu nằm ở nhiều kho
              if (!lowStockItems.some((item) => item.id === `SP-${prod.ProductID}`)) {
                lowStockItems.push({
                  id: `SP-${prod.ProductID}`,
                  name,
                  stock: inv.CurrentQuantity,
                  unit: "Đơn vị",
                });
              }
            }
          }
        });

        // 4. Đề xuất chờ kiểm duyệt (Status === "0" hoặc "Chờ duyệt")
        const pendingReqForms = reqList.filter((r) => r.Status === "0" || r.Status === "Chờ duyệt");

        const pendingItems: PendingReqItem[] = pendingReqForms.map((rf) => {
          const creatorEmp = empList.find((e) => e.EmployeeID === rf.EmployeeID);
          const creatorName = creatorEmp ? creatorEmp.Fullname : `Nhân viên #${rf.EmployeeID}`;

          const detailsCount = reqDetailsList.filter((d) => d.RequestID === rf.RequestID).length;

          return {
            id: `YC-${rf.RequestID}`,
            title: `Yêu cầu bổ sung vật tư #${rf.RequestID}`,
            creator: creatorName,
            date: new Date(rf.CreatedDate).toLocaleDateString("vi-VN"),
            itemsCount: detailsCount || 1,
          };
        });

        setMetrics({
          productsCount: totalProds,
          lowStockCount: lowStockItems.length,
          warehousesCount: activeWH,
          pendingReqsCount: pendingReqForms.length,
        });

        setLowStockProducts(lowStockItems.slice(0, 3));
        setPendingRequests(pendingItems.slice(0, 3));

      } catch (e) {
        console.error("Lỗi tải thông tin Dashboard:", e);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header section with User Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-blue-600 p-6 rounded-xl text-white">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Xin chào, {emp?.Fullname || "Thành viên hệ thống"}!
          </h1>
          <p className="text-blue-100 mt-1 text-sm font-medium">
            Hôm nay là một ngày tuyệt vời!
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-xl border border-slate-200">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-slate-500 font-semibold">Đang chuẩn bị báo cáo tổng quan...</span>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950">Báo cáo hiệu quả kinh doanh & KPI</h2>
          <Dashboard />
        </div>
      )}
    </div>
  );
}
