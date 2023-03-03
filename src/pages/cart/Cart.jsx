import React from 'react'
import { useContext } from 'react';
import {CartContext} from './CartContext'
import CartProduct from '../../components/CartProduct';
import "./cart.css"

function Cart() {
  const cart = useContext(CartContext);
  const itemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section>
      <div className={itemsCount > 0 ? "container cart__container" : "container container__empty"}>
        {itemsCount > 0 && <h2>Cart items</h2>}
        <div className="cart__wrapper">
          {itemsCount > 0 ?
            <div>
              {cart.items.map((item, index) => (
                  <CartProduct key={index} id={item.id} quantity={item.quantity}/>
              ))}
              <div className="total__cost__div"><h2>Total cost: {cart.getTotalCost()}</h2></div>
            </div>
           : <h2>There are no items in the cart.</h2>}
        </div>
      </div>
    </section>
  )
}

export default Cart