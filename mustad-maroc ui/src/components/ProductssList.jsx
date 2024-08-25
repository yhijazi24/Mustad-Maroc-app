import React from 'react'
import "./css/productsslist.css"
import { filterOptions, headerProducts } from '../..';


const ProductssList = () => {
  const options = filterOptions[0];
  const applications = options.Applications;
  const terrains = options.Terrain;
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
            <option value=''className='filter-option'>Terrain</option>
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
    </div>
  );
};

export default ProductssList
