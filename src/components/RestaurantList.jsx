import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/restaurants');
        const data = await res.json();
        setRestaurants(data);
      } catch (err) {
        console.error('Failed to load restaurants', err);
      }
    };
    load();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Restaurants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {restaurants.map((rest) => (
          <div
            key={rest._id}
            className="border rounded-lg p-4 hover:shadow cursor-pointer"
            onClick={() => navigate(`/restaurant/${rest._id}`)}
          >
            <h3 className="font-bold text-lg">{rest.restaurantName || rest.name}</h3>
            {rest.restaurantAddress && (
              <p className="text-sm text-gray-600">{rest.restaurantAddress}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
