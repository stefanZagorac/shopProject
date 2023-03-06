import React from 'react'
import "./product.css"
import {Link} from "react-router-dom"
import { CartContext } from "../pages/cart/CartContext"
import { useContext } from 'react';
import NoImg from "../images/no-image.png"

function Product({ name, images, price, index, id }) {
  const [image, setImage] = React.useState("");
  const [storageImage, setStorageImage] = React.useState("");
  const cart = useContext(CartContext);
  const itemQuantity = cart.getItemQuantity(id)
  

  const fetchImage = (url) => { //fetching picture from the source on every component render because we want different picture on every product
    fetch(url)
      .then((res) => res.blob())
      .then((data) => {
        if(images){
          const key = id.toString();
          const mimeType = data.type; // get the MIME type from the fetched data
          const blob = new Blob([data], { type: mimeType }); // create a Blob object with the correct MIME type
          localStorage.setItem(key, URL.createObjectURL(blob)); // store the image data in local storage so we can hold our pictures while changing pages
          setImage(URL.createObjectURL(blob));
        }
        
      })
      .catch((error) => console.error(error));
  };

  React.useEffect(() => {
    const imageUrl = "https://picsum.photos/640/360";
    const existingImage = localStorage.getItem(id);
    if (!existingImage) {
      fetchImage(imageUrl);
    } else {
      setStorageImage(existingImage); // set the existing image data from local storage
    }
  }, [id]);

  return (
      <div className="product__div">
        <Link to={`/product/${id}`}>
        {images && <img src={storageImage || image} alt="Product image" />} {/* use the stored image data if available */}
        {!images && <img src={NoImg} alt="No image" />}
        </Link>
        <h5>{name}</h5>
        <p>{price}</p>
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
  );
}

export default Product;

