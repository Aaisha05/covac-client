import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './pages/Admin/dashboard'; 
import UsersDashboard from './pages/Users/dashboard'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />      
        <Route path="/users/dashboard" element={<UsersDashboard />} />      
      </Routes>
    </Router>
  );
}

export default App;