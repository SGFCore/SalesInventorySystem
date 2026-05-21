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
      <div className="bg-white border border-slate-200 rounded-xl p-2 flex flex-col md:flex-row items-end gap-4">
        <div className="flex-1 grid grid-cols-2 gap-2 w-full">
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
      <div className="grid grid-cols-4 gap-3">
        {/* KPI 1 */}
        <Card className="border border-slate-200 shadow-none rounded-lg">
          <CardContent className="p-2 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 truncate">
                Tổng doanh thu
              </p>

              <p className="text-lg font-bold text-slate-900 whitespace-nowrap">
                {metrics.totalRevenue.toLocaleString("vi-VN")} đ
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 shrink-0">
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 2 */}
        <Card className="border border-slate-200 shadow-none rounded-lg">
          <CardContent className="p-2 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 truncate">
                Số lượng đơn
              </p>

              <p className="text-lg font-bold text-slate-900 whitespace-nowrap">
                {metrics.totalOrders.toLocaleString("vi-VN")}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 shrink-0">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 3 */}
        <Card className="border border-slate-200 shadow-none rounded-lg">
          <CardContent className="p-2 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 truncate">
                SP bán ra
              </p>

              <p className="text-lg font-bold text-slate-900 whitespace-nowrap">
                {metrics.productsSold.toLocaleString("vi-VN")}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-green-50 shrink-0">
              <Package className="h-4 w-4 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 4 */}
        <Card className="border border-slate-200 shadow-none rounded-lg">
          <CardContent className="p-2 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 truncate">
                SP trả về
              </p>

              <p className="text-lg font-bold text-slate-900 whitespace-nowrap">
                {metrics.productsReturned.toLocaleString("vi-VN")}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-red-50 shrink-0">
              <RotateCcw className="h-4 w-4 text-red-600" />
            </div>
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
        <div className="flex flex-col gap-2">
          {/* Biểu đồ doanh thu */}
          <Card className="bg-white border border-slate-200 rounded-xl shadow-none p-2">
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
          <Card className="bg-white border border-slate-200 rounded-xl shadow-none p-2">
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
