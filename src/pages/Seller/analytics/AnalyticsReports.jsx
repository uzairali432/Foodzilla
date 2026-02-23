import CityChart from "../../../components/charts/CityChart"; 
import SalesChart from "../../../components/charts/SalesChart"; 
import TableSection from "../../../components/charts/TableSection";

const AnalyticsReports = () => {
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold dark:text-white">Reports</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className='className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 xl:col-span-2'>
          <CityChart />
        </div>
        <div className="space-y-6">
          <SalesChart />
        </div>
      </div>
      <div>
        <TableSection />
      </div>
    </div>
  );
};

export default AnalyticsReports;
