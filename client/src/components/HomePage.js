import React, { useState } from 'react';
import '../style/HomePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createCookie } from '../utils/cookies';

function HomePage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginWithEmailAndPassword = () => {
    axios
      .post('/api/user/login', { email, password })
      .then((result) => {
        setUser(result.data.user);
        createCookie('accessToken', result.data.accessToken, 900000);
        createCookie('refreshToken', result.data.refreshToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="login-page">
      <h1 id="login-header">login</h1>
      <div>
        <div id="login-form">
          <p>email: </p>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <p>password: </p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login-btn"
            onClick={() => loginWithEmailAndPassword()}
          >
            submit
          </button>
        </div>
      </div>
      <div id="login-buttons">
        <Link to="/signup">Sign-up here</Link>
      </div>
    </div>
  );
}

export default HomePage;
