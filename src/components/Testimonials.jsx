// src/components/Testimonials.js
import React, { useState } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Anderson',
      role: 'CEO, Tech Solutions Inc.',
      content: 'Gloveries transformed our IT infrastructure and helped us reduce costs by 30%. Their team is professional and responsive.',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO, Innovate Co.',
      content: 'The cybersecurity solutions provided by Gloveries have been exceptional. We feel much more secure now.',
      rating: 5
    },
    {
      name: 'Michael Roberts',
      role: 'Director, Global Enterprises',
      content: 'Their cloud solutions have improved our operational efficiency significantly. Highly recommended!',
      rating: 4
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-orange-500 font-semibold">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto" data-aos="zoom-in">
          <div className="bg-gray-800 rounded-xl p-8 md:p-12 relative">
            <FaQuoteLeft className="text-5xl text-orange-500 absolute top-8 left-8 opacity-20" />
            
            <div className="relative z-10">
              <div className="flex mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 mr-1" />
                ))}
              </div>
              
              <p className="text-lg mb-8 italic text-gray-200">
                "{testimonials[currentIndex].content}"
              </p>
              
              <div>
                <h3 className="text-xl font-bold">{testimonials[currentIndex].name}</h3>
                <p className="text-orange-400">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition transform hover:scale-110"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition transform hover:scale-110"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;