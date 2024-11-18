import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { login } from '../../Redux/userSlice'; 
import "../Register/Vendor.css";
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(name,value);
    
  };
  // console.log(formData);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/dealsdray/login', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Invalid Email and Password');
      }

      const data = await response.json();
      
      localStorage.setItem('token', data.token);

      localStorage.setItem('user', JSON.stringify(data.user));

      
      dispatch(login(data.user));
      window.location.reload();
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="image-container">
        <img src='https://visiblegain.in/influencer/rb_54950.png' alt="Login" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Login</h2>
          <p>Don't have an Account? <Link to="/register">SignUp</Link></p>

          {error && <p className="error-message">{error}</p>}

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

          <button className='but-sec' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
