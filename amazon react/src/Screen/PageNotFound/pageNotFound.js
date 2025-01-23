// src/Screen/PageNotFound/pageNotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pageNotFound.css';

const PageNotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="page-not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={goToHome}>Go Back to Home</button>
    </div>
  );
};

export default PageNotFound;
