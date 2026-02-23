import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { Modal, Box, Typography, Button } from "@mui/material";

export const deliveryFee = 2;

const Cart = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    getTotalQuantity,
  } = useContext(StoreContext);

  const totalQuantity = getTotalQuantity();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleCheckout = () => {
    if (!user) {
      handleOpen();
    } else {
      navigate("/order");
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 380,
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  return (
    <div className="p-6 mt-20">
      <div className="w-full overflow-x-auto flex flex-col justify-center border rounded-xl shadow-md bg-white p-6">
        <div className="grid grid-cols-[1.2fr_2fr_1fr_1fr_1fr_1fr] font-semibold text-gray-700 border-b pb-3 mb-3 text-center justify-items-center">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        {totalQuantity === 0 ? (
          <p className="text-center text-gray-500 py-6">No Items in cart</p>
        ) : (
          food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <React.Fragment key={item._id}>
                  <div className="grid grid-cols-[1.2fr_2fr_1fr_1fr_1fr_1fr] items-center justify-items-center text-center text-gray-700 py-3 border-b hover:bg-gray-50 transition">
                    {/* Image */}
                    <img
                      src={item.image}
                      alt="food img"
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    {/* Name */}
                    <p className="font-medium">{item.name}</p>

                    {/* Price */}
                    <p>${item.price}</p>

                    {/* Quantity */}
                    <p>{cartItems[item._id]}</p>

                    {/* Total */}
                    <p className="font-semibold">
                      ${item.price * cartItems[item._id]}
                    </p>

                    {/* Remove Button */}
                    <button
                      className="text-red-500 hover:text-red-700 flex items-center justify-center"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <img
                        src={assets.remove_icon_cross}
                        alt="remove"
                        className="w-6 h-6 bg-red-100 rounded-full p-1"
                      />
                    </button>
                  </div>
                </React.Fragment>
              );
            }
            return null;
          })
        )}
      </div>

      {/* Cart Bottom Section */}
      <div className="mt-8 flex flex-col lg:flex-row gap-10">
        {/* Cart Total */}
        <div className="flex-1 p-6 border rounded-2xl shadow-md bg-white">
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

          <div className="flex justify-center mt-8">
            <button
              disabled={getTotalCartAmount() === 0}
              onClick={handleCheckout}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${getTotalCartAmount() !== 0
                ? "bg-[#0E2A45] hover:bg-[#E64D21] shadow-md hover:shadow-lg"
                : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>

        {/* Promo Code */}
        <div className="lg:w-1/3 p-6 border rounded-2xl shadow-md bg-white">
          <p className="mb-3 text-gray-700">
            If you have a promocode, enter it here:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Promo Code"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
            />
            <button className="px-4 py-2 font-semibold border rounded-lg text-white bg-[#0E2A45] hover:bg-[#E64D21] transition duration-300 ">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* MUI Sign-Up Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="signup-modal-title"
        aria-describedby="signup-modal-description"
      >
        <Box sx={style}>

          <Typography
            id="signup-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "#0E2A45", fontWeight: 600, mb: 1 }}
          >
            Please Sign Up
          </Typography>
          <Typography
            id="signup-modal-description"
            sx={{ mt: 1, color: "text.secondary", mb: 3 }}
          >
            You need to sign up or log in before proceeding to checkout.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate("/CustomerSignUp")}
              sx={{
                backgroundColor: "#E64D21",
                "&:hover": { backgroundColor: "#0E2A45" },
                borderRadius: "10px",
                px: 3,
              }}
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                color: "#0E2A45",
                borderColor: "#0E2A45",
                "&:hover": { backgroundColor: "#0E2A45", color: "#fff" },
                borderRadius: "10px",
                px: 3,
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
