import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useOrderContext } from "../../components/hooks/useOrder";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useContext(StoreContext);
  const { dispatch } = useOrderContext();

  const [message, setMessage] = useState("Verifying your Stripe payment...");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const confirmPayment = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        setError("Missing Stripe session id.");
        setDone(true);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const resp = await fetch("/api/orders/confirm-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await resp.json();
        if (!resp.ok) {
          throw new Error(data.message || "Failed to confirm payment");
        }

        clearCart();
        dispatch({ type: "RESET_ORDER" });
        setMessage(`Payment successful! Your order ${data.orderNumber} is confirmed.`);
      } catch (err) {
        setError(err.message || "Unable to confirm payment.");
      } finally {
        setDone(true);
      }
    };

    confirmPayment();
  }, [searchParams, clearCart, dispatch]);

  return (
    <div className="max-w-xl mx-auto my-16 p-8 border rounded-2xl shadow bg-white text-center">
      <h1 className="text-3xl font-bold text-[#0E2A45] mb-4">Payment Status</h1>
      {!error && <p className="text-gray-700">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      {done && (
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 rounded-lg text-white font-semibold bg-[#0E2A45] hover:bg-[#E64D21] transition"
        >
          Back to Home
        </button>
      )}
    </div>
  );
};

export default PaymentSuccess;
