// src/pages/Policy.jsx
import React from 'react';
import PageContainer from '../components/PageContainer';

export default function Policy() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 md:p-8 rounded-t-xl text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-indigo-100 text-sm md:text-base">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
        
        <div className="bg-white p-6 md:p-8 rounded-b-xl shadow-md prose prose-indigo max-w-none">
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Commitment to Your Privacy</h2>
            <p className="text-gray-600">
              At FUTO Campus Media, we are committed to protecting your privacy and ensuring the security of your 
              personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when 
              you interact with our platform.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">1. Information We Collect</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, and contact details when you voluntarily provide them through our contact forms or comments</li>
                <li><strong>Usage Data:</strong> IP addresses, browser type, device information, and pages visited to improve user experience</li>
                <li><strong>Cookies:</strong> We use cookies to enhance functionality and analyze website traffic patterns</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">2. How We Use Your Information</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>To provide and maintain our services</li>
                <li>To communicate with you about campus updates, news, and events</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To improve our website content and user experience</li>
                <li>To analyze trends and gather demographic information</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">3. Data Protection & Security</h3>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no internet transmission 
                is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">4. Third-Party Services</h3>
              <p className="text-gray-600">
                We may use trusted third-party services such as Google Analytics for website analytics and 
                EmailJS for contact form processing. These services have their own privacy policies governing 
                data usage.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">5. Your Rights</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access and review your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of communications at any time</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">6. Cookies Policy</h3>
              <p className="text-gray-600">
                Our website uses cookies to enhance user experience. You can control cookie settings through 
                your browser preferences. However, disabling cookies may affect some website functionalities.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">7. Policy Updates</h3>
              <p className="text-gray-600">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal 
                requirements. We encourage you to review this page regularly for the latest information on 
                our privacy practices.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">8. Contact Us</h3>
              <p className="text-gray-600">
                If you have any questions, concerns, or requests regarding this Privacy Policy or your 
                personal data, please contact us at:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> uchechukwuconfidence4@gmail.com<br/>
                  <strong>Phone:</strong> +234 704 249 9173<br/>
                  <strong>Address:</strong> Federal University of Technology, Owerri
                </p>
              </div>
            </section>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
              <p className="text-blue-700 text-sm">
                <strong>Note:</strong> This privacy policy applies solely to information collected by 
                FUTO Campus Media and does not cover third-party websites or services that may be linked 
                from our platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}