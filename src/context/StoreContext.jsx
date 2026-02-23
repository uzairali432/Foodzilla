import { createContext, useState, useEffect } from "react";
import { food_list as initialFoodList } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [food_list, setFoodList] = useState(() => {
    const savedProducts = localStorage.getItem('food_products');
    if (savedProducts) {
      return JSON.parse(savedProducts);
    }
    localStorage.setItem('food_products', JSON.stringify(initialFoodList));
    return initialFoodList;
  });

  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    localStorage.setItem('food_products', JSON.stringify(food_list));
  }, [food_list]);

  const addProduct = (product) => {
  let lastId = 0;
  if (food_list.length > 0) {
    lastId = Math.max(
      ...food_list.map((p) => {
        const idNum = parseInt(p._id); 
        return isNaN(idNum) ? 0 : idNum;
      })
    );
  }

  const newProduct = {
    ...product,
    _id: (lastId + 1).toString(), 
    createdAt: new Date().toISOString(),
  };

  setFoodList((prev) => [...prev, newProduct]);
  return newProduct;
};

  const updateProduct = (productId, updatedData) => {
    setFoodList((prev) =>
      prev.map((product) =>
        product._id === productId ? { ...product, ...updatedData } : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setFoodList((prev) => prev.filter((product) => product._id !== productId));
  };

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    if (cartItems[itemId] === 1) {
      const newCartItems = { ...cartItems };
      delete newCartItems[itemId];
      setCartItems(newCartItems);
    } else if (cartItems[itemId] > 1) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };

    const clearCart = () => {
    setCartItems({});
  };

  const getTotalQuantity = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const product = food_list.find((food) => food._id === itemId);
      if (product) {
        totalAmount += product.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalQuantity,
    getTotalCartAmount,
    addProduct,
    updateProduct,
    deleteProduct,
    setFoodList, 
    clearCart
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;