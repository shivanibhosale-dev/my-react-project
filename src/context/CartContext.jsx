import { createContext, useState, useContext } from "react";
import { getProductById } from "../data/products";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);

    function addToCart(productId) {

        const existing = cartItems.find(
            (item) => item.id === productId
        );

        if (existing) {

            const updatedCartItems = cartItems.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            );

            setCartItems(updatedCartItems);

        } else {

            setCartItems([
                ...cartItems,
                {
                    id: productId,
                    quantity: 1
                }
            ]);
        }
    }

    function decreaseQuantity(productId) {

        const updatedCartItems = cartItems
            .map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    : item
            )
            .filter((item) => item.quantity > 0);

        setCartItems(updatedCartItems);
    }

    function removeFromCart(productId) {

        const updatedCartItems = cartItems.filter(
            (item) => item.id !== productId
        );

        setCartItems(updatedCartItems);
    }

    function getCartItemsWithProducts() {

        return cartItems
            .map((item) => ({
                ...item,
                product: getProductById(item.id)
            }))
            .filter((item) => item.product);
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                decreaseQuantity,
                removeFromCart,
                getCartItemsWithProducts
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    return context;
}