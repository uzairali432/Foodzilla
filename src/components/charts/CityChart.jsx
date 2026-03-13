import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { data as fallbackData } from "../../data/Stats";

const CityChart = ({ data = fallbackData }) => {
  const chartData = Array.isArray(data) ? data : fallbackData;

  if (chartData.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
        No city revenue data available yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CityChart;
