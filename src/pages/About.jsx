import React from 'react';
import aboutImg from '../assets/doc-header-img.png'; // Using existing asset for visual consistency

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About <span className="text-indigo-600">Aura</span></h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Dedicated to providing exceptional healthcare services with a modern, patient-first approach.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <div className="md:w-1/2">
          <div className="bg-indigo-50 rounded-3xl p-8 overflow-hidden flex justify-center items-center">
            <img src={aboutImg} alt="Aura Clinic" className="w-full h-auto object-cover max-w-sm" />
          </div>
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to Aura, your trusted partner in managing your healthcare needs conveniently and efficiently. At Aura, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Aura is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Aura is here to support you every step of the way.
          </p>
          <div className="pt-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              Our vision at Aura is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
          <h3 className="text-indigo-600 text-4xl font-bold mb-2">100+</h3>
          <p className="text-gray-800 font-medium">Trusted Doctors</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
          <h3 className="text-indigo-600 text-4xl font-bold mb-2">50k+</h3>
          <p className="text-gray-800 font-medium">Patients Served</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
          <h3 className="text-indigo-600 text-4xl font-bold mb-2">15+</h3>
          <p className="text-gray-800 font-medium">Specialities</p>
        </div>
      </div>
    </div>
  );
}
