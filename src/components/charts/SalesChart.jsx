import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {salesData} from '../../data/Stats'

const SalesChart = () => {
  return (
    <div className="bg-white dark:bg-slate-900 backdrop-blur-xl rounded-b-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          Sales by Category
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Product Distribution
        </p>
      </div>

      {/* Pie Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={salesData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {salesData.map((item, index) => (
                <Cell key={`cell-${index}`} fill={item.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-3 mt-4">
        {salesData.map((item, index) => (
          <div
            className="flex items-center justify-between space-x-3"
            key={index}
          >
            <div className="flex items-center space-x-2">
              <div
                className="size-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {item.name}
              </span>
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-white">
              {item.value.toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;
