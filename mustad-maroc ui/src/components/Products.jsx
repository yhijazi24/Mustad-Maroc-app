import React from 'react';
import { Link } from 'react-router-dom';
import "./css/products.css";
import { productsCardItems } from '../../index';

const Products = () => {
  return (
    <div className='products-container'>
      <div className='products-wrapper'>
        <h1 className='products-title'>OUR PRODUCTS</h1>
        <div className='products-grid'>
          {productsCardItems.map(item => (
              <div key={item.id} className={`products-card ${item.className}`} id={`card-${item.id}`}>
                <div className='products-card-img'>
                  <img src={item.img} id={`img-${item.id}-card`} className='card-img' alt='img' />
                </div>
                <div className='products-card-info'>
                  <h3 className='card-info-title'>{item.title}</h3>
                  <div className='card-button-wrapper'>
                    <Link to={`/products/${item.type}`}className='products-card-button'>SHOP NOW</Link>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>

    </div >
  )
}
export default Products;

