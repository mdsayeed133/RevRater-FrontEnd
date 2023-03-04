import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Stores/authSlice';
import LoginRequest from '../../Classes/LoginRequest';
import './loginPage.css'

const LoginPage= () => {
  const loginStatus = useSelector((state) => state.auth.status);
  const loginUser = useSelector((state)=> state.auth.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(new LoginRequest(email, password)));
  };

  const displayMessage = () => {
    if (loginStatus === 'failed') {
      return <div class="login-message">Email or password is incorrect</div>;
    } else {
      return null;
    }
  };

  const displayAlert = () => {
    if (loginStatus === 'succeeded') {
      return <div class="login-alert">Logged in as {loginUser.firstName}</div>;
    } else {
      return null;
    }
  };

  return (
    <div class="login-page">
      <h1 class="login-form-h1">Login</h1>
      {displayMessage()}
      {displayAlert()}
      <form onSubmit={handleSubmit}>
        <div class="login-form">
          <label class="login-form-label" htmlFor="email">Email:</label>
          <input class="login-form-input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div class="login-form">
          <label class="login-form-label" htmlFor="password">Password:</label>
          <input class="login-form-input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button class="login-form-button" type="submit">Login</button>
        <span class="login-form-span">No Account?  <Link to="/register">Register now</Link></span>
      </form>
    </div>
  );
};

export default LoginPage;