import React from 'react'
import "./css/productspage.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Maps from '../components/Maps'
import ProductPage from '../components/ProductPage'


const ProductsPage = () => {
  return (
    <div>
      <Navbar />
      <ProductPage />
      <Maps />
      <Footer />
    </div>
  )
}

export default ProductsPage
