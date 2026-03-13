import RevenueChart from "./RevenueChart";
import SalesChart from "./SalesChart";

const ChartSection = ({ revenueData, salesData }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2">
        <RevenueChart data={revenueData} />
      </div>
      <div className="space-y-6">
        <SalesChart data={salesData} />
      </div>
    </div>
  );
};

export default ChartSection;
