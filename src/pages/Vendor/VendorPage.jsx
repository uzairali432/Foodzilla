import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

// reuse seller dashboard components since vendor and seller are similar
import Dashboard from "../Seller/Dashboard";
import Orders from "../Seller/Orders";
import Products from "../Seller/Products";
import Payments from "../Seller/Payments";
import Messages from "../Seller/Messages";
import { menuItems, stats } from "../../data/Stats";
import StatsGrid from "../../components/charts/StatsGrid";
import ChartSection from "../../components/charts/ChartSection";
import TableSection from "../../components/charts/TableSection";
import AnalyticsReports from "../Seller/analytics/AnalyticsReports";
import AnalyticsInsights from "../Seller/analytics/AnalyticsInsights";
import VendorManagement from "./VendorManagement";

const VendorPage = () => {
  const [sidebarMenu, setSidebarMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

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
                  <StatsGrid stats={stats} />
                  <ChartSection />
                  <TableSection />
                </>
              )}
              {currentPage === "reports" && <AnalyticsReports />}
              {currentPage === "insights" && <AnalyticsInsights />}
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
