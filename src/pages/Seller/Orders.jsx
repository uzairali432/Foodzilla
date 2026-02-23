import React, { useState } from "react";
import { Eye, Search } from "lucide-react";
import {orders} from '../../data/Stats';

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");


  const filteredOrders = orders.filter((order) => {
    const matchStatus = statusFilter === "all" || order.status === statusFilter;
    const matchSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 dark:text-white">
      <h1 className="text-2xl font-semibold">Orders</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select
          className="border dark:border-slate-700 dark:bg-slate-900 rounded-lg p-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <div className="flex items-center border dark:border-slate-700 dark:bg-slate-900 rounded-lg px-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID or Customer"
            className="flex-1 p-2 outline-none bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">All Orders</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="p-3 border-b dark:border-slate-700">Order ID</th>
              <th className="p-3 border-b dark:border-slate-700">Customer</th>
              <th className="p-3 border-b dark:border-slate-700">Items</th>
              <th className="p-3 border-b dark:border-slate-700">Amount</th>
              <th className="p-3 border-b dark:border-slate-700">Status</th>
              <th className="p-3 border-b dark:border-slate-700">Date</th>
              <th className="p-3 border-b dark:border-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 dark:hover:bg-slate-800 transition"
              >
                <td className="p-3 border-b dark:border-slate-700">
                  {order.id}
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  {order.customer}
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  {order.items}
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  {order.amount}
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                        : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  {order.date}
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  <button
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                    onClick={() => alert(`Viewing details for ${order.id}`)}
                  >
                    <Eye size={16} /> View
                  </button>
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
      </div>
    </div>
  );
};

export default Orders;
