import React, { useState } from 'react';
import "./css/productsslist.css";
import { filterOptions, headerProducts, productLists } from '../..';

const ProductssList = () => {
  const options = filterOptions[0];
  const applications = options.Applications;
  const terrains = options.Terrain;

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const totalPages = Math.ceil(productLists.length / productsPerPage);

  const currentProducts = productLists.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='list-container'>
      {headerProducts.map(item => (
        <div key={item.id} className='list-header'>
          <img src={item.img} className='list-header-img' alt='item image' />
          <h1 className='list-title'>{item.title}</h1>
        </div>
      ))}

      <div className='list-filter'>
        <div className='filter-group'>
          <select id='applications' name='applications' className='filter'>
            <option value='' className='filter-option'>Application</option>
            {applications.map(option => (
              <option className='filter-option' key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className='filter-group'>
          <select id='terrain' name='terrain' className='filter'>
            <option value='' className='filter-option'>Terrain</option>
            {terrains.map(option => (
              <option className='filter-option' key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className='filter-group'>
          <select id='availability' name='availability' className='filter'>
            <option className='filter-option' value='' >Availability</option>
            <option className='filter-option' value='available'>Available</option>
            <option className='filter-option' value='out-of-stock'>Out of Stock</option>
          </select>
        </div>
      </div>

      <div className='list-products'>
        {currentProducts.map(item => (
          <div className='list-product' key={item.id}>
            <div className='list-product-img'>
              <img src={item.img} className='product-img' alt='product image' />
            </div>
            <div className='product-info'>
              <div className='product-title'>
                <div className='product-info-title-desc'>
                  <h2 className='product-info-title'>{item.title}</h2>
                  <p className='product-info-desc'>{item.desc}</p>
                </div>
                <h3 className='product-info-availability'>{item.availability}</h3>
              </div>
              <div className='product-info-filter'>
                <p className='product-info-terrain'>
                  <span className='filter-title'>Terrain: </span>
                  {item.terrain.map((terrain, index) => (
                    <span key={index}>
                      {terrain}
                      {index < item.terrain.length - 1 && " | "}
                    </span>
                  ))}
                </p>
                <p className='product-info-activity'>
                  <span className='filter-title'>Activity: </span>
                  {item.activity.slice(0, 5).map((activity, index) => (
                    <span key={index}>
                      {activity}
                      {index < 4 && " | "} 
                    </span>
                  ))}
                  {item.activity.length > 5 && <span>...</span>}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className='pagination'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductssList;
