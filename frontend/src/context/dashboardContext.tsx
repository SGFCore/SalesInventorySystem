import { api } from "@/lib/api";
import {
  eachDayOfInterval,
  endOfDay,
  format,
  isSameDay,
  isWithinInterval,
  parseISO,
  startOfDay,
} from "date-fns";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  productsSold: number;
  productsReturned: number;
}

export interface ChartPoint {
  date: string; // Định dạng dd/MM
  revenue: number;
  orders: number;
  soldQty: number;
  returnedQty: number;
}

interface DashboardContextType {
  startDate: Date;
  endDate: Date;
  loading: boolean;
  metrics: DashboardMetrics;
  chartData: ChartPoint[];
  invoices: any[];
  detailInventories: any[];
  warehouses: any[];
  products: any[];
  getData: (start: Date, end: Date) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalRevenue: 0,
    totalOrders: 0,
    productsSold: 0,
    productsReturned: 0,
  });
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [detailInventories, setDetailInventories] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const getData = async (start: Date, end: Date) => {
    setLoading(true);
    setStartDate(start);
    setEndDate(end);

    try {
      // Gọi song song các API để tải dữ liệu
      const [invList, invDetailsList, returnList, returnDetailsList, diList, whList, pList] = await Promise.all([
        api.invoices.list(),
        api.invoiceDetails.list(),
        api.orderReturns.list(),
        api.returnDetails.list(),
        api.detailInventories.list(),
        api.warehouses.list(),
        api.products.list(),
      ]);

      setInvoices(invList);
      setDetailInventories(diList);
      setWarehouses(whList);
      setProducts(pList);

      const startBoundary = startOfDay(start);
      const endBoundary = endOfDay(end);

      // 1. Lọc hóa đơn trong khoảng thời gian [start, end]
      const filteredInvoices = invList.filter((inv) => {
        if (!inv.InvoiceDate) return false;
        try {
          const invDate = parseISO(inv.InvoiceDate);
          return isWithinInterval(invDate, { start: startBoundary, end: endBoundary });
        } catch (e) {
          return false;
        }
      });

      // 2. Tính tổng doanh thu (FinalAmount) và tổng số đơn
      const totalRev = filteredInvoices.reduce((sum, inv) => sum + (inv.FinalAmount || 0), 0);
      const totalOrd = filteredInvoices.length;

      // 3. Tính tổng số sản phẩm bán ra từ Invoice Details
      const filteredInvoiceIds = new Set(filteredInvoices.map((inv) => inv.InvoiceID));
      const filteredInvoiceDetails = invDetailsList.filter((detail) =>
        filteredInvoiceIds.has(detail.InvoiceID)
      );
      const totalSold = filteredInvoiceDetails.reduce((sum, detail) => sum + (detail.Quantity || 0), 0);

      // 4. Lọc phiếu trả hàng trong khoảng thời gian [start, end]
      const filteredReturns = returnList.filter((ret) => {
        if (!ret.returndate) return false;
        try {
          const retDate = parseISO(ret.returndate);
          return isWithinInterval(retDate, { start: startBoundary, end: endBoundary });
        } catch (e) {
          return false;
        }
      });

      // 5. Tính tổng số sản phẩm trả về từ Return Details
      const filteredReturnIds = new Set(filteredReturns.map((ret) => ret.id));
      const filteredReturnDetails = returnDetailsList.filter((detail) =>
        filteredReturnIds.has(detail.ReturnID)
      );
      const totalReturned = filteredReturnDetails.reduce(
        (sum, detail) => sum + (detail.Quantity || 0),
        0
      );

      // Cập nhật metrics KPI
      setMetrics({
        totalRevenue: totalRev,
        totalOrders: totalOrd,
        productsSold: totalSold,
        productsReturned: totalReturned,
      });

      // 6. Xây dựng dữ liệu vẽ biểu đồ theo từng ngày
      const daysInterval = eachDayOfInterval({ start: startBoundary, end: endBoundary });

      const newChartData: ChartPoint[] = daysInterval.map((day) => {
        const dateLabel = format(day, "dd/MM");

        // Hóa đơn trong ngày này
        const dayInvoices = filteredInvoices.filter((inv) => {
          try {
            return isSameDay(parseISO(inv.InvoiceDate), day);
          } catch {
            return false;
          }
        });

        // Doanh thu ngày này
        const dayRevenue = dayInvoices.reduce((sum, inv) => sum + (inv.FinalAmount || 0), 0);

        // Số đơn ngày này
        const dayOrders = dayInvoices.length;

        // Chi tiết bán trong ngày này
        const dayInvoiceIds = new Set(dayInvoices.map((inv) => inv.InvoiceID));
        const daySold = invDetailsList
          .filter((d) => dayInvoiceIds.has(d.InvoiceID))
          .reduce((sum, d) => sum + (d.Quantity || 0), 0);

        // Phiếu trả trong ngày này
        const dayReturns = filteredReturns.filter((ret) => {
          try {
            return isSameDay(parseISO(ret.returndate), day);
          } catch {
            return false;
          }
        });

        // Sản phẩm trả về trong ngày này
        const dayReturnIds = new Set(dayReturns.map((ret) => ret.id));
        const dayReturned = returnDetailsList
          .filter((d) => dayReturnIds.has(d.ReturnID))
          .reduce((sum, d) => sum + (d.Quantity || 0), 0);

        return {
          date: dateLabel,
          revenue: dayRevenue,
          orders: dayOrders,
          soldQty: daySold,
          returnedQty: dayReturned,
        };
      });

      setChartData(newChartData);
    } catch (error) {
      console.error("Lỗi khi tải hoặc xử lý dữ liệu Dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tải dữ liệu ban đầu cho ngày hôm nay
  useEffect(() => {
    getData(new Date(), new Date());
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        startDate,
        endDate,
        loading,
        metrics,
        chartData,
        invoices,
        detailInventories,
        warehouses,
        products,
        getData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard phải được sử dụng trong DashboardProvider");
  }
  return context;
}
