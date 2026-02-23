import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "./FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div
      className="max-w-[1200px] mx-auto px-6 mt-12"
      id="food-display"
    >
      {/* Heading */}
      <h2 className="text-[max(2vw,24px)] font-semibold">
        Top Dishes Near You
      </h2>

      {/* Grid List */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-[30px] gap-y-[50px] mt-8">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;