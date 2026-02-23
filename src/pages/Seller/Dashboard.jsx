import StatsGrid from "../../components/charts/StatsGrid" ;
import ChartSection from "../../components/charts/ChartSection";
import TableSection from "../../components/charts/TableSection";
import ActivityFeed from "./ActivityFeed";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <StatsGrid />
      <ChartSection/>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
            <TableSection/>
        </div>
        <div>
            <ActivityFeed/>
        </div>
      </div>

     
    </div>
  );
};

export default Dashboard;
