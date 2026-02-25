import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../pages/customer/Header";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const restRes = await fetch(`/api/restaurants`);
        const all = await restRes.json();
        const found = all.find((r) => r._id === id);
        setRestaurant(found);

        const prodRes = await fetch(`/api/restaurants/${id}/products`);
        const items = await prodRes.json();
        setProducts(items);
      } catch (err) {
        console.error('Error fetching restaurant data', err);
      }
    };
    load();
  }, [id]);

  if (!restaurant) {
    return <div>Loading restaurant...</div>;
  }

  return (
    <div>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">
          {restaurant.restaurantName || restaurant.name}
        </h1>
        {restaurant.restaurantAddress && (
          <p className="mb-4 text-gray-600">{restaurant.restaurantAddress}</p>
        )}
        <h2 className="text-xl font-semibold mb-2">Menu</h2>
        {products.length === 0 && <p>No items available.</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((item) => (
            <div key={item._id} className="border rounded p-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover mb-2"
              />
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm">${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
