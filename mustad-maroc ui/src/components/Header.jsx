import React, { useEffect, useState } from "react";
import "./css/header.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [header, setHeader] = useState(null);

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const res = await axios.get("http://localhost:5000/header/type/home"); // fetch the "home" type
        setHeader(res.data);
      } catch (err) {
        console.error("Failed to fetch header:", err);
      }
    };
    fetchHeader();
  }, []);

  if (!header) return null;

  return (
    <div className='header-container'>
      <div key={header.id} className='header-wrapper'>
        <div className='header-img-container'>
          <img src={header.img} className='header-img' alt='background' />
        </div>
        <div className='header-info'>
          <div className='header-content'>
            <h1 className='header-title'>{header.title}</h1>
            <p className='header-desc'>{header.desc}</p>
          </div>
          <div className='header-button-wrapper'>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <button className='header-button'>GET IN TOUCH</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
