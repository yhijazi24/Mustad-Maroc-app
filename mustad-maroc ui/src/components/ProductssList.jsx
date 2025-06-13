import React, { useEffect, useState } from 'react';
import "./css/productsslist.css";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const ProductssList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const location = useLocation();
  const type = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [header, setHeader] = useState({});
  const [activities, setActivities] = useState([]);
  const [terrains, setTerrains] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFilters = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const handleResetFilters = () => {
    setFilters({});
    setSearchTerm("");
  };


  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/${type}`);

        const data = res.data;
        setProducts(data);

        // Extract unique values for filters
        const act = new Set();
        const terr = new Set();
        const avail = new Set();

        data.forEach((item) => {
          item.activity?.forEach((a) => act.add(a));
          item.terrain?.forEach((t) => terr.add(t));
          if (item.availability) avail.add(item.availability);
        });

        setActivities(Array.from(act));
        setTerrains(Array.from(terr));
        setAvailabilities(Array.from(avail));
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, [type]);

  useEffect(() => {
    const filtered = products.filter(item =>
      // Match all filter types
      (!filters.activity || filters.activity.length === 0 || filters.activity.some(a => item.activity?.includes(a))) &&
      (!filters.terrain || filters.terrain.length === 0 || filters.terrain.includes(item.terrain)) &&
      (!filters.availability || filters.availability.length === 0 || filters.availability.includes(item.availability)) &&
      item.title.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  }, [products, filters, searchTerm]);




  useEffect(() => {
    const getHeader = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/header/type/${type}`);
        setHeader(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getHeader();
  }, [type]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='list-container'>
      <div key={header.id} className='list-header'>
        <img src={header.img} className='list-header-img' alt='item image' />
        <h1 className='list-title'>{header.title}</h1>
      </div>

      <div className='list-filter'>
        <div className="filter-group search-bar-wrapper">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-button reset-filters dropdown-toggle"
          />
        </div>
        {/* Activity Filter */}
        <div className="filter-group">
          <div className="dropdown">
            <button type="button" className="reset-filters dropdown-toggle">
              Select Activities
            </button>
            <div className="dropdown-menu">
              {activities.map(option => (
                <label key={option} className="dropdown-item">
                  <input
                    type="checkbox"
                    value={option}
                    checked={filters.activity?.includes(option)}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFilters(prev => {
                        const prevActivity = prev.activity || [];
                        return {
                          ...prev,
                          activity: e.target.checked
                            ? [...prevActivity, value]
                            : prevActivity.filter(a => a !== value)
                        };
                      });
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Terrain Filter */}
        <div className="filter-group">
          <div className="dropdown">
            <button type="button" className="reset-filters dropdown-toggle">
              Select Terrains
            </button>
            <div className="dropdown-menu">
              {terrains.map(option => (
                <label key={option} className="dropdown-item">
                  <input
                    type="checkbox"
                    value={option}
                    checked={filters.terrain?.includes(option)}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFilters(prev => {
                        const prevTerrain = prev.terrain || [];
                        return {
                          ...prev,
                          terrain: e.target.checked
                            ? [...prevTerrain, value]
                            : prevTerrain.filter(t => t !== value)
                        };
                      });
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Availability Filter */}
        <div className="filter-group">
          <div className="dropdown">
            <button type="button" className="reset-filters dropdown-toggle">
              Select Availability
            </button>
            <div className="dropdown-menu">
              {availabilities.map(option => (
                <label key={option} className="dropdown-item">
                  <input
                    type="checkbox"
                    value={option}
                    checked={filters.availability?.includes(option)}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFilters(prev => {
                        const prevAvail = prev.availability || [];
                        return {
                          ...prev,
                          availability: e.target.checked
                            ? [...prevAvail, value]
                            : prevAvail.filter(a => a !== value)
                        };
                      });
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>

        <button className='reset-filters' onClick={handleResetFilters}>Reset Filters</button>
      </div>

      <div className='list-products'>
        {currentProducts.map(item => (
          <a href={`/product/${item.id}`} className='list-product' key={item.id}>
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
                  {(Array.isArray(item.terrain) ? item.terrain : [item.terrain])
                    .filter(Boolean)
                    .map((terrain, index, arr) => (
                      <span key={index}>
                        {terrain}
                        {index < arr.length - 1 && " | "}
                      </span>
                    ))}
                </p>

                <p className='product-info-activity'>
                  <span className='filter-title'>Activity: </span>
                  {(Array.isArray(item.activity) ? item.activity : [item.activity])
                    .filter(Boolean)
                    .slice(0, 5)
                    .map((activity, index, arr) => (
                      <span key={index}>
                        {activity}
                        {index < arr.length - 1 && " | "}
                      </span>
                    ))}
                  {Array.isArray(item.activity) && item.activity.length > 5 && <span>...</span>}
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
