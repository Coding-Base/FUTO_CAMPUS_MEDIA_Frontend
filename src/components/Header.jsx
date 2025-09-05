// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <div className="flex items-center mr-6">
              <FaPhone className="mr-2 text-orange-500" />
              <span>+234 816 469 5529</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-orange-500" />
              <span>gloveries@gmail.com</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-500 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <header className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900 font-urbanist">
                <span className="text-orange-500"></span>Gloveries
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {['Home', 'Services', 'About', 'Features', 'Team', 'Testimonials', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="text-gray-700 hover:text-orange-500 font-medium transition"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            <button className="hidden md:block bg-orange-500 hover:bg-black text-white px-6 py-2.5 rounded-none font-medium transition transform hover:scale-105">
              Get Started
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t">
              <ul className="space-y-4">
                {['Home', 'Services', 'About', 'Features', 'Team', 'Testimonials', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="block text-gray-700 hover:text-orange-500 font-medium py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <button className="w-full bg-orange-500 hover:bg-black text-white px-6 py-2.5 rounded-none font-medium transition transform hover:scale-105">
                    Get Started
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;