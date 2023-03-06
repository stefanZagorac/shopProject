import React from 'react'
import "../pages/singlePage/singlePage.css"
import { CartContext } from "../pages/cart/CartContext"
import { useContext } from 'react';
import NoImg from "../images/no-image.png"

const SinglePageProduct = ({name, description, features, category, subcategory, images, price, index, id}) => {

    images = localStorage.getItem(id);
    const cart = useContext(CartContext);
    const itemQuantity = cart.getItemQuantity(id);
       
  return (
    <div className="container singlePage__container">
            <div className="singlePage__wrapper">
            {images && <img src={images} alt="Product image" />}
            {!images && <img src={NoImg} alt="No image" />}
            <div className="product__desctripton">
                <h2>{name}</h2>
                <p>{`Description: ${description}`}</p>
                <p>{`Features:`}</p>
                <ul className='singlePage__ul'>
                    {features.map((str, i) => <li className="single__page__li" key={i}>{str}</li>)}
                </ul>
                <p>{`Category: ${category}`}</p>
                <p>{`Subcategory: ${subcategory}`}</p>
                <p>{`Price: ${price}`}</p>
                {itemQuantity > 0 ?
                  <div className="product__cart__ui">
                      <div className="product__cart__ui__btns">
                      <p>In cart: {itemQuantity}</p>
                      <button className='btn' onClick={() => cart.addOneToCart(id)}>+</button>
                      <button className='btn' onClick={() => cart.removeOneFromCart(id)}>-</button>
                      </div>
                      <button className='btn' onClick={() => cart.deleteFromCart(id)}>Remove from cart</button>
                  </div> 
                  : <button className='btn' onClick={() => cart.addOneToCart(id)}>Add to cart</button>}
            </div>
            </div>
        </div>
  )
}

export default SinglePageProduct