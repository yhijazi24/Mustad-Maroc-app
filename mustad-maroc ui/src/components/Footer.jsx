import React from 'react'
import "./css/footer.css"
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {

  const navigate = useNavigate();

  const handleGoToProducts = () => {
    navigate('/', { state: { scrollToProducts: true } });
  };


  return (
    <div className='footer-container'>
      <div className='footer-wrapper'>
        <div className='footer-links'>
          <h3 className='links-title'>QUICK LINKS</h3>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p className='link'>Home</p>
          </Link>
            <p className='link'onClick={handleGoToProducts}>Products</p>
          <Link to="/brands" style={{ textDecoration: 'none' }}>
            <p className='link'>Brands</p>
          </Link>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <p className='link'>Contact</p>
          </Link>
          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <p className='link'>Cart</p>
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p className='link'>Account</p>
          </Link>
        </div>
        <div className='footer-links'>
          <h3 className='links-title'>PRODUCTS RANGE</h3>
          <Link to="/products/horseshoes" style={{ textDecoration: 'none' }}>
            <p className='link'>Horseshoes</p>
          </Link>
          <Link to="/products/nails" style={{ textDecoration: 'none' }}>
            <p className='link'>Horse nails</p>
          </Link>
          <Link to="/products/rasps" style={{ textDecoration: 'none' }}>
            <p className='link'>Rasps</p>
          </Link>
          <Link to="/products/tools" style={{ textDecoration: 'none' }}>
            <p className='link'>Tools</p>
          </Link>
          <Link to="/products/care" style={{ textDecoration: 'none' }}>
            <p className='link'>Care products</p>
          </Link>
        </div>
        <div className='footer-links'>
          <div className='footer-socials'>
            <h3 className='links-title'>SOCIALS</h3>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <p className='link'>Facebook</p>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <p className='link'>Instagram</p>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <p className='link'>Linkedin</p>
            </Link>
          </div>
          <div className='footer-paymant'>
            <img src='https://i.postimg.cc/NLvyvWJ8/aze-visa-mastercard-27032024-removebg-preview.png' className='method-img' alt='img' />
          </div>
        </div>
      </div>
      <p className='copyright'>© Hijazi Yahya 2025</p>
    </div>
  )
}

export default Footer;
