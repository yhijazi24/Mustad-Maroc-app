import React, { useEffect, useState } from 'react';
import "./css/brands.css";
import { publicRequest } from '../../requestMethods';


const Brands = () => {
    const [Brands, setBrands] = useState([]);
  
    useEffect(() => {
      const fetchBrands = async () => {
        try {
          const res = await publicRequest.get("/brands");
          setBrands(res.data);
        } catch (err) {
          console.error("Failed to fetch brands:", err);
        }
      };
      fetchBrands();
    }, []);
  
  return (
    <div className='brands-container'>
      <div className='brands-wrapper'>
        {Brands.map(item => (
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

