import React from 'react'
import "./css/contactform.css"


const ContactForm = () => {
  return (
    <div className='contactform-container'>
      <form className='contact-form' >
        <h2 className='contact-form-title'>Contact Form</h2>
        <div className='contact-form-wrapper'>
          <div className='contact-form-group'>
            <div className='contact-form-input'>
              <label htmlFor='first-name' className='contact-form-label'>First Name<span className="required">*</span></label>
              <input type='text' id='first-name' name='firstName' placeholder='Enter your first name' required className='contact-form-vrai' />
            </div>
            <div className='contact-form-input'>
              <label htmlFor='last-name' className='contact-form-label'>Last Name<span className="required">*</span></label>
              <input type='text' id='last-name' name='lastName' placeholder='Enter your last name' required className='contact-form-vrai' />
            </div>
          </div>
          <div className='contact-form-group'>
            <div className='contact-form-input'>
              <label htmlFor='email' className='contact-form-label'>Email<span className="required">*</span></label>
              <input type='email' id='email' name='email' placeholder='Enter your email' required className='contact-form-vrai' />
            </div>
            <div className='contact-form-input'>
              <label htmlFor='phone' className='contact-form-label'>Phone<span className="required">*</span></label>
              <input type='phone' id='phone' name='phone' placeholder='Enter your phone number' required className='contact-form-vrai' />
            </div>
          </div>
          <div className="form-group">
            <div className='contact-form-input'>
              <label htmlFor="subject" className='contact-form-label'>Subject<span className="required">*</span></label>
              <input type="text" id="subject" name="subject" placeholder="Subject" required
                className='contact-form-vrai subject' />
            </div>
          </div>
          <div className="form-group">
            <div className='contact-form-input'>
              <label htmlFor="message" className='contact-form-label'>How can we help you?<span className="required">*</span></label>
              <textarea id="message" name="message" required className='contact-form-vrai help' />
            </div>
          </div>
          <button type="submit" className='contact-form-button'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
