import React from 'react'
import "./css/home.css"
import Navbar from "../components/Navbar"
import Header from "../components/Header"
import Products from '../components/Products'
import Catalogue from '../components/Catalogue'
import Maps from '../components/Maps'
import Brands from '../components/Brands'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Brands />
      <Products />
      <Catalogue />
      <Maps />
      <Footer />
    </div>
  )
}

export default Home
