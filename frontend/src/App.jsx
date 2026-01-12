import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import TesterPage from './pages/TesterPage';
import ApisPage from './pages/ApisPage';
import DocsPage from './pages/DocsPage';


const App = () => {
  return (
     <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tester" element={<TesterPage />} />
      <Route path="/apis" element={<ApisPage />} />
      <Route path="/docs" element={<DocsPage />} />
    </Routes>
    </>
  )
}

export default App