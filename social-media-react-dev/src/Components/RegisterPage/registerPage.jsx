import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../Stores/authSlice';
import RegisterRequest from '../../Classes/RegisterRequest';
import './registerPage.css';

const RegisterPage = () => {
  const registerStatus = useSelector((state) => state.auth.status);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register(new RegisterRequest(email, password, firstName, lastName)));
  };

  const displayMessage = () => {
    if (registerStatus === 'failed') {
      return <div className="register-message">Failed to register. Please try again.</div>;
    } else {
      return null;
    }
  };

  const displayAlert = () => {
    if (registerStatus === 'succeeded') {
      return <div className="register-alert">Registered as {email}!</div>;
    } else {
      return null;
    }
  };

  return (
    <div className="register-page">
      <h1 className="register-form-h1">Register</h1>
      {displayMessage()}
      {displayAlert()}
      <form onSubmit={handleSubmit}>
        <div className="register-form">
          <label className="register-form-label" htmlFor="email">Email:</label>
          <input className="register-form-input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="register-form">
          <label className="register-form-label" htmlFor="password">Password:</label>
          <input className="register-form-input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="register-form">
          <label className="register-form-label" htmlFor="firstName">First Name:</label>
          <input className="register-form-input"
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div className="register-form">
          <label className="register-form-label" htmlFor="lastName">Last Name:</label>
          <input className="register-form-input"
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <button className="register-form-button" type="submit">Register</button>
        <span class="register-form-span">Account? <Link to="/">Login now</Link></span>
      </form>
    </div>
  );
};

export default RegisterPage;
