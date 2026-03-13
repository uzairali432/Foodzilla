import CityChart from "../../../components/charts/CityChart";
import SalesChart from "../../../components/charts/SalesChart";
import TableSection from "../../../components/charts/TableSection";
import { buildSalesReport } from "../../../utils/salesReport";

const AnalyticsReports = ({ report = buildSalesReport([]), loading = false, error = "" }) => {

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold dark:text-white">Reports</h1>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
          Building live sales report...
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 xl:col-span-2">
          <CityChart data={report.cityData} />
        </div>
        <div className="space-y-6">
          <SalesChart data={report.salesByCategory} />
        </div>
      </div>
      <div>
        <TableSection
          recentOrders={report.recentOrders}
          topProducts={report.topProducts}
        />
      </div>
    </div>
  );
};

export default AnalyticsReports;
