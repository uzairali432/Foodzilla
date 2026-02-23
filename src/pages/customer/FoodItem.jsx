import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="w-full mx-auto rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(255,99,71,0.45)] transition duration-300 animate-fadeIn flex flex-col">
      {/* Image + Add/Remove Buttons */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={name}
          className="w-full h-[220px] object-cover rounded-t-2xl transition-transform duration-500 ease-in-out hover:scale-110"
        />

        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            alt="add"
            className="w-[35px] absolute bottom-4 right-4 cursor-pointer rounded-full shadow-md"
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 px-2 py-1 rounded-full bg-white shadow">
            <img
              src={assets.remove_icon_red}
              alt="remove"
              className="w-[28px] cursor-pointer"
              onClick={() => removeFromCart(id)}
            />
            <p className="min-w-[20px] text-center text-sm">{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt="add"
              className="w-[28px] cursor-pointer"
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex justify-between items-baseline mb-2">
          <p className="text-lg font-medium text-gray-900 line-clamp-1">{name}</p>
          <img src={assets.rating_starts} alt="rating" className="w-[75px]" />
        </div>

        <p className="text-sm text-gray-500 text-justify mt-1 flex-1 line-clamp-3">{description}</p>

        <p className="text-xl font-semibold text-primary mt-3">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
