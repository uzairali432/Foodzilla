import { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";

export const useOrderContext = () => useContext(OrderContext);
