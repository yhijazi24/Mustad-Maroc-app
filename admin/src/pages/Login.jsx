import React, { useState, useEffect } from 'react';
import './css/login.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  // ✅ Redirect only once when currentUser is set and isAdmin
 useEffect(() => {
  if (currentUser && currentUser.isAdmin) {
    navigate('/');
  }
}, [currentUser?.isAdmin]); // ✅ Only re-run when isAdmin changes


  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className='login-video-wrapper'>
          <video className='login-video' autoPlay muted loop>
            <source src='https://player.vimeo.com/external/968691145.m3u8?s=ad762a6c9e197eb5d4b568d6937450da6d720c9d&oauth2_token_id=1377975833' type='video/mp4' />
          </video>
        </div>
        <div className='login-info'>
          <h1 className="login-title">SIGN IN</h1>
          <form className='login-form'>
            <div className='login-label'>
              <label>Username<span className="required">*</span></label>
              <input
                className="login-input"
                type="text"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='login-label'>
              <label>Password<span className="required">*</span></label>
              <input
                className="login-input"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="login-button" onClick={handleClick} disabled={isFetching}>
              LOGIN
            </button>
            {error && <span className="login-error">Something went wrong...</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
