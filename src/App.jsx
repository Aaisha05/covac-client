import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './pages/Admin/dashboard'; 
import UsersDashboard from './pages/Users/dashboard'; 
import Home1 from './pages/Main/home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />      
        <Route path="/users/dashboard" element={<UsersDashboard />} />      
        <Route path="/" element={<Home1 />} />      
      </Routes>
    </Router>
  );
}

export default App;