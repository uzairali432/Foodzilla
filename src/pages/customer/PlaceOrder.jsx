import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { deliveryFee } from "./Cart";
import { useOrderContext } from "../../components/hooks/useOrder";

const PlaceOrder = () => {
  const { getTotalCartAmount, clearCart } = useContext(StoreContext);
  const { state, dispatch } = useOrderContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "UPDATE_FIELD",
      payload: {
        name: e.target.name,
        value: e.target.value
      }
    });

  };

const handleSubmit = (e) => {
  e.preventDefault();

  const newDelivery = {
    id: `D-${Math.floor(Math.random() * 1000)}`,
    customer: `${state.FirstName} ${state.LastName}`,
    address: `${state.Street}, ${state.City}`,
    status: "On the way",
  };

  console.log("Dispatching new delivery:", newDelivery);
  dispatch({ type: "ADD_DELIVERY", payload: newDelivery });

  alert("Order placed successfully!");
  dispatch({type : "RESET_ORDER"})
  navigate("/");
  clearCart();


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
              disabled={getTotalCartAmount() === 0}
              className={`mt-6 w-full py-3 rounded-lg text-white font-semibold transition duration-300 ${getTotalCartAmount() === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0E2A45] hover:bg-[#E64D21]"
                }`}
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
