import React from 'react'
import "./css/catalogue.css"

const Catalogue = () => {

  return (
    <div className='catalogue-container'>
      <div className='catalogue-wrapper'>
        <div className='catalogue-info'>
          <h1 className='catalogue-title'>CATALOGUE</h1>
          <p className='catalogue-desc'>Product catalogue EMEA</p>
          <div className='catalogue-button-wrapper'>
            <button className='catalogue-button'>DOWNLOAD CATALOGUE</button>
          </div>
        </div>
        <div className='catalogue'>
          <div className='catalogue-frame'>
            <iframe src="//v.calameo.com/?bkcode=0077232702013f6d36b47&mode=mini&clickto=view&clicktarget=_self" width="480" height="300" frameborder="0" scrolling="no" allowTransparency="true" allowfullscreen  ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catalogue
