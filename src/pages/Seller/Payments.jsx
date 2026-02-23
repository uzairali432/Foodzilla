import React, { useState, useMemo } from "react";
import { CreditCard, Clock, XCircle, Wallet, Eye } from "lucide-react";
import StatsGrid from "../../components/charts/StatsGrid"; 
import {dummyTransactions} from '../../data/Stats'

const Payments = () => {
  const [transactions] = useState(dummyTransactions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesSearch =
        txn.customer.toLowerCase().includes(search.toLowerCase()) ||
        txn.txnId.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || txn.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [transactions, search, statusFilter]);

  const stats = [
    {
      title: "Total Transactions",
      value: transactions.length,
      change: "+8%",
      trend: "up",
      icon: CreditCard,
      color: "from-blue-500 to-indigo-500",
      bgcolor: "bg-blue-100 dark:bg-blue-900/40",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Successful",
      value: transactions.filter((t) => t.status === "Success").length,
      change: "+15%",
      trend: "up",
      icon: Wallet,
      color: "from-green-400 to-emerald-500",
      bgcolor: "bg-green-100 dark:bg-green-900/40",
      textColor: "text-green-500 dark:text-green-400",
    },
    {
      title: "Pending",
      value: transactions.filter((t) => t.status === "Pending").length,
      change: "-3%",
      trend: "down",
      icon: Clock,
      color: "from-yellow-400 to-orange-500",
      bgcolor: "bg-yellow-100 dark:bg-yellow-900/40",
      textColor: "text-yellow-500 dark:text-yellow-400",
    },
    {
      title: "Failed",
      value: transactions.filter((t) => t.status === "Failed").length,
      change: "-2%",
      trend: "down",
      icon: XCircle,
      color: "from-red-500 to-pink-500",
      bgcolor: "bg-red-100 dark:bg-red-900/40",
      textColor: "text-red-500 dark:text-red-400",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-900 transition-all duration-500 text-slate-800 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments & Transactions</h1>
      </div>

      {/* ✅ Stats */}
      <StatsGrid stats={stats} />

      {/* 🔍 Filters */}
      <div className="flex flex-col md:flex-row gap-4 mt-6 mb-4">
        <input
          type="text"
          placeholder="Search by Customer or Transaction ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border dark:border-slate-700 dark:bg-slate-900 rounded-lg p-2 w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border dark:border-slate-700 dark:bg-slate-900 rounded-lg p-2"
        >
          <option value="All">All Statuses</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* ✅ Stylish Table */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">All Transactions</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="p-3 border-b dark:border-slate-700">Txn ID</th>
              <th className="p-3 border-b dark:border-slate-700">Customer</th>
              <th className="p-3 border-b dark:border-slate-700">Amount</th>
              <th className="p-3 border-b dark:border-slate-700">
                Payment Method
              </th>
              <th className="p-3 border-b dark:border-slate-700">Status</th>
              <th className="p-3 border-b dark:border-slate-700">Date</th>
              <th className="p-3 border-b dark:border-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn) => (
              <tr
                key={txn.id}
                className="hover:bg-gray-50 dark:hover:bg-slate-800 transition"
              >
                <td className="p-3 border-b dark:border-slate-700">
                  {txn.txnId}
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  {txn.customer}
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  {txn.amount}
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  {txn.method}
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      txn.status === "Success"
                        ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                        : txn.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                        : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  {txn.date}
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  <button
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                    onClick={() => alert(`Viewing details for ${txn.txnId}`)}
                  >
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}

            {filteredTransactions.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 dark:text-slate-400"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
