 // src/components/FeatureGrid.jsx
import React from "react";
// v1 named import:
import { CheckCircleIcon } from "@heroicons/react/outline";

export default function FeatureGrid() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Top‐Left: Phone Image */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2025/05/services-icon-7.svg"
              alt="Mobile App Preview"
              className="w-full h-80 object-cover"
            />
          </div>

          {/* 2. Top‐Right: Orange Info Box */}
          <div className="bg-accentOrange text-white rounded-lg shadow-lg p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold mb-4">150+</h2>
            <p className="mb-4">Worldwide Country has lots of clients</p>
            <div className="flex -space-x-2">
              {/* Replace with actual avatar URLs */}
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2024/08/avatar-2.jpg"
                alt="Client 1"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2024/08/avatar-2.jpg"
                alt="Client 2"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2024/08/avatar-1.jpg"
                alt="Client 3"
              />
            </div>
          </div>

          {/* 3. Bottom‐Left: Pink Tag Box */}
          <div className="bg-accentPink text-white rounded-lg shadow-lg p-8 flex flex-col justify-center space-y-4">
            <h3 className="text-2xl font-bold">Our Services</h3>
            <ul className="space-y-2">
              {["Data Security", "Web Development", "Analytics & Optimization"].map((item) => (
                <li key={item} className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-white mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Bottom‐Right: Dark Image + Circular Overlay */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://themes.potenzaglobalsolutions.com/nexbiz/wp-content/uploads/2025/05/services-icon-2.svg"
              alt="Tech Graphic"
              className="w-full h-80 object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center p-2">
                <span className="text-3xl font-extrabold text-gray-800">88%</span>
                <span className="text-xs text-gray-600 text-center px-1">
                  Get 88% of the best services and grow business
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
