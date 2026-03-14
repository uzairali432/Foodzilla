import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { deliveryFee } from "./Cart";
import { useOrderContext } from "../../components/hooks/useOrder";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, food_list } = useContext(StoreContext);
  const { state, dispatch } = useOrderContext();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: {
        name: e.target.name,
        value: e.target.value
      }
    });

  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setOrderError("");

  // Build items array from cart
  const items = Object.entries(cartItems)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => {
      const product = food_list.find((p) => p._id === id);
      return {
        product: id,
        name: product?.name || "Unknown",
        quantity: qty,
        price: product?.price || 0,
      };
    });

  if (items.length === 0) {
    setOrderError("Your cart is empty.");
    return;
  }

  const deliveryAddress = `${state.Street}, ${state.City}, ${state.State} ${state.Zip}, ${state.Country}`;
  const totalAmount = getTotalCartAmount() + deliveryFee;

  try {
    setSubmitting(true);
    const token = localStorage.getItem("token");
    const resp = await fetch("/api/orders/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ items, deliveryAddress, totalAmount }),
    });
    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(data.message || "Failed to start Stripe checkout");
    }

    if (!data.checkoutUrl) {
      throw new Error("Stripe checkout URL is missing");
    }

    window.location.assign(data.checkoutUrl);
  } catch (err) {
    setOrderError(err.message);
  } finally {
    setSubmitting(false);
  }
};




  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/cart")}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg shadow-sm transition"
      >
        ⬅️ Go Back to Cart Page
      </button>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        {/* Left - Delivery Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Delivery Information
          </h2>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              name="FirstName"
              value={state.FirstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="LastName"
              value={state.LastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            name="Email"
            value={state.Email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Street"
            name="Street"
            value={state.Street}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="City"
              name="City"
              value={state.City}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="State"
              name="State"
              value={state.State}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Zip Code"
              name="Zip"
              value={state.Zip}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Country"
              name="Country"
              value={state.Country}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <input
            type="number"
            placeholder="Phone"
            name="Phone"
            value={state.Phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Right - Cart Summary */}
        <div className="w-full mt-12">
          <div className="p-6 border rounded-2xl shadow-lg bg-white">
            <h2 className="text-2xl font-semibold mb-4">Cart Total</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : deliveryFee}</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <p>Total</p>
                <p>
                  $
                  {getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + deliveryFee}
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={getTotalCartAmount() === 0 || submitting}
              className={`mt-6 w-full py-3 rounded-lg text-white font-semibold transition duration-300 ${getTotalCartAmount() === 0 || submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0E2A45] hover:bg-[#E64D21]"
                }`}
            >
              {submitting ? "Placing Order..." : "PROCEED TO PAYMENT"}
            </button>
            {orderError && (
              <p className="mt-3 text-red-500 text-sm text-center">{orderError}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
