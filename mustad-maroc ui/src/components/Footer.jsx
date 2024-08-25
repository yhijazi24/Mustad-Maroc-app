import React from 'react'
import "./css/footer.css"

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-wrapper'>
        <div className='footer-links'>
          <h3 className='links-title'>QUICK LINKS</h3>
          <p className='link'>Home</p>
          <p className='link'>Products</p>
          <p className='link'>Brands</p>
          <p className='link'>Contact</p>
          <p className='link'>Cart</p>
          <p className='link'>Account</p>
        </div>
        <div className='footer-links'>
          <h3 className='links-title'>PRODUCTS RANGE</h3>
          <p className='link'>Horseshoes</p>
          <p className='link'>Horse nails</p>
          <p className='link'>Rasps</p>
          <p className='link'>Tools</p>
          <p className='link'>Care products</p>
        </div>
        <div className='footer-links'>
          <div className='footer-socials'>
            <h3 className='links-title'>SOCIALS</h3>
            <p className='link'>Facebook</p>
            <p className='link'>Instagram</p>
            <p className='link'>Linkedin</p>
          </div>
          <div className='footer-paymant'>
            <img src='https://i.postimg.cc/NLvyvWJ8/aze-visa-mastercard-27032024-removebg-preview.png' className='method-img' alt='img' />
          </div>
        </div>
      </div>
      <p className='copyright'>© ScarletWeb 2024</p>
    </div>
  )
}

export default Footer;
