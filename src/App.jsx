import React from 'react';
import Router from './router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Router />
      </main>
      <Footer />
    </div>
  );
}
