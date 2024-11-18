import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Navbar from './pages/navbar/Navbar';
import Home from './component/Home-sec/Home';
import Footer from './component/Footer/Footer';
import EmployeeList from './pages/EmployeeList/EmployeeList';
import EmployeeForm from './pages/EmployeeForm/EmployeeForm';

function App() {
  const [user, setUser] = useState(null);

  // Check if a user is stored in localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // console.log(user);
  
  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div>
        
        {user && <Navbar />}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/employeeList" element={<ProtectedRoute element={<EmployeeList />} />} />
          <Route path="/addemployee" element={<ProtectedRoute element={<EmployeeForm />} />} />
        </Routes>
        
        {user && <Footer />}
      </div>
    </Router>
  );
}
export default App;
