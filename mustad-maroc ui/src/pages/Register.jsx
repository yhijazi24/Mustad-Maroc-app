import React from 'react'
import "./css/register.css"
const Register = () => {
  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className='register-video-wrapper'>
          <video className='register-video' playsInline preload="metadata" crossOrigin="anonymous" title="mustadwebsitebanner1" autoPlay muted loop poster="https://i.vimeocdn.com/video/1881932449-d561faee761eae2a1d0e44a85e1d6f17fb28232786c41853c8a6458dd32f87ba-d_1920x1080?r=pad">
            <source src='https://player.vimeo.com/external/968691145.m3u8?s=ad762a6c9e197eb5d4b568d6937450da6d720c9d&oauth2_token_id=1377975833' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className='register-info'>
          <h1 className="register-title">REGISTER</h1>
          <form className='register-form'>
            <div className='register-form-wrapper'>
              <div className='register-form-group'>
                <div className='register-form-input'>
                  <label htmlFor='first-name' className='register-form-label'>First Name<span className="required">*</span></label>
                  <input type='text' id='first-name' name='firstName' placeholder='Enter your first name' required className='register-form-vrai' />
                </div>
                <div className='register-form-input'>
                  <label htmlFor='last-name' className='register-form-label'>Last Name<span className="required">*</span></label>
                  <input type='text' id='last-name' name='lastName' placeholder='Enter your last name' required className='register-form-vrai' />
                </div>
              </div>
              <div className='register-form-group'>
                <div className='register-form-input'>
                  <label htmlFor='email' className='register-form-label'>Email<span className="required">*</span></label>
                  <input type='email' id='email' name='email' placeholder='Enter your email' required className='register-form-vrai' />
                </div>
                <div className='register-form-input'>
                  <label htmlFor='phone' className='register-form-label'>Phone<span className="required">*</span></label>
                  <input type='phone' id='phone' name='phone' placeholder='Enter your phone number' required className='register-form-vrai' />
                </div>
              </div>
              <div className='register-group'>
                <div className='register-form-input'>
                  <label htmlFor='industry' className='register-form-label'>Industry<span className="required">*</span></label>
                  <input type='text' id='industry' name='industry' placeholder='Enter your industry' required className='register-form-vrai' />
                </div>
              </div>
              <div className='register-form-group'>
                <div className='register-form-input'>
                  <label htmlFor='password' className='register-form-label'>Password<span className="required">*</span></label>
                  <input type='password' id='password' name='password' placeholder='Enter your password' required className='register-form-vrai' />
                </div>
                <div className='register-form-input'>
                  <label htmlFor='password-confirm' className='register-form-label'>Password Confirmation<span className="required">*</span></label>
                  <input type='password' id='password-confirm' name='passwordConfirm' placeholder='Re-enter your password' required className='register-form-vrai' />
                </div>
              </div>
              <button type="submit" className='register-form-button'>REGISTER</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
