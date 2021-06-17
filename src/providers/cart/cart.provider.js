import React, {createContext, useState, useEffect} from 'react';

import {addItemToCart, removeItemFromCart, filterItemFromCart, getCartItemsCount, getCartTotal } from './cart.utils2';

export const CartContext =  createContext({
    hidden: true,
    toggleHidden: () => {},
    cartItems:[],
    addItem: () => {},
    removeItem: () => {},
    clearItemFromCart: () => {},
    cartItemsCount: 0,
    cartTotal : 0
});


const CartProvider = ({children}) => {


    const [ hidden , setHidden ] = useState(true)
    const [ cartItems, setCartItems] = useState([])
    const [ cartItemsCount, setCartItemsCount] = useState(0)
    const [ cartTotal, setCartTotal] = useState(0)

    const addItem = item => setCartItems(addItemToCart(cartItems,item))
    const removeItem = item => setCartItems(removeItemFromCart(cartItems,item))
    const clearItemFromCart = item => setCartItems(filterItemFromCart(cartItems,item))

    const toogleHidden = () => setHidden(!hidden)

    useEffect(() =>{ 
        setCartItemsCount(getCartItemsCount(cartItems))
        setCartTotal(getCartTotal(cartItems))
    },[cartItems])
  
    

    return(
        <CartContext.Provider value={{
            hidden, 
            toogleHidden, 
            cartItems,  
            addItem, 
            removeItem,
            clearItemFromCart,
            cartTotal,
            cartItemsCount}}>

                {children}

        </CartContext.Provider>
    )
}

export default CartProvider