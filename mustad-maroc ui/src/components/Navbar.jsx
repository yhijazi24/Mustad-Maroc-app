import React, { useState } from 'react';
import "./css/navbar.css";
import { FmdGoodOutlined, MenuSharp, PersonOutlineOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import Badge from '@mui/material/Badge';

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


  return (

    <div className='navbar-container'>
      <div className='logo-container'>
        <img src='https://www.mustad.com/sites/mustad.com/files/logo/Mustad%E2%80%94logo.svg' className='logo' alt="logo" />
      </div>
      <div className='top-nav' id='hamburgerMenu'>
        <div className='navbar-list'>
          <div className='navbar-menu'>Home</div>
          <div className='navbar-menu dropdown'>
            <span className='navbar-menu-product'>Products</span>
            <div className='navbar-dropdown'>
              <div className='navbar-menu-drop'>Horseshoes</div>
              <div className='navbar-menu-drop'>Horse Nails</div>
              <div className='navbar-menu-drop'>Rasps</div>
              <div className='navbar-menu-drop'>Tools</div>
              <div className='navbar-menu-drop'>Care</div>
            </div>
          </div>

          <div className='navbar-menu'>Brands</div>
          <div className='navbar-menu'>Contact</div>
        </div>
        <div className='navbar-list-menu'>
          <div className='navbar-icon'>
            <FmdGoodOutlined />
          </div>
          <div className='navbar-icon'>
            <PersonOutlineOutlined />
          </div>
          <div className='navbar-icon'>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </div>
        </div>
      </div>
      <div className='hamburger-menu' onClick={dropDown}>
        <MenuSharp />
      </div>
    </div>

  )
}

export default Navbar
