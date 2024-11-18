import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import "./Vendor.css";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState(''); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); // Hook to navigate to different routes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); 
    setError('');   

    try {
      const response = await fetch('http://localhost:3000/api/dealsdray/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Registration successful!');
        
        // Redirect after 5 seconds if registration is successful
        setTimeout(() => {
          navigate('/login');
        }, 5000);
        
      } else {
        const data = await response.json();
        setError(data || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <div className="image-container">
        <img src='https://visiblegain.in/influencer/rb_18823.png' alt="Register" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Register</h2>
          <p>Already have an account? <Link to="/login">Login</Link></p>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className='but-sec' type="submit">Register</button>

          {/* Display success or error message */}
          {message && <div className="success-message" style={{ color: 'green', fontSize: '12px' }}>{typeof message === 'object' ? message.message : message}</div>}
          {error && <p className="error-message" style={{ color: 'red', fontSize: '12px' }}>{typeof error === 'object' ? error.message : error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
