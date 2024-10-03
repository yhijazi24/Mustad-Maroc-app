import React, { useEffect, useState } from 'react';
import "./css/navbar.css";
import { FmdGoodOutlined, MenuSharp, PersonOutlineOutlined, ShoppingCartOutlined, Sledding } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const dropDown = () => {
    const x = document.getElementById("hamburgerMenu");

    if (window.innerWidth < 768) {
      if (x.style.display === "flex" || x.style.display === "") {
        x.style.display = "none";
      } else {
        x.style.display = "flex";
      }
    } else {
      x.style.display = "flex";
    }
  };

  window.addEventListener('resize', () => {
    const x = document.getElementById("hamburgerMenu");
    if (window.innerWidth >= 768) {
      x.style.display = "flex";
    } else {
      if (x.style.display === "flex" || x.style.display === "") {
        x.style.display = "none";
      }
    }
  });
  const handleScrollToMaps = () => {
    const mapsElement = document.getElementById('Maps');
    if (mapsElement) {
      mapsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quantity = useSelector(state => state.cart.quantity);



  return (

    <div className='navbar-container'>
      <div className='logo-container'>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img src='https://www.mustad.com/sites/mustad.com/files/logo/Mustad%E2%80%94logo.svg' className='logo' alt="logo" />
        </Link>
      </div>
      <div className='top-nav' id='hamburgerMenu'>
        <div className='navbar-list'>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className='navbar-menu'>Home</div>
          </Link>
          <div className='navbar-menu dropdown'>

            <span className='navbar-menu-product'>Products</span>
            <div className='navbar-dropdown'>
              <Link to="/products/horseshoes" style={{ textDecoration: 'none' }}>
                <div className='navbar-menu-drop'>Horseshoes</div>
              </Link>
              <Link to="/products/nails" style={{ textDecoration: 'none' }}>
                <div className='navbar-menu-drop'>Horse Nails</div>
              </Link>
              <Link to="/products/rasps" style={{ textDecoration: 'none' }}>
                <div className='navbar-menu-drop'>Rasps</div>
              </Link>
              <Link to="/products/tools" style={{ textDecoration: 'none' }}>
                <div className='navbar-menu-drop'>Tools</div>
              </Link>
              <Link to="/products/care" style={{ textDecoration: 'none' }}>
                <div className='navbar-menu-drop'>Care</div>
              </Link>
            </div>
          </div>
          <Link to="/brands" style={{ textDecoration: 'none' }}>
            <div className='navbar-menu'>Brands</div>
            </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className='navbar-menu'>Contact</div></Link>
        </div>
        <div className='navbar-list-menu'>
          <div className='navbar-icon' onClick={handleScrollToMaps}>
            <FmdGoodOutlined />
          </div>
          <div className='navbar-icon' >
          <Link to="/login" style={{ textDecoration: 'none',    color: 'black' }}>
            <PersonOutlineOutlined />
            </Link>
          </div>
          <Link to="/cart">
            <div className='navbar-icon'>

              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </div>
          </Link>
        </div>
      </div>
      <div className='hamburger-menu' onClick={dropDown}>
        <MenuSharp />
      </div>
    </div>

  )
}

export default Navbar
