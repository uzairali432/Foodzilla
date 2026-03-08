import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import ReviewSection from "../../components/common/ReviewSection";

const FoodItem = ({ id, name, price, description, image, rating = 0, reviews = [], numReviews = 0 }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [showModal, setShowModal] = useState(false);

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
        <div 
          className="flex justify-between items-baseline mb-2 group cursor-pointer" 
          onClick={() => setShowModal(true)}
        >
          <p className="text-lg font-medium text-gray-900 line-clamp-1 group-hover:text-primary transition">{name}</p>
          <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-sm font-semibold hover:bg-yellow-200 transition" title="Click to see reviews">
            <span>★</span>
            <span>{Number(rating).toFixed(1)}</span>
            <span className="text-xs text-yellow-600">({numReviews})</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 text-justify mt-1 flex-1 line-clamp-3">{description}</p>

        <p className="text-xl font-semibold text-primary mt-3">${price}</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm shadow-2xl">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto relative p-6 animate-fadeIn">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl font-bold bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
            <p className="text-gray-500 mb-4">{description}</p>
            <ReviewSection 
               entityId={id}
               entityType="products"
               initialReviews={reviews || []}
               initialRating={rating || 0}
               initialNumReviews={numReviews || 0}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItem;
