// src/components/Loader.js
import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="lines-container">
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
        <div className="line line-4"></div>
      </div>
      <div className="loader-logo">
        <span className="text-orange">G</span>loveries
      </div>
    </div>
  );
};

export default Loader;