import React from "react";

const CartContext = React.createContext({
    cartItems: [],
    addToCart: (item, count) => {}
})

export default CartContext;