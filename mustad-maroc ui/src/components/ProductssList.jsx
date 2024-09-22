import React, { useEffect, useState } from 'react';
import "./css/productsslist.css";
import { filterOptions, headerProducts, productLists } from '../..';
import { useLocation } from 'react-router-dom';
import axios from "axios";

const ProductssList = () => {
  const options = filterOptions[0];
  const activity = options.Activity;
  const terrains = options.Terrain;

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const location = useLocation();
  const type = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});

  const handleFilters = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products?type=${type}`);
        console.log(res);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, [type]);

  useEffect(() => {
    if (Array.isArray(products) && type) {
      setFilteredProducts(
        products.filter(item =>
          Object.entries(filters).every(([key, value]) =>
            item[key] && (Array.isArray(item[key]) ? item[key].includes(value) : item[key] === value)
          )
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, type, filters]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [header, setHeader] = useState({});

  useEffect(() => {
    const getHeader = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/header?type=${type}`);
        setHeader(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getHeader();
  }, [type]);

  return (
    <div className='list-container'>
        <div key={header.id} className='list-header'>
          <img src={header.img} className='list-header-img' alt='item image' />
          <h1 className='list-title'>{header.title}</h1>
        </div>

      <div className='list-filter'>
        <div className='filter-group'>
          <select id='activity' name='activity' className='filter' onChange={handleFilters} value={filters.activity || ''}>
            <option value='' className='filter-option'>Activity</option>
            {activity.map(option => (
              <option className='filter-option' key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className='filter-group'>
          <select id='terrain' name='terrain' className='filter' onChange={handleFilters} value={filters.terrain || ''}>
            <option value='' className='filter-option'>Terrain</option>
            {terrains.map(option => (
              <option className='filter-option' key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className='filter-group'>
          <select id='availability' name='availability' className='filter' onChange={handleFilters} value={filters.availability || ''}>
            <option className='filter-option' value='' >Availability</option>
            <option className='filter-option' value='available'>Available</option>
            <option className='filter-option' value='out-of-stock'>Out of Stock</option>
          </select>
        </div>

        <button className='reset-filters' onClick={handleResetFilters}>Reset Filters</button>
      </div>

      <div className='list-products'>
        {currentProducts.map(item => (
          <a href={`/product/${item._id}`} className='list-product' key={item.id}>
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
          </a>
        ))}

        {totalPages > 1 && (
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
        )}
      </div>
    </div>
  );
};

export default ProductssList;
