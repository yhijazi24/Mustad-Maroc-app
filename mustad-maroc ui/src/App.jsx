import React, { useState } from 'react'
import Home from './pages/Home'
import ProductsList from './pages/ProductsList'
import Brands from './pages/Brands'
import Contact from './pages/Contact'
import ProductsPage from './pages/ProductsPage'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { useSelector } from 'react-redux'
import ScrollToTop from './ScrollToTop'


function App() {
  const user = false;
  //const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:type" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductsPage />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </Router>
  )
}

export default App
