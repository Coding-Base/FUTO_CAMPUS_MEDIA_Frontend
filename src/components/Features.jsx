// src/components/Features.js
import React from 'react';

const Features = () => {
  const features = [
    {
      icon: "https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2025/05/services-icon-2.svg",
      title: 'IT Infrastructure',
      description: 'We design and implement robust IT infrastructure solutions tailored to your business needs.'
    },
    {
      icon: "https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2025/05/services-icon-4.svg",
      title: 'Cyber Security',
      description: 'Protect your business from threats with our comprehensive security solutions.'
    },
    {
      icon: "https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2025/05/services-icon-7.svg",
      title: 'Data Analytics',
      description: 'Transform your data into actionable business insights with our analytics solutions.'
    },
    {
      icon: "https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2025/05/services-icon-9.svg",
      title: 'IT Support',
      description: '24/7 IT support services to ensure your systems run smoothly.'
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-orange-500 font-semibold">WHY CHOOSE US</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 font-urbanist">Our Key Features</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-8 transition duration-300 border border-gray-100 flex items-start transform hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mr-6">
                <img 
                  src={feature.icon} 
                  alt={feature.title} 
                  className="w-16 h-16"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 font-urbanist">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;