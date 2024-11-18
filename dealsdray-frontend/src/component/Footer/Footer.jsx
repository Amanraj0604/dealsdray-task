import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <div style={iconContainer}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
          <FaLinkedin />
        </a>
      </div>
      <p style={textStyle}>
        &copy;Copyright {new Date().getFullYear()} Aman Raj.
      </p>
    </footer>
  );
};

// Inline CSS for styling
const footerStyles = {
marginTop:"3%",
  backgroundColor: '#282c34',
  color: '#fff',
  textAlign: 'center',
  display:'flex',
  padding: '10px ',
  alignItems:"center",
  justifyContent:'space-between'
};

const iconContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  marginLeft:"5%"
};

const iconStyle = {
  color: '#fff',
  fontSize: '24px',
  textDecoration: 'none',
  transition: 'color 0.3s',
};

const textStyle = {
  fontSize: '14px',
  marginRight:'5%'
};

// Export Footer
export default Footer;
