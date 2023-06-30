import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './login';
import { Welcome } from './welcome';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/welcome" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
