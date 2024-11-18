import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import "./Navbar.css";
import AMANLogo from "../../assets/AMAN-logo.png";
import { MdAccountCircle } from "react-icons/md";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Update state and navigate to login
    setUser(null);
    navigate("/login", { replace: true }); 
    window.location.reload();

  };

  // Redirect to login if user is null
  if (!user) {
    navigate("/login", { replace: true });
    return null; // Prevent rendering the navbar
  }

  return (
    <div className="navbar">
      <div className="left-nav">
        <img src={AMANLogo} alt="Logo" />
      </div>
      <div className="mid-nav">
        <Link to="/"><li>Home</li></Link>
        <Link to="/employeeList"><li>Employee List</li></Link>
        <Link to="https://inspiring-figolla-c7ebda.netlify.app/"><li>About</li></Link>
        <Link to="https://www.linkedin.com/in/aman-raj-772328256/"><li>Contact Us</li></Link>
        
      </div>
      <div className="right-nav">
        <div className="user">
          <MdAccountCircle />
          {user?.userName || "User"}
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
