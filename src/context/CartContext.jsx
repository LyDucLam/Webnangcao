import React, {createContext, useState, useContext, Children} from "react";
const CartContext = createContext();
export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) => item.id === product.id ? {...item, quantity:item.quantity + 1}:item);
            }
            return [...prevCart, {...product, quantity:1}];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, totalItems, totalAmount}}>
         {children}
        </CartContext.Provider>
    );
};
export const useCart = () => useContext(CartContext);