// src/components/About.js
import React from 'react';
import { FaCheckCircle, FaUsers, FaChartBar, FaLightbulb } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaCheckCircle className="text-2xl text-orange-500" />,
      title: 'Quality Services',
      description: 'We deliver top-notch IT solutions with a focus on quality and reliability.'
    },
    {
      icon: <FaUsers className="text-2xl text-orange-500" />,
      title: 'Expert Team',
      description: 'Our team consists of highly skilled professionals with industry expertise.'
    },
    {
      icon: <FaChartBar className="text-2xl text-orange-500" />,
      title: 'Result Oriented',
      description: 'We focus on delivering measurable results for your business growth.'
    },
    {
      icon: <FaLightbulb className="text-2xl text-orange-500" />,
      title: 'Innovative Solutions',
      description: 'We leverage cutting-edge technology to provide innovative solutions.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0" data-aos="fade-right">
            <div className="relative">
              <img 
                src="https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2025/05/about-small-2-600x357.jpg" 
                alt="About Nexbiz" 
                className="w-full rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-500 p-6 rounded-lg shadow-xl">
                <div className="text-4xl font-bold text-white">8+</div>
                <div className="text-white font-medium">Years Experience</div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-12" data-aos="fade-left">
            <span className="text-orange-500 font-semibold">ABOUT US</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">We Help Businesses Innovate and Grow</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Gloveries is a leading provider of IT solutions and services. We help businesses transform and grow through innovative technology solutions. Our team of experts is dedicated to delivering exceptional results and outstanding customer service.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="bg-orange-500 hover:bg-black text-white px-8 py-3.5 rounded-md font-medium transition transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;