import { useEffect, useMemo, useState } from "react";
import { CheckCircle, LayoutDashboard, Package, Users } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import {
  approveVendor,
  deleteUserById,
  getAllOrders,
  getAllUsers,
  getPendingVendors,
  rejectVendor,
  toggleUserStatus,
} from "../../utils/authService";

const adminMenuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "approve-vendors", icon: CheckCircle, label: "Approve Vendors" },
  { id: "manage-users", icon: Users, label: "Manage Users" },
  { id: "all-orders", icon: Package, label: "View All Orders" },
];

const AdminPage = () => {
  const [sidebarMenu, setSidebarMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pendingVendors, allUsers, allOrders] = await Promise.all([
        getPendingVendors(),
        getAllUsers(),
        getAllOrders(),
      ]);
      setVendors(pendingVendors);
      setUsers(allUsers);
      setOrders(allOrders);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const dashboardStats = useMemo(
    () => ({
      pendingVendors: vendors.length,
      totalUsers: users.length,
      totalOrders: orders.length,
    }),
    [vendors.length, users.length, orders.length]
  );

  const handleVendorAction = async (vendorId, action) => {
    try {
      if (action === "approve") {
        await approveVendor(vendorId);
      } else {
        await rejectVendor(vendorId);
      }
      await loadData();
    } catch (error) {
      alert(error?.response?.data?.message || "Vendor action failed");
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      await toggleUserStatus(userId);
      await loadData();
    } catch (error) {
      alert(error?.response?.data?.message || "Status update failed");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserById(userId);
      await loadData();
    } catch (error) {
      alert(error?.response?.data?.message || "Delete user failed");
    }
  };

  const renderContent = () => {
    if (loading) {
      return <p className="text-slate-700">Loading admin data...</p>;
    }

    if (currentPage === "dashboard") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 shadow">
            <p className="text-sm text-slate-500">Pending Vendors</p>
            <p className="text-3xl font-bold text-slate-800">{dashboardStats.pendingVendors}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow">
            <p className="text-sm text-slate-500">Total Users</p>
            <p className="text-3xl font-bold text-slate-800">{dashboardStats.totalUsers}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow">
            <p className="text-sm text-slate-500">All Orders</p>
            <p className="text-3xl font-bold text-slate-800">{dashboardStats.totalOrders}</p>
          </div>
        </div>
      );
    }

    if (currentPage === "approve-vendors") {
      return (
        <div className="bg-white rounded-xl p-5 shadow overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Approve Vendors</h2>
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Phone</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor._id}>
                  <td className="p-3 border-b">{vendor.name}</td>
                  <td className="p-3 border-b">{vendor.email}</td>
                  <td className="p-3 border-b">{vendor.phoneNumber || "N/A"}</td>
                  <td className="p-3 border-b space-x-2">
                    <button
                      onClick={() => handleVendorAction(vendor._id, "approve")}
                      className="px-3 py-1 rounded bg-green-600 text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleVendorAction(vendor._id, "reject")}
                      className="px-3 py-1 rounded bg-red-600 text-white"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (currentPage === "manage-users") {
      return (
        <div className="bg-white rounded-xl p-5 shadow overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Role</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="p-3 border-b">{user.name || "N/A"}</td>
                  <td className="p-3 border-b">{user.email}</td>
                  <td className="p-3 border-b uppercase">{user.role}</td>
                  <td className="p-3 border-b">{user.isActive ? "Active" : "Inactive"}</td>
                  <td className="p-3 border-b space-x-2">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleToggleStatus(user._id)}
                        className="px-3 py-1 rounded bg-blue-600 text-white"
                      >
                        Toggle Status
                      </button>
                    )}
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="px-3 py-1 rounded bg-slate-700 text-white"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl p-5 shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">View All Orders</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="p-3 border-b">Order #</th>
              <th className="p-3 border-b">Customer</th>
              <th className="p-3 border-b">Vendor</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="p-3 border-b">{order.orderNumber}</td>
                <td className="p-3 border-b">{order.customer?.name || "N/A"}</td>
                <td className="p-3 border-b">{order.vendor?.name || "N/A"}</td>
                <td className="p-3 border-b">{order.status}</td>
                <td className="p-3 border-b">${order.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          menu={sidebarMenu}
          onToggle={() => setSidebarMenu(!sidebarMenu)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          menuItems={adminMenuItems}
          title="FoodZilla"
          subtitle="Admin Dashboard"
          role="Admin"
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onToggleSidebar={() => setSidebarMenu(!sidebarMenu)} />

          <main className="flex-1 overflow-y-auto bg-transparent">
            <div className="p-6 space-y-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
