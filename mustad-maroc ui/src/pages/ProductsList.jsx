import React from 'react'
import "./css/productslist.css"
import Navbar from '../components/Navbar'
import Catalogue from '../components/Catalogue'
import Maps from '../components/Maps'
import Footer from '../components/Footer'

const ProductsList = () => {
  return (
    <div>
      <Navbar />
      <Catalogue />
      <Maps />
      <Footer />
    </div>
  )
}

export default ProductsList
