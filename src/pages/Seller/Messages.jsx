import { useState, useMemo } from "react";
import { MessageSquare, Mail, Send, AlertCircle, Eye } from "lucide-react";
import StatsGrid from "../../components/charts/StatsGrid"; 
import { dummyMessages } from "../../data/Stats";

const Messages = () => {
  const [messages] = useState(dummyMessages);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchesSearch =
        msg.sender.toLowerCase().includes(search.toLowerCase()) ||
        msg.subject.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || msg.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [messages, search, statusFilter]);

  const messagesStats = [
    {
      title: "Total Messages",
      value: messages.length,
      change: "+5%",
      trend: "up",
      icon: MessageSquare,
      color: "from-blue-500 to-indigo-500",
      bgcolor: "bg-blue-100 dark:bg-blue-900/40",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Unread",
      value: messages.filter((m) => m.status === "Unread").length,
      change: "+2%",
      trend: "up",
      icon: Mail,
      color: "from-red-400 to-pink-500",
      bgcolor: "bg-red-100 dark:bg-red-900/40",
      textColor: "text-red-500 dark:text-red-400",
    },
    {
      title: "Replied",
      value: messages.filter((m) => m.status === "Replied").length,
      change: "+3%",
      trend: "up",
      icon: Send,
      color: "from-green-400 to-emerald-500",
      bgcolor: "bg-green-100 dark:bg-green-900/40",
      textColor: "text-green-500 dark:text-green-400",
    },
    {
      title: "Pending",
      value: messages.filter((m) => m.status === "Pending").length,
      change: "-1%",
      trend: "down",
      icon: AlertCircle,
      color: "from-yellow-400 to-orange-500",
      bgcolor: "bg-yellow-100 dark:bg-yellow-900/40",
      textColor: "text-yellow-500 dark:text-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-900 transition-all duration-500 text-slate-800 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Messages & Inquiries</h1>
      </div>

      {/* ✅ Stats Section */}
      <StatsGrid stats={messagesStats} />

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mt-6 mb-4">
        <input
          type="text"
          placeholder="Search by sender or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border dark:border-slate-700 dark:bg-slate-900 rounded-lg p-2 w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border dark:border-slate-700 dark:bg-slate-900 rounded-lg p-2"
        >
          <option value="All">All</option>
          <option value="Unread">Unread</option>
          <option value="Replied">Replied</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* ✅ Message Table */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">All Messages</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="p-3 border-b dark:border-slate-700">Sender</th>
              <th className="p-3 border-b dark:border-slate-700">Subject</th>
              <th className="p-3 border-b dark:border-slate-700">Date</th>
              <th className="p-3 border-b dark:border-slate-700">Status</th>
              <th className="p-3 border-b dark:border-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((msg) => (
              <tr
                key={msg.id}
                className="hover:bg-gray-50 dark:hover:bg-slate-800 transition"
              >
                <td className="p-3 border-b dark:border-slate-700">
                  {msg.sender}
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  {msg.subject}
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  {msg.date}
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      msg.status === "Unread"
                        ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                        : msg.status === "Replied"
                        ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                    }`}
                  >
                    {msg.status}
                  </span>
                </td>
                <td className="p-3 border-b dark:border-slate-700">
                  <button
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                    onClick={() => alert(`Viewing message from ${msg.sender}`)}
                  >
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}

            {filteredMessages.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 dark:text-slate-400"
                >
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
