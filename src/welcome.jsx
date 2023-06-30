import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
  const username = localStorage.getItem('Username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('Username');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Bienvenido, {username}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
