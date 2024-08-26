import React from 'react'
import "./css/contact.css"
import Navbar from '../components/Navbar'
import Maps from '../components/Maps'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'


const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className='contact-header'>
        <h1 className='contact-header-title'>Get in Contact</h1>
      </div>
      <ContactForm />
      <Maps />
      <Footer />
    </div>
  )
}

export default Contact
