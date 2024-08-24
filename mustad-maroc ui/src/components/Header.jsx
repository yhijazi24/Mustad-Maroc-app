import React from 'react'
import "./css/header.css"
import { headerItems } from '../..'

const Header = () => {
  return (
    <div className='header-container'>
      {headerItems.map(item => (
        <div key={item.id} className='header-wrapper'>
          <div className='header-img-container'>
            <img src={item.img} className='header-img' alt='background' />
          </div>
          <div className='header-info'>
            <div className='header-content'>
              <h1 className='header-title'>{item.title}</h1>
              <p className='header-desc'>{item.desc}</p>
            </div>
            <div className='header-button-wrapper'>
              <button className='header-button'>GET IN TOUCH</button>
            </div>
          </div>
        </div>
      ))}
    </div>

  )
}

export default Header
