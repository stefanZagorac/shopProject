import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../pages/cart/CartContext'
import "../pages/cart/cart.css"

function CartProduct({id, quantity}) {
    const cart = useContext(CartContext);
    const itemData = cart.getItemData(id)
  return (
    <div className="cart__items__div">
        <h3>{itemData.name}</h3>
        <p>{`Quantity: ${quantity}`}</p>
        <p>{`Price: ${(quantity * itemData.price).toFixed(2)}`}</p>
        <button className="btn" onClick={() => cart.deleteFromCart(id)}>Remove</button>
    </div>
  )
}

export default CartProduct