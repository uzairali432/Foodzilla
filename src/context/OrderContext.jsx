import { createContext, useReducer, useEffect } from "react";
import OrderReducer from "../reducer/OrderReducer";

const initialOrderDetails = {
  FirstName: "",
  LastName: "",
  Email: "",
  Street: "",
  City: "",
  State: "",
  Zip: "",
  Country: "",
  Phone: "",
  deliveries: JSON.parse(localStorage.getItem("deliveries")) || [],
};

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, initialOrderDetails);

  useEffect(() => {
    localStorage.setItem("deliveries", JSON.stringify(state.deliveries));
  }, [state.deliveries]);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
