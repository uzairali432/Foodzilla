import React, { useState, useEffect } from "react";
import { Search, RefreshCw } from "lucide-react";

const STATUS_OPTIONS = ["Pending", "Processing", "Delivered", "Cancelled"];

const statusStyle = {
  Delivered: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
  Processing: "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200",
  Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const resp = await fetch("/api/orders/vendor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await resp.json();
      if (resp.ok) setOrders(data);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await resp.json();
      if (resp.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: data.status } : o))
        );
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Status update failed", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchStatus = statusFilter === "all" || order.status === statusFilter;
    const customerName = order.customer?.name || "";
    const matchSearch =
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 dark:text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-1 text-sm text-emerald-600 hover:underline"
        >
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select
          className="border dark:border-slate-700 dark:bg-slate-900 rounded-lg p-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <div className="flex items-center border dark:border-slate-700 dark:bg-slate-900 rounded-lg px-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order # or Customer"
            className="flex-1 p-2 outline-none bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">
          All Orders ({filteredOrders.length})
        </h2>

        {loading ? (
          <p className="text-gray-500 dark:text-slate-400 py-4">Loading orders...</p>
        ) : (
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="p-3 border-b dark:border-slate-700">Order #</th>
                <th className="p-3 border-b dark:border-slate-700">Customer</th>
                <th className="p-3 border-b dark:border-slate-700">Items</th>
                <th className="p-3 border-b dark:border-slate-700">Amount</th>
                <th className="p-3 border-b dark:border-slate-700">Status</th>
                <th className="p-3 border-b dark:border-slate-700">Date</th>
                <th className="p-3 border-b dark:border-slate-700">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                >
                  <td className="p-3 border-b dark:border-slate-700 font-mono text-sm">
                    {order.orderNumber}
                  </td>
                  <td className="p-3 border-b dark:border-slate-700">
                    <p>{order.customer?.name || "—"}</p>
                    <p className="text-xs text-gray-400">{order.customer?.email}</p>
                  </td>
                  <td className="p-3 border-b dark:border-slate-700">
                    {order.items.map((item, i) => (
                      <p key={i} className="text-sm">
                        {item.quantity}x {item.name}
                      </p>
                    ))}
                  </td>
                  <td className="p-3 border-b dark:border-slate-700">
                    Rs. {order.totalAmount}
                  </td>
                  <td className="p-3 border-b dark:border-slate-700">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusStyle[order.status] || ""
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 border-b dark:border-slate-700 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b dark:border-slate-700">
                    <select
                      className="border dark:border-slate-700 dark:bg-slate-800 rounded-lg px-2 py-1 text-sm"
                      value={order.status}
                      disabled={updatingId === order._id}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-gray-500 dark:text-slate-400"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
