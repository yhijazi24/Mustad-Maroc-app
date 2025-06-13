import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./css/products.css";
import { publicRequest } from '../../requestMethods';

const Products = () => {
  const location = useLocation();
  const [ProductCard, setProductCard] = useState([]);

  useEffect(() => {
    const fetchProductCard = async () => {
      try {
        const res = await publicRequest.get("/product-card");
        setProductCard(res.data);
      } catch (err) {
        console.error("Failed to fetch brands:", err);
      }
    };
    fetchProductCard();
  }, []);
  useEffect(() => {
    if (location.state?.scrollToProducts) {
      const productsElement = document.getElementById('Products');
      if (productsElement) {
        productsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className='products-container' id='Products'>
      <div className='products-wrapper'>
        <h1 className='products-title'>OUR PRODUCTS</h1>
        <div className='products-grid'>
          {ProductCard.map(item => (
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

