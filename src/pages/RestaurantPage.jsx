import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FoodDisplay from "./customer/FoodDisplay";
import ReviewSection from "../components/common/ReviewSection";

const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const res = await fetch(`/api/restaurants/${id}/products`);
        const products = await res.json();
        setMenu(products);
      } catch (err) {
        console.error('Failed to load restaurant menu', err);
      }
    };
    loadDetails();

    const loadInfo = async () => {
      try {
        const res = await fetch(`/api/restaurants/${id}`);
        const rest = await res.json();
        setRestaurant(rest);
      } catch (err) {
        console.error('Failed to fetch restaurant info', err);
      }
    };
    loadInfo();
  }, [id]);

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2">{restaurant.restaurantName || restaurant.name}</h2>
      {restaurant.restaurantAddress && (
        <p className="text-sm text-gray-600 mb-4">{restaurant.restaurantAddress}</p>
      )}
      <div>
        <h3 className="text-xl font-semibold mb-2">Menu</h3>
        {menu.length === 0 ? (
          <p>No items available</p>
        ) : (
          <FoodDisplay items={menu} title="Menu" />
        )}
      </div>

      {restaurant && (
        <ReviewSection
          entityId={id}
          entityType="restaurants"
          initialReviews={restaurant.reviews || []}
          initialRating={restaurant.rating || 0}
          initialNumReviews={restaurant.numReviews || 0}
        />
      )}
    </div>
  );
};

export default RestaurantPage;
