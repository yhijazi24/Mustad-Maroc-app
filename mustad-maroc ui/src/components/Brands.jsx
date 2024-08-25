import React from 'react';
import "./css/brands.css";
import { brandsList } from '../..';

const Brands = () => {
  return (
    <div className='brands-container'>
      <div className='brands-wrapper'>
        {brandsList.map(item => (
          <div key={item.id} className='brands-home-imgs'>
            <img
              src={item.img}
              className='brands-home-img'
              alt="logo brand"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brands;

