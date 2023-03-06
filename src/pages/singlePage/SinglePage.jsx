import React from 'react'
import { useParams } from 'react-router-dom'
import SinglePageProduct from '../../components/SinglePageProduct';
import "./singlePage.css"
import { useContext } from 'react';
import { MainState } from '../../App';


function SinglePage() {
    const {index} = useParams();
    const {id} = useParams();
    const productArr = useContext(MainState)
    const numIndex = +index;
    const [product, setProduct] = React.useState(productArr);
    React.useEffect(() => {
        setProduct(() => productArr.filter(obj => obj.id === id))
    }, [id, product])

    
    const {name, description, features, category, subcategory, images, price} = product[0];

    
  return (
    <section>
        {<SinglePageProduct name={name} index={index} description={description} features={features} category={category} subcategory={subcategory} images={images} price={price} id={id}/>}
    </section>
    
  )
}

export default SinglePage