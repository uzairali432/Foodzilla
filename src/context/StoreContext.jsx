import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [food_list, setFoodList] = useState([]);

  // load products from server once on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const resp = await fetch('/api/products');
        const data = await resp.json();
        setFoodList(data);
      } catch (err) {
        console.error('Failed to load products', err);
      }
    };
    loadProducts();
  }, []);

  const [cartItems, setCartItems] = useState({});

  // whenever the list changes, keep a local copy too (optional)
  useEffect(() => {
    localStorage.setItem('food_products', JSON.stringify(food_list));
  }, [food_list]);

  const addProduct = async (product) => {
    try {
      const token = localStorage.getItem('token');
      const resp = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(product),
      });
      const created = await resp.json();
      setFoodList((prev) => [...prev, created]);
      return created;
    } catch (err) {
      console.error('Add product failed', err);
    }
  };

  const updateProduct = async (productId, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const resp = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(updatedData),
      });
      const updated = await resp.json();
      setFoodList((prev) =>
        prev.map((product) =>
          product._id === productId ? updated : product
        )
      );
      return updated;
    } catch (err) {
      console.error('Update product failed', err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      setFoodList((prev) => prev.filter((product) => product._id !== productId));
    } catch (err) {
      console.error('Delete product failed', err);
    }
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