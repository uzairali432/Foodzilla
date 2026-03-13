import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, DollarSign, ShoppingCart, Truck } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

// reuse seller dashboard components since vendor and seller are similar
import Dashboard from "../Seller/Dashboard";
import Orders from "../Seller/Orders";
import Products from "../Seller/Products";
import Payments from "../Seller/Payments";
import Messages from "../Seller/Messages";
import { menuItems } from "../../data/Stats";
import StatsGrid from "../../components/charts/StatsGrid";
import ChartSection from "../../components/charts/ChartSection";
import TableSection from "../../components/charts/TableSection";
import AnalyticsReports from "../Seller/analytics/AnalyticsReports";
import AnalyticsInsights from "../Seller/analytics/AnalyticsInsights";
import VendorManagement from "./VendorManagement";
import { buildSalesReport } from "../../utils/salesReport";

const VendorPage = () => {
  const [sidebarMenu, setSidebarMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsError, setAnalyticsError] = useState("");

  useEffect(() => {
    const fetchVendorOrders = async () => {
      try {
        setAnalyticsLoading(true);
        setAnalyticsError("");
        const token = localStorage.getItem("token");
        const response = await fetch("/api/orders/vendor", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.message || "Failed to load vendor analytics");
        }

        setOrders(Array.isArray(payload) ? payload : []);
      } catch (err) {
        console.error("Vendor analytics load failed", err);
        setAnalyticsError(err.message || "Unable to load vendor analytics");
      } finally {
        setAnalyticsLoading(false);
      }
    };

    fetchVendorOrders();
  }, []);

  const report = useMemo(() => buildSalesReport(orders), [orders]);

  const overviewStats = useMemo(() => {
    const summary = report.summary || {};

    return [
      {
        title: "Total Revenue",
        value: `Rs. ${Number(summary.totalRevenue || 0).toLocaleString()}`,
        change: `${summary.growthRate >= 0 ? "+" : ""}${Number(summary.growthRate || 0).toFixed(1)}%`,
        trend: summary.growthRate >= 0 ? "up" : "down",
        icon: DollarSign,
        color: "from-emerald-500 to-teal-600",
        bgcolor: "bg-emerald-50 dark:bg-emerald-900/20",
        textColor: "text-emerald-600 dark:text-emerald-400",
      },
      {
        title: "Total Orders",
        value: String(summary.totalOrders || 0),
        change: `${Number(summary.completionRate || 0).toFixed(1)}% done`,
        trend: "up",
        icon: ShoppingCart,
        color: "from-blue-500 to-indigo-600",
        bgcolor: "bg-blue-50 dark:bg-blue-900/20",
        textColor: "text-blue-600 dark:text-blue-400",
      },
      {
        title: "Delivered Orders",
        value: String(summary.deliveredOrders || 0),
        change: `${Number(summary.completionRate || 0).toFixed(1)}% rate`,
        trend: Number(summary.completionRate || 0) >= 85 ? "up" : "down",
        icon: Truck,
        color: "from-orange-500 to-amber-600",
        bgcolor: "bg-orange-50 dark:bg-orange-900/20",
        textColor: "text-orange-600 dark:text-orange-400",
      },
      {
        title: "Cancelled Orders",
        value: String(summary.cancelledOrders || 0),
        change: `${Number(summary.cancellationRate || 0).toFixed(1)}% rate`,
        trend: Number(summary.cancellationRate || 0) <= 10 ? "up" : "down",
        icon: AlertTriangle,
        color: "from-rose-500 to-red-600",
        bgcolor: "bg-rose-50 dark:bg-rose-900/20",
        textColor: "text-rose-600 dark:text-rose-400",
      },
    ];
  }, [report]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          menu={sidebarMenu}
          onToggle={() => setSidebarMenu(!sidebarMenu)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          menuItems={menuItems}
          title="FoodZilla"
          subtitle="Vendor Dashboard"
          role="Vendor"
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onToggleSidebar={() => setSidebarMenu(!sidebarMenu)} />

          <main className="flex-1 overflow-y-auto bg-transparent">
            <div className="p-6 space-y-6">
              {currentPage === "dashboard" && <Dashboard />}
              {currentPage === "overview" && (
                <>
                  {analyticsError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                      {analyticsError}
                    </div>
                  )}
                  {analyticsLoading && (
                    <div className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                      Loading vendor analytics...
                    </div>
                  )}
                  <StatsGrid stats={overviewStats} />
                  <ChartSection
                    revenueData={report.monthlyFinance}
                    salesData={report.salesByCategory}
                  />
                  <TableSection
                    recentOrders={report.recentOrders}
                    topProducts={report.topProducts}
                  />
                </>
              )}
              {currentPage === "reports" && (
                <AnalyticsReports
                  report={report}
                  loading={analyticsLoading}
                  error={analyticsError}
                />
              )}
              {currentPage === "insights" && (
                <AnalyticsInsights
                  report={report}
                  loading={analyticsLoading}
                  error={analyticsError}
                />
              )}
              {currentPage === "order" && <Orders />}
              {currentPage === "inventory" && <Products />}
              {currentPage === "transaction" && <Payments />}
              {currentPage === "messages" && <Messages />}
              {currentPage === "restaurant-info" && <VendorManagement />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default VendorPage;
