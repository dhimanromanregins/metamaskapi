import './App.css';
import Home from './Components/Home';
import Info from './Components/Info';
import Register from './Components/Register';
import SecurityLogin from './Components/SecurityLogin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

function App() {
  let [pageUrl, setPageUrl] = useState('/register');
  const updatePageUrl = (url)=>{
    setPageUrl(url);
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home updatePageUrl={updatePageUrl} />} />
        <Route path="/info" element={<Info pageUrl={pageUrl} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/security-login" element={<SecurityLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
