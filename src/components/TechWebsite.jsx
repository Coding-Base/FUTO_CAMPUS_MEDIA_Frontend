// src/components/TechWebsite.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FaArrowDown, FaArrowUp, FaSearch, FaDownload, FaUser, FaChartLine, FaServer, FaCloud, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const TechWebsite = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);
  
  const sections = [
    {
      id: 0,
      title: "Innovating Solutions for Your IT Business",
      subtitle: "Open Marketing Strategies",
      content: [
        {
          title: "SEO-Orientation Solution",
          description: "Maintains the first-level of customer solutions to develop business and improve their quality."
        },
        {
          title: "Video Production Services",
          description: "Maintains the first-level of customer solutions to develop business and improve their quality."
        }
      ],
      footer: "Expert and reliable workers you can trust"
    },
    {
      id: 1,
      title: "We Build Solutions for Your Growth",
      subtitle: "A set of solutions designed to create an active solution in the world",
      content: [
        {
          title: "Future Equipment",
          items: ["Customer Services", "SaaS Applications"]
        },
        {
          title: "Digital Marketing Strategies",
          items: ["Sales from green service", "Customer Web Design Solutions", "Sales using new service"]
        },
        {
          title: "Social Media Management",
          items: ["Sales using new services"]
        }
      ],
      footer: "Exploring business world through our services"
    },
    {
      id: 2,
      title: "Find the perfect plan for your needs",
      subtitle: "Nexbiz IT Solutions",
      content: [
        {
          name: "Best-Five",
          price: "$99",
          description: "Use all our plans and will be used to create a good way of working with you.",
          features: ["Get Started online", "Get an employee visit", "Get an employee visit", "Get an employee visit"],
          cta: "You're welcome!"
        },
        {
          name: "Adopted Size",
          price: "$189",
          description: "Use all our plans and will be used to create a good way of working with you.",
          features: ["Betterly able", "Get an employee visit", "Get an employee visit", "Get an employee visit"],
          cta: "Yes!"
        },
        {
          name: "Purchase Plan",
          price: "$499",
          description: "Use all our plans and will be used to create a good way of working with you.",
          features: ["Create a new plan", "Get an employee visit", "Get an employee visit", "Get an employee visit"],
          cta: "Yes!"
        }
      ]
    },
    {
      id: 3,
      title: "Meet our friendly team members",
      subtitle: "The experts behind your success",
      content: [
        { name: "Damon Cars", role: "CEO", tenure: "August 2019" },
        { name: "Sorcery Flocks", role: "CTO", tenure: "October 2019" },
        { name: "Emily Carver", role: "Design Lead", tenure: "April 2020" },
        { name: "Simon Cynew", role: "DevOps", tenure: "March 2020" },
        { name: "Paul Flows", role: "Marketing", tenure: "May 2020" },
        { name: "Melissa Dee", role: "Support", tenure: "June 2020" }
      ]
    },
    {
      id: 4,
      title: "Digital Marketing Strategies",
      subtitle: "Transforming Complex Data into Engaging Visual Insights",
      content: "Our full-time retail brand will only offer a variety of time recognition skills and offering free cash for your customers to complete the share.",
      features: [
        "Including a modular and customised data acquisition, cutting up, colliding in, from out, on, with a new technology that allows you to use a new tool to create an online platform.",
        "This is a commitment to maintaining the power of personal and personalized information.",
        "A virtual user often is developing the latest:",
        "To improve customer satisfaction, we can also help you develop the digital system.",
        "We are working with digital solutions to enhance our business experience and manage the design."
      ],
      network: Array.from({length: 15}, (_, i) => `${i+1}:00`)
    },
    {
      id: 5,
      title: "Get in touch with us",
      subtitle: "We're ready to help you succeed",
      contact: {
        phone: "1 (123) 456-7890",
        links: ["Download Brochure", "Description", "Outlooks"]
      },
      services: [
        "You can use your own services to form your own clients.",
        "You can also use your own services to create a new client.",
        "Service providers: Health and Human Services"
      ],
      faq: [
        {
          question: "It should be at the time that you have been working on your services?",
          answer: "You are using your advice for the first year or another year, and it will be done with your advice in order to help you understand your needs of our customers."
        },
        {
          question: "Be only due to do it?",
          answer: "Use worried about or avoid errors."
        },
        {
          question: "Why if Staff Arrangement?",
          answer: "Proper staff arrangement ensures optimal workflow and productivity."
        }
      ]
    }
  ];

  // Handle scroll navigation
  const scrollToSection = (index) => {
    if (isScrolling || index < 0 || index >= sections.length) return;
    
    setIsScrolling(true);
    setActiveSection(index);
    
    const sectionHeight = window.innerHeight;
    window.scrollTo({
      top: sectionHeight * index,
      behavior: 'smooth'
    });
    
    setTimeout(() => setIsScrolling(false), 1000);
  };

  // Handle wheel scroll
  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling) return;
      
      if (e.deltaY > 50) {
        scrollToSection(Math.min(activeSection + 1, sections.length - 1));
      } else if (e.deltaY < -50) {
        scrollToSection(Math.max(activeSection - 1, 0));
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, isScrolling]);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-3">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index 
                ? 'bg-blue-500 scale-125' 
                : 'bg-gray-300 hover:bg-blue-400'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll arrows */}
      <button 
        onClick={() => scrollToSection(activeSection - 1)}
        className={`fixed left-1/2 transform -translate-x-1/2 top-4 z-50 p-2 bg-blue-600 rounded-full text-white shadow-lg transition-all duration-300 hover:bg-blue-700 ${
          activeSection === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Scroll up"
      >
        <FaArrowUp />
      </button>
      
      <button 
        onClick={() => scrollToSection(activeSection + 1)}
        className={`fixed left-1/2 transform -translate-x-1/2 bottom-4 z-50 p-2 bg-blue-600 rounded-full text-white shadow-lg transition-all duration-300 hover:bg-blue-700 ${
          activeSection === sections.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Scroll down"
      >
        <FaArrowDown />
      </button>
      
      {/* Header */}
      <header className="fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur-sm z-40 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Nexbiz</div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">Pages</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">Service</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">Portfolio</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">Blog</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">Contact</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Type here to search" 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors">
              Contact
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content with carousel sections */}
      <main ref={containerRef}>
        {/* Section 1: Hero */}
        <section className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-blue-900 to-indigo-900 text-white px-6 py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="grid grid-cols-5 gap-8">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="h-40 border border-gray-700 rounded-xl"></div>
              ))}
            </div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 max-w-3xl">
              {sections[0].title}
            </h1>
            
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-300">
                {sections[0].subtitle}
              </h2>
              
              <div className="space-y-6">
                {sections[0].content.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-2 mr-4 mt-1">
                      <div className="w-6 h-6 flex items-center justify-center">
                        {index % 2 === 0 ? <FaChartLine /> : <FaServer />}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-300 max-w-2xl">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-blue-500 pl-4 py-1">
                {sections[0].footer}
              </h2>
            </div>
          </div>
        </section>
        
        {/* Section 2: Solutions */}
        <section className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white px-6 py-20 relative">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
                {sections[1].title}
              </h1>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                {sections[1].subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sections[1].content.map((solution, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-lg p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        {index === 0 ? <FaCloud /> : index === 1 ? <FaChartLine /> : <FaUser />}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{solution.title}</h3>
                    <ul className="space-y-2">
                      {solution.items.map((item, i) => (
                        <li key={i} className="flex items-center">
                          <FaChevronRight className="text-blue-500 mr-2 text-xs" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-20 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                {sections[1].footer}
              </h2>
              <div className="flex justify-center mt-6">
                <div className="flex space-x-4">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 3: Pricing */}
        <section className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
                {sections[2].title}
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {sections[2].subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {sections[2].content.map((plan, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                    index === 1 ? 'transform scale-105 border-2 border-blue-500 relative' : ''
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      POPULAR
                    </div>
                  )}
                  <div className={`p-8 ${index === 1 ? 'pt-12' : ''}`}>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                      <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
                    </div>
                    <p className="text-gray-600 mb-8">{plan.description}</p>
                    
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <FaChevronRight className="text-green-500 text-xs" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className={`w-full py-3 rounded-lg font-bold transition-colors ${
                      index === 1 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}>
                      {plan.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Section 4: Team */}
        <section className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-gray-900 to-black text-white px-6 py-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {sections[3].title}
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {sections[3].subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {sections[3].content.map((member, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group"
                >
                  <div className="relative">
                    <div className="bg-gray-700 border-2 border-dashed rounded-xl w-full h-48" />
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{member.name}</h3>
                    <p className="text-blue-400 text-sm mb-1">{member.role}</p>
                    <p className="text-gray-400 text-xs">{member.tenure}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Section 5: Marketing */}
        <section className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-indigo-100 to-purple-100 px-6 py-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
                  {sections[4].title}
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold mb-8 text-gray-700">
                  {sections[4].subtitle}
                </h2>
                
                <p className="text-gray-600 mb-8 max-w-2xl">
                  {sections[4].content}
                </p>
                
                <ul className="space-y-4 mb-12">
                  {sections[4].features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-1">
                        <FaChevronRight className="text-indigo-600 text-xs" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Network</h3>
                <div className="flex flex-wrap gap-3">
                  {sections[4].network.map((time, i) => (
                    <div 
                      key={i} 
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-indigo-700 hover:shadow-md"
                    >
                      {time}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold">Real-time Analytics</h4>
                    <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Live</div>
                  </div>
                  <div className="h-40 bg-white bg-opacity-10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold">87%</div>
                      <p className="text-sm">Engagement Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 6: Contact */}
        <section className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white px-6 py-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold mb-8 text-gray-800">
                  {sections[5].title}
                </h1>
                
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                    {sections[5].subtitle}
                  </h2>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <FaDownload className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">{sections[5].contact.phone}</div>
                      <div className="flex space-x-4 mt-2">
                        {sections[5].contact.links.map((link, i) => (
                          <a 
                            key={i} 
                            href="#" 
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            {link}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Create Your Services</h3>
                    <ul className="space-y-3">
                      {sections[5].services.map((service, i) => (
                        <li key={i} className="flex items-start">
                          <FaChevronRight className="text-blue-500 mr-2 mt-1 text-xs" />
                          <span className="text-gray-700">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      {sections[5].faq.map((faq, i) => (
                        <div key={i} className="border-l-4 border-blue-500 pl-4 py-2">
                          <h4 className="font-bold text-gray-800">{faq.question}</h4>
                          <p className="text-gray-600 mt-1">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Need assistance?</h2>
                <p className="text-gray-600 mb-8">Please fill the form</p>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Your Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Service Interested In</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Digital Marketing</option>
                      <option>SEO Services</option>
                      <option>Web Development</option>
                      <option>Cloud Solutions</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h4 className="font-bold text-gray-800 mb-4">Notable</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-blue-600">About Us</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-600">Services</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-600">Team</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-600">Careers</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-600">Portfolio</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-600">Cookie Policy</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-4">Contact</h4>
                  <ul className="space-y-2">
                    <li className="text-gray-600">contact@nexbiz.com</li>
                    <li className="text-gray-600">+1 (123) 456-7890</li>
                    <li className="text-gray-600">San Francisco, CA</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 text-center text-gray-600">
                <p>© 2025 Nexbiz IT Solutions. All rights reserved.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TechWebsite;