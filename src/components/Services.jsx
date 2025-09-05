// src/components/Services.js
import React from 'react';
import { FaLaptopCode, FaShieldAlt, FaCloud, FaServer, FaMobileAlt, FaChartLine } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaLaptopCode className="text-4xl text-orange-500" />,
      title: 'Web Development',
      description: 'Custom websites and web applications tailored to your business needs.'
    },
    {
      icon: <FaShieldAlt className="text-4xl text-orange-500" />,
      title: 'Cyber Security',
      description: 'Protect your business from threats with our comprehensive security solutions.'
    },
    {
      icon: <FaCloud className="text-4xl text-orange-500" />,
      title: 'Cloud Services',
      description: 'Scalable cloud solutions to enhance your business operations.'
    },
    {
      icon: <FaServer className="text-4xl text-orange-500" />,
      title: 'IT Infrastructure',
      description: 'Design and implementation of robust IT infrastructure.'
    },
    {
      icon: <FaMobileAlt className="text-4xl text-orange-500" />,
      title: 'App Development',
      description: 'Mobile applications for iOS and Android platforms.'
    },
    {
      icon: <FaChartLine className="text-4xl text-orange-500" />,
      title: 'Data Analytics',
      description: 'Transform your data into actionable business insights.'
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-orange-500 font-semibold">OUR SERVICES</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">IT Solutions & Services</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 border border-gray-100 transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a href="#" className="text-orange-500 font-medium flex items-center">
                Learn More
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;