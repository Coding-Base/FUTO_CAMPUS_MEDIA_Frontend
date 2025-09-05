// src/components/Contact.js
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl text-orange-500" />,
      title: 'Our Location',
      details: '24 Bawala Pedro Gbagada, Lagos, Nigeria'
    },
    {
      icon: <FaPhone className="text-2xl text-orange-500" />,
      title: 'Phone Number',
      details: '+234 816 469 5529'
    },
    {
      icon: <FaEnvelope className="text-2xl text-orange-500" />,
      title: 'Email Address',
      details: 'osamaimafidon@gmail.com'
    },
    {
      icon: <FaClock className="text-2xl text-orange-500" />,
      title: 'Working Hours',
      details: 'Mon-Fri: 9:00 AM - 6:00 PM'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-orange-500 font-semibold">CONTACT US</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6">
            Have questions or ready to start your next project? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div data-aos="fade-right">
            <div className="bg-gray-50 rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-5 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                <div className="flex space-x-3">
                  {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
                    <a 
                      key={platform}
                      href="#" 
                      className="w-10 h-10 rounded-full bg-orange-500 hover:bg-black flex items-center justify-center transition transform hover:scale-110"
                    >
                      <div className="text-white text-sm font-bold">
                        {platform.charAt(0).toUpperCase()}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="mt-8 rounded-xl overflow-hidden shadow-md">
              <div className="bg-gray-200 w-full h-64 rounded-xl flex items-center justify-center">
                <img 
                  src="https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2024/07/blog-img12-1000x650.jpg" 
                  alt="Map Location" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div data-aos="fade-left">
            <div className="bg-gray-50 rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              
              {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                    placeholder="Enter subject"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-6 py-4 rounded-lg text-white font-medium transition ${
                    isSubmitting ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-black'
                  } transform hover:scale-105`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Additional Info */}
            <div className="mt-8 bg-orange-500 text-white rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">Need Immediate Assistance?</h3>
              <p className="mb-6">
                For urgent inquiries or technical support, call our 24/7 support line:
              </p>
              <div className="flex items-center">
                <FaPhone className="text-2xl mr-4" />
                <div>
                  <div className="text-sm text-orange-200">Emergency Support</div>
                  <div className="text-2xl font-bold">+234 816 469 5529</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;