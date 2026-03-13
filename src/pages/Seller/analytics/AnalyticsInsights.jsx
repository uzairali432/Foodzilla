import { AlertTriangle, CheckCircle2, Lightbulb, TrendingUp, Wallet } from "lucide-react";
import SalesForecastChart from "../../../components/charts/SalesForecastChart";
import RegionTrendsChart from "../../../components/charts/RegionTrendsChart";
import { buildSalesReport } from "../../../utils/salesReport";

const iconByType = {
  growth: TrendingUp,
  completion: CheckCircle2,
  average: Wallet,
  risk: AlertTriangle,
};

const AnalyticsInsights = ({ report = buildSalesReport([]), loading = false, error = "" }) => {
  const cards = report.insightCards || [];
  const suggestions = report.suggestions || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold dark:text-white">Insights</h1>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
          Refreshing insight models...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((item, index) => {
          const Icon = iconByType[item.type] || TrendingUp;
          const isPositive = item.trend === "up";
          return (
            <div
              key={index}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/2 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                    {item.title}
                  </p>
                  <p
                    className={`text-3xl font-bold mb-4 ${
                      isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {item.value}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 h-7">
                    {item.desc}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl group-hover:scale-110 transition-all duration-200 ${
                    isPositive ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-amber-50 dark:bg-amber-900/20"
                  }`}
                >
                  <Icon
                    className={`size-6 ${
                      isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                    }`}
                  />
                </div>
              </div>

              <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isPositive ? "bg-gradient-to-r from-emerald-500 to-green-600" : "bg-gradient-to-r from-amber-500 to-orange-600"
                  }`}
                  style={{ width: `${Math.max(10, Math.min(100, Number(item.level || 0)))}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 dark:text-white">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Sales Forecast</h2>
          <SalesForecastChart data={report.forecastData} />
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Region Trends</h2>
          <RegionTrendsChart data={report.regionData} />
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Actionable Suggestions
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          {suggestions.map((suggestion, index) => (
            <li className="flex items-start gap-2" key={index}>
              <Lightbulb className="mt-1 text-indigo-500" size={18} />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsInsights;
