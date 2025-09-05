import React from 'react';
import PageContainer from '../components/PageContainer';

export default function About() {
  // Replace with your phone
  const phone = '+2347042499173';
  const waLink = `https://whatsapp.com/channel/0029VaXNPor1CYoSZCZwNL2d`;

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 rounded-t-xl text-white">
          <h1 className="text-3xl font-bold">About FUTO Campus Media</h1>
          <p className="mt-2 text-indigo-100">Your trusted source for campus news, updates, and information</p>
        </div>
        
        <div className="bg-white p-8 rounded-b-xl shadow-md">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="lead">Futo Campus Media is a media established on October 2022, by journalist Ibekwe Confidence Uchechukwu. And on February 2024 it was registered under Futo students society of journalists (FSSJ).</p>
            
            <p>At first the media was created to bring jamb candidates aspiring for Futo together, to provide them with information, updates, assistance and services, but today Futo Campus Media have grow to be a full operating media house in Futo. Which is responsible for the distribution of information and news, collection of complains & reports from students and publication.</p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6">Our Impact</h2>
            <p>We have made a great impact to the Futo community for this few years:</p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>Fighting internet fraud and scam activities in the school online space. Through the report we get from student, we publicize and flag an individual or group of person's as scam, this is to prevent others from being victims of the same extortion or scam.</li>
              <li>We have assisted over 3,000 aspirant's to successfully get admission in Futo as of 2024 admission exercise.</li>
              <li>We created numerous cross faculty and departmental platforms where students can connect with one another and network.</li>
            </ul>
            
            <div className="mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-100">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">Get in Touch</h3>
              <p className="mb-4">Have questions or want to report something? Reach out to us on WhatsApp.</p>
              <a href={waLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}