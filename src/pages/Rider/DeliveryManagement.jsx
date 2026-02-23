import { useEffect, useState } from "react";
import {sampleDeliveries} from '../../data/Stats';
import { useOrderContext } from "../../components/hooks/useOrder";

export default function DeliveryManagement() {
  const { state: { deliveries }} = useOrderContext();
  const [allDeliveries, setAllDeliveries] = useState([]);


 useEffect(() => {
  const saved = localStorage.getItem("deliveries");
  const storedDeliveries = saved ? JSON.parse(saved) : [];

  const combinedDeliveries = [
    ...sampleDeliveries,
    ...(storedDeliveries.length > 0 ? storedDeliveries : []),
    ...(storedDeliveries.length > 0 ? deliveries : []),
  ];

  const uniqueDeliveries = combinedDeliveries.filter(
    (d, index, self) => index === self.findIndex((t) => t.id === d.id)
  );

  setAllDeliveries(uniqueDeliveries);
}, [deliveries]);



  return (
    <section>
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Delivery Management
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {allDeliveries.length === 0 ? (
            <p className="text-center text-slate-500">No deliveries found.</p>
          ) : (
            allDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="flex items-center justify-between p-4 rounded-b-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
                    {delivery.customer}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Address: {delivery.address}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {delivery.id}
                  </p>
                  <p
                    className={`text-sm ${
                      delivery.status === "Delivered"
                        ? "text-emerald-500"
                        : delivery.status === "Cancelled"
                        ? "text-red-500"
                        : "text-orange-400"
                    }`}
                  >
                    {delivery.status}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
