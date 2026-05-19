import { useNavigate } from "react-router-dom";
import { useEmp } from "@/context/empContext";
import { btn, page } from "@/pages/page-classes";
import { 
  Package, 
  AlertTriangle, 
  Warehouse, 
  ClipboardList, 
  ArrowRight, 
  Bell, 
  FileText, 
  PlusCircle, 
  Activity 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const navigate = useNavigate();
  const { emp } = useEmp();

  // Mock data for dashboard
  const lowStockProducts = [
    { id: "PROD-004", name: "Nước khoáng Aquafina 500ml", stock: 3, unit: "Chai" },
    { id: "PROD-012", name: "Sữa tươi Vinamilk ít đường", stock: 8, unit: "Hộp" },
    { id: "PROD-025", name: "Coca-Cola lon 320ml", stock: 5, unit: "Lon" },
  ];

  const pendingRequests = [
    { 
      id: "REQ-002", 
      title: "Đề xuất nước giải khát hè", 
      creator: "Lê Văn Quản Lý", 
      date: "18/05/2026", 
      itemsCount: 3 
    },
    { 
      id: "REQ-005", 
      title: "Bổ sung sữa & bánh ngọt", 
      creator: "Nguyễn Thị Kho", 
      date: "19/05/2026", 
      itemsCount: 2 
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header section with User Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-xl text-white shadow-md shadow-blue-100/50">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Xin chào, {emp?.Fullname || "Nguyễn Giám Đốc"}!
          </h1>
          <p className="text-blue-100 mt-1 text-sm">
            Hôm nay là một ngày tuyệt vời để quản lý kho hàng và đơn hàng của bạn.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm">
          <Activity className="h-4 w-4 animate-pulse text-green-300" />
          Hệ thống hoạt động bình thường
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div 
          onClick={() => navigate("/product-management?tab=products")}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <span className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
              <Package className="h-5 w-5" />
            </span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Xem tất cả
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900">142</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Sản phẩm trên hệ thống</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => navigate("/product-management?tab=products")}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <span className="p-3 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
              Kiểm tra
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900">3</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Sản phẩm sắp hết hàng</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => navigate("/warehouse-management")}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <span className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors duration-200">
              <Warehouse className="h-5 w-5" />
            </span>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              Quản lý
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900">3</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Chi nhánh kho hàng</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div 
          onClick={() => navigate("/circulating-slips-management?tab=replenishment-requests")}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <span className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200">
              <ClipboardList className="h-5 w-5" />
            </span>
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full animate-pulse">
              Duyệt ngay
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900">2</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Đề xuất chờ kiểm duyệt</p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Replenishment Requests Widget */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-md font-semibold text-slate-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Đề xuất nhập hàng chưa kiểm duyệt
            </h2>
            <button 
              onClick={() => navigate("/circulating-slips-management?tab=replenishment-requests")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              Xem tất cả
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="p-4 flex-1 space-y-3">
            {pendingRequests.map((req) => (
              <div 
                key={req.id} 
                className="p-3.5 bg-slate-50 hover:bg-blue-50/30 border border-slate-100 rounded-lg flex justify-between items-center transition-colors duration-150"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-200/60 px-1.5 py-0.5 rounded">
                      {req.id}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900">{req.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500">
                    Người tạo: <span className="font-medium text-slate-700">{req.creator}</span> · {req.date}
                  </p>
                  <p className="text-xs text-slate-400">
                    Gồm {req.itemsCount} mặt hàng cần nhập thêm
                  </p>
                </div>
                <button
                  onClick={() => navigate("/circulating-slips-management?tab=replenishment-requests")}
                  className={cn(btn.actionPrimary, "px-3 py-1.5 text-xs font-semibold border rounded-md shadow-sm h-auto")}
                >
                  Kiểm duyệt
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert Widget */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-md font-semibold text-slate-900 flex items-center gap-2">
              <Bell className="h-5 w-5 text-red-500 animate-swing" />
              Cảnh báo tồn kho thấp
            </h2>
            <button 
              onClick={() => navigate("/circulating-slips-management?tab=replenishment-requests")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              Tạo đề xuất mới
              <PlusCircle className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              {lowStockProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  className="flex items-center justify-between p-3 border border-red-100 bg-red-50/20 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-red-50 text-red-500 rounded-md">
                      <AlertTriangle className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{prod.name}</h4>
                      <p className="text-xs text-slate-500">Mã sản phẩm: {prod.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-red-600">{prod.stock}</span>
                    <span className="text-xs text-slate-500 ml-1">{prod.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/circulating-slips-management?tab=replenishment-requests")}
              className={cn(btn.primary, "w-full mt-4 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-sm")}
            >
              <PlusCircle className="h-4 w-4" />
              Tạo phiếu đề xuất nhập kho cho các mặt hàng này
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
