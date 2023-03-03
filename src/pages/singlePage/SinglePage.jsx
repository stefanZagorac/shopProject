import React from 'react'
import { useParams } from 'react-router-dom'
import SinglePageProduct from '../../components/SinglePageProduct';
import "./singlePage.css"
import { useContext } from 'react';
import { MainState } from '../../App';


function SinglePage() {
    const {index} = useParams();
    const productArr = useContext(MainState)
    const numIndex = +index;
    const [product, setProduct] = React.useState(JSON.parse(localStorage.getItem("product")) || productArr[numIndex]);
    React.useEffect(() => {
        setProduct(() => productArr[numIndex])
        localStorage.setItem("product", JSON.stringify(product))
    }, [numIndex, product])

    
    const {name, description, features, category, subcategory, images, price, id} = product;

    
  return (
    <section>
        {<SinglePageProduct name={name} index={index} description={description} features={features} category={category} subcategory={subcategory} images={images} price={price} id={id}/>}
    </section>
    
  )
}

export default SinglePage