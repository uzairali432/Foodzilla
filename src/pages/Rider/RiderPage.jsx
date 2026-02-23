import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

import DeliveryManagement from "./DeliveryManagement";
import EarningsPayments from "./EarningsPayments";
import SupportFeedback from "./SupportFeedback";
import ProfileSettings from "./ProfileSettings";
import { CreditCard, MessageSquare, Package, Truck } from "lucide-react";

export const riderMenu = [
  { id: "deliveryManagement", icon: Truck, label: "Delivery Management" },
  { id: "earningsPayments", icon: CreditCard, label: "Earnings & Payments" },
  { id: "supportFeedback", icon: MessageSquare, label: "Support & Feedback" },
  { id: "profileSettings", icon: Package, label: "Profile Settings" },
];

const RiderPage = () => {
  const [sidebarMenu, setSidebarMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState("deliveryManagement");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          menu={sidebarMenu}
          onToggle={() => setSidebarMenu(!sidebarMenu)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          menuItems={riderMenu}
          title="FoodZilla"
          subtitle="Rider Dashboard"
          role="Rider"
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onToggleSidebar={() => setSidebarMenu(!sidebarMenu)} />

          <main className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {currentPage === "deliveryManagement" && <DeliveryManagement />}
              {currentPage === "earningsPayments" && <EarningsPayments />}
              {currentPage === "supportFeedback" && <SupportFeedback />}
              {currentPage === "profileSettings" && <ProfileSettings />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RiderPage;
