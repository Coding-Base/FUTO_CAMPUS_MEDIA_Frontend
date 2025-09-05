// src/components/Team.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Team = () => {
  const teamImages = [
    "https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2024/07/team_01.jpg",
    "https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2024/07/team_02.jpg",
    "https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2024/07/team_03.jpg",
    "https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2024/07/team_04.jpg"
  ];

  const teamMembers = [
    {
      name: 'Samuel Imafidon',
      role: 'CEO & Founder',
    },
    {
      name: 'Emily Chen',
      role: 'CTO',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Lead Developer',
    },
    {
      name: 'Sarah Williams',
      role: 'Marketing Director',
    }
  ];

  return (
    <section id="team" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-orange-500 font-semibold">OUR TEAM</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Meet Our Experts</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="h-80 overflow-hidden">
                <img 
                  src={teamImages[index]} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-orange-500 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="bg-gray-100 hover:bg-orange-500 hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition">
                    <FaFacebookF className="text-sm" />
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-orange-500 hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition">
                    <FaTwitter className="text-sm" />
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-orange-500 hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition">
                    <FaLinkedinIn className="text-sm" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;