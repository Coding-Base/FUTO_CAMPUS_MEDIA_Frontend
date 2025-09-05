import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogList from './pages/BlogList';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import UTMECalculator from './pages/UTMECalculator';

export default function RouterComp() {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/posts/:slug" element={<PostDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/utme" element={<UTMECalculator />} />
    </Routes>
  );
}
