import React, { useState } from 'react'
import Product from '../../components/Product';
import "./products.css"
import { useContext } from 'react';
import { MainState } from '../../App';

const Products = () => {
  const productArr = useContext(MainState);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('all'); // default category is 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const sortedProducts = [...productArr].sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
  const filteredProductsByCategory = selectedCategory === 'all' ? sortedProducts : sortedProducts.filter(product => product.category === selectedCategory);
  const filteredProductsByName = searchQuery === '' ? filteredProductsByCategory : filteredProductsByCategory.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleSortOrder = () => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  
  const handleCategoryChange = category => setSelectedCategory(category);

  const handleSearchQueryChange = event => setSearchQuery(event.target.value);
  
  return (
    <section>
      <div className="container products__container">
        <div className="filter__btns">
          <h2>Filter:</h2>
          <button className="btn" onClick={() => handleCategoryChange('all')}>All</button>
          <button className="btn" onClick={() => handleCategoryChange('bags')}>Bags</button>
          <button className="btn" onClick={() => handleCategoryChange('apparel')}>Apparel</button>
          <button className="btn" onClick={() => handleCategoryChange('accessories')}>Accessories</button>
          <button className="btn" onClick={() => handleCategoryChange('drinkware')}>Drinkware</button>
          <button className="btn" onClick={() => handleCategoryChange('office')}>Office</button>
          <button className="btn" onClick={() => handleCategoryChange('shop by brand')}>ShopByBrand</button>
        </div>

        <hr />

        <div className="search__sort__div">
        <input type="text" placeholder="Search by name" value={searchQuery} onChange={handleSearchQueryChange}/>
        <button className="btn" onClick={toggleSortOrder}>Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}</button>
        </div>

        <hr />

        <div className="products__wrapper">
          {filteredProductsByName.map((obj, index) => {
            return <Product key={obj.id} index={index} name={obj.name} images={obj.images} price={obj.price} id={obj.id}/>
          })}
        </div>
      </div>
    </section>
  )
}

export default Products
