import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import TesterPage from './pages/TesterPage';
import ApisPage from './pages/ApisPage';


const App = () => {
  return (
     <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tester" element={<TesterPage />} />
      <Route path="/APIS" element={<ApisPage />} />
      <Route path="*" element={<Home /> } />
    </Routes>
    </>
  )
}

export default App