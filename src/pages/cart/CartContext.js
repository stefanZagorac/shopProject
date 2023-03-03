import { createContext } from "react";
import { useContext } from "react";
import { MainState } from "../../App";
import React from 'react'


export const CartContext = createContext({
    items: [],
    getItemData: () => {},
    getItemQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
})

export default function CartProvider({children}){
    const itemsArr = useContext(MainState)
    const [cartItems, setCartItems] = React.useState([]);


    const getItemData = (id) => itemsArr.find(item => item.id === id);

    const getItemQuantity = (id) => {
        const quantity = cartItems.find(item => item.id === id)?.quantity;
        if(quantity === undefined){
            return 0;
        }
        return quantity;
    }

    const addOneToCart = (id) => {
        const quantity = getItemQuantity(id);
        if(quantity === 0) {
            setCartItems([...cartItems,{
                id: id,
                quantity: 1
            }])
        }else{
            setCartItems(cartItems.map(item => item.id === id ? {...item, quantity:item.quantity + 1} : item))
        }
    }

    const removeOneFromCart = (id) => {
        const quantity = getItemQuantity(id);

        if(quantity === 1){
            deleteFromCart(id);
        }else{
            setCartItems(cartItems.map(item => item.id === id ? {...item, quantity:item.quantity - 1} : item))
        }
    }

    const deleteFromCart = (id) => {
        setCartItems(cartItems => cartItems.filter(item => item.id !== id))
    }

    const getTotalCost = () => {
        let totalCost = 0;
        cartItems.map(item => {
            const itemData = getItemData(item.id);
            totalCost += (Number(itemData.price) * item.quantity);
        });
        
        return totalCost.toFixed(2);
    }

    const contextValue = {
        items: cartItems,
        getItemData,
        getItemQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}
