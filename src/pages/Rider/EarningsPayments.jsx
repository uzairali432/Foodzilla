import StatsGrid from "../../components/charts/StatsGrid";
import { riderStats } from "../../data/Stats";
import { MoreHorizontal } from "lucide-react"; 
import {riderPayments} from '../../data/Stats'

const EarningsPayments = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "failed":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <StatsGrid stats={riderStats} />

      {/* Rider Payment History */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Rider Payment History
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Recent Rider Payouts
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Payment ID
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Rider
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Amount
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600">
                  Date
                </th>
                <th className="p-4"></th>
              </tr>
            </thead>

            <tbody>
              {riderPayments && riderPayments.length > 0 ? (
                riderPayments.map((payment, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <span className="text-sm font-medium dark:text-white">
                        {payment.id}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {payment.rider}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {payment.amount}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`font-medium text-xs px-3 py-1 rounded-full ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {payment.date}
                      </span>
                    </td>
                    <td className="p-4">
                      <MoreHorizontal className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-slate-500">
                    No payment records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EarningsPayments;
