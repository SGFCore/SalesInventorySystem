import React, { useState } from "react";
import { useDashboard } from "@/context/dashboardContext";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  DollarSign,
  FileText,
  Package,
  RotateCcw,
  Search,
} from "lucide-react";

export default function Dashboard() {
  const { loading, metrics, chartData, getData } = useDashboard();
  
  // State cục bộ phục vụ việc chọn ngày trước khi nhấn Tra cứu
  const [tempStart, setTempStart] = useState<Date>(new Date());
  const [tempEnd, setTempEnd] = useState<Date>(new Date());

  const handleSearch = () => {
    if (tempStart > tempEnd) {
      alert("Ngày bắt đầu không được lớn hơn ngày kết thúc!");
      return;
    }
    getData(tempStart, tempEnd);
  };

  // Định nghĩa màu và label cho các biểu đồ
  const revenueChartConfig = {
    revenue: {
      label: "Doanh thu",
      color: "#2563eb", // blue-600
    },
  };

  const volumeChartConfig = {
    orders: {
      label: "Số đơn hàng",
      color: "#3b82f6", // blue-500
    },
    soldQty: {
      label: "Sản phẩm bán",
      color: "#10b981", // green-500
    },
    returnedQty: {
      label: "Sản phẩm trả",
      color: "#ef4444", // red-500
    },
  };

  return (
    <div className="space-y-6">
      {/* Bộ lọc khoảng thời gian */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-end gap-4">
        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
          <div className="grid gap-2">
            <Label htmlFor="start-date" className="font-semibold text-slate-700">Từ ngày</Label>
            <DatePicker
              id="start-date"
              value={tempStart}
              onChange={setTempStart}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="end-date" className="font-semibold text-slate-700">Đến ngày</Label>
            <DatePicker
              id="end-date"
              value={tempEnd}
              onChange={setTempEnd}
            />
          </div>
        </div>
        <Button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 px-6 rounded-md w-full md:w-auto flex items-center justify-center gap-2 border-0 shadow-none"
        >
          <Search className="h-4 w-4" />
          {loading ? "Đang xử lý..." : "Tra cứu"}
        </Button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Doanh thu */}
        <Card className="bg-white border border-slate-200 rounded-xl shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500">Tổng doanh thu</CardTitle>
            <DollarSign className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {metrics.totalRevenue.toLocaleString("vi-VN")} đ
            </div>
            <p className="text-xs text-slate-400 font-bold mt-1">Từ hóa đơn hoàn thành</p>
          </CardContent>
        </Card>

        {/* KPI 2: Số đơn */}
        <Card className="bg-white border border-slate-200 rounded-xl shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500">Số lượng đơn</CardTitle>
            <FileText className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {metrics.totalOrders.toLocaleString("vi-VN")}
            </div>
            <p className="text-xs text-slate-400 font-bold mt-1">Đơn hàng được xuất kho</p>
          </CardContent>
        </Card>

        {/* KPI 3: Bán ra */}
        <Card className="bg-white border border-slate-200 rounded-xl shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500">Sản phẩm bán ra</CardTitle>
            <Package className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {metrics.productsSold.toLocaleString("vi-VN")}
            </div>
            <p className="text-xs text-slate-400 font-bold mt-1">Sản phẩm đến tay khách hàng</p>
          </CardContent>
        </Card>

        {/* KPI 4: Trả về */}
        <Card className="bg-white border border-slate-200 rounded-xl shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500">Sản phẩm trả về</CardTitle>
            <RotateCcw className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {metrics.productsReturned.toLocaleString("vi-VN")}
            </div>
            <p className="text-xs text-slate-400 font-bold mt-1">Sản phẩm bị hoàn trả QC</p>
          </CardContent>
        </Card>
      </div>

      {/* Biểu đồ báo cáo */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 font-medium">
          Đang tải dữ liệu báo cáo thống kê...
        </div>
      ) : chartData.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 font-medium">
          Không có dữ liệu trong khoảng thời gian đã chọn.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Biểu đồ doanh thu */}
          <Card className="bg-white border border-slate-200 rounded-xl shadow-none p-4">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-slate-900">Biến động doanh thu</CardTitle>
              <CardDescription>Biểu đồ thể hiện sự thay đổi của doanh thu theo thời gian</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={revenueChartConfig} className="h-[300px] w-full">
                <LineChart data={chartData} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-slate-500"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-slate-500"
                    tickFormatter={(val) => `${(val / 1000).toLocaleString("vi-VN")}k`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    dataKey="revenue"
                    type="monotone"
                    stroke="var(--color-revenue)"
                    strokeWidth={2.5}
                    dot={{ r: 4, strokeWidth: 0, fill: "var(--color-revenue)" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Biểu đồ sản lượng */}
          <Card className="bg-white border border-slate-200 rounded-xl shadow-none p-4">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-slate-900">Đơn hàng & Sản lượng</CardTitle>
              <CardDescription>Biểu đồ cột thể hiện số đơn, sản phẩm bán ra và sản phẩm trả về</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={volumeChartConfig} className="h-[300px] w-full">
                <BarChart data={chartData} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-slate-500"
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-slate-500" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="orders"
                    fill="var(--color-orders)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="soldQty"
                    fill="var(--color-soldQty)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="returnedQty"
                    fill="var(--color-returnedQty)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
