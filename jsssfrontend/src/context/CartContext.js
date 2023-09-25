import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  console.log(cart);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    console.log(existingCartItem);
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hooks

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
