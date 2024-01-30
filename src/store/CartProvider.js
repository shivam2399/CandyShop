import React, { useEffect, useState } from "react";
import CartContext from "./cart-context";

const CartProvider = props => {
    const [items, setItems] = useState([]);

    useEffect(() => {
      const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setItems(storedItems);
    }, []);

    const addToCart = (item) => {
        const existingIndex = items.findIndex((existingItem) => existingItem.name === item.name);
    
        if (existingIndex !== -1) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += item.quantity;
          setItems(updatedItems);
        } else {
          setItems((prevItems) => [...prevItems, item]);
        }
        localStorage.setItem("cartItems", JSON.stringify(items));
      };

    const cartContext = {
        cartItems: items,
        addToCart: addToCart
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;