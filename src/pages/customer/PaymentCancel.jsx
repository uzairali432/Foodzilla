import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Your payment was cancelled.");

  useEffect(() => {
    const markCancelled = async () => {
      const orderId = searchParams.get("order_id");
      if (!orderId) {
        return;
      }

      try {
        const token = localStorage.getItem("token");
        await fetch("/api/orders/cancel-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ orderId }),
        });
      } catch {
        setMessage("Payment was cancelled. We could not update the order status right now.");
      }
    };

    markCancelled();
  }, [searchParams]);

  return (
    <div className="max-w-xl mx-auto my-16 p-8 border rounded-2xl shadow bg-white text-center">
      <h1 className="text-3xl font-bold text-[#0E2A45] mb-4">Payment Cancelled</h1>
      <p className="text-gray-700">{message}</p>
      <button
        onClick={() => navigate("/cart")}
        className="mt-6 px-6 py-3 rounded-lg text-white font-semibold bg-[#0E2A45] hover:bg-[#E64D21] transition"
      >
        Return to Cart
      </button>
    </div>
  );
};

export default PaymentCancel;
