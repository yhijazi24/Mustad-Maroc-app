import React from 'react'
import "./css/productslist.css"
import Navbar from '../components/Navbar'
import ProductssList from '../components/ProductssList'
import Catalogue from '../components/Catalogue'
import Maps from '../components/Maps'
import Footer from '../components/Footer'

const ProductsList = () => {
  return (
    <div>
      <Navbar />
      <ProductssList />
      <Catalogue />
      <Maps />
      <Footer />
    </div>
  )
}

export default ProductsList
