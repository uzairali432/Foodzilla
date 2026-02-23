// insightsData.js (ya isi file me top pe bana lo)
import { TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import SalesForecastChart from "../../../components/charts/SalesForecastChart";
import RegionTrendsChart from "../../../components/charts/RegionTrendsChart";
import {insights} from '../../../data/Stats'


const AnalyticsInsights = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold dark:text-white">Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {insights.map((item, index) => {
          const Icon = item.icon;
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
                  <p className={`text-3xl font-bold ${item.textColor} mb-4`}>
                    {item.value}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 h-7">
                    {item.desc}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl ${item.bgcolor} group-hover:scale-110 transition-all duration-200`}
                >
                  <Icon className={`size-6 ${item.textColor}`} />
                </div>
              </div>

              <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-2 bg-gradient-to-r ${item.color} rounded-full transition-all duration-300`}
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 dark:text-white">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Sales Forecast</h2>
          <SalesForecastChart />
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Region Trends</h2>
          <RegionTrendsChart />
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Actionable Suggestions
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <Lightbulb className="mt-1 text-indigo-500" size={18} />
            <span>
              Consider running a discount campaign for Region X to boost sales.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Lightbulb className="mt-1 text-indigo-500" size={18} />
            <span>
              Restock low inventory items before next month’s demand surge.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Lightbulb className="mt-1 text-indigo-500" size={18} />
            <span>
              Invest more in product category Y, showing consistent growth.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsInsights;
