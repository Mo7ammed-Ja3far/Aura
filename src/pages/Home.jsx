import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../store/slices/doctorsSlice";
import { useNavigate } from "react-router-dom";
import DoctorCard from "../components/DoctorCard";

import sm from "../assets/group_profiles.png";
import mainImg from "../assets/doc-header-img.png";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, isLoading, error } = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const specialities = [
    { id: 1, name: "General physician" },
    { id: 2, name: "Gynecologist" },
    { id: 3, name: "Dermatologist" },
    { id: 4, name: "Pediatricians" },
    { id: 5, name: "Neurologist" },
    { id: 6, name: "Gastroenterologist" },
  ];

  // Show top 6 doctors
  const topDoctors = list.slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-indigo-500 rounded-3xl flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16 text-white overflow-hidden relative">
        <div className="md:w-1/2 space-y-6 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Book Appointment <br/> With Trusted Doctors
          </h1>
          <div className="flex items-center gap-4">
            <img src={sm} alt="Profiles" className="h-12" />
            <p className="text-indigo-100 max-w-sm text-sm md:text-base">
              Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </p>
          </div>
          <button 
            onClick={() => navigate('/doctors')}
            title="Browse through the doctors specialist."
            className="bg-white text-gray-800 hover:bg-gray-50 px-8 py-4 rounded-full font-semibold transition-colors flex items-center gap-2 group relative"
          >
            Doctors
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6H15M15 6L10.8378 1M15 6L10.8378 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Browse through the doctors specialist.
            </span>
          </button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 relative flex justify-center lg:justify-end">
           <img src={mainImg} alt="Doctors" className="max-w-full h-auto object-contain z-10 relative bottom-[-4rem] md:bottom-[-4rem]" />
        </div>
      </div>

      {/* Speciality Section */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Find by Speciality</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-12">
          Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free
        </p>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {specialities.map((spec) => (
            <div 
              key={spec.id} 
              onClick={() => navigate(`/doctors?speciality=${spec.name}`)}
              className="flex flex-col items-center gap-4 cursor-pointer group"
            >
              <div className="w-24 h-24 rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors flex items-center justify-center overflow-hidden border border-indigo-50">
                <div className="w-16 h-16 rounded-full bg-gradient-to-b from-blue-100 to-indigo-100"></div>
              </div>
              <p className="text-sm font-medium text-gray-700">{spec.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Doctors Section */}
      <div className="py-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Doctors to Book</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-12">
          Simply browse through our extensive list of trusted doctors.
        </p>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 p-8 bg-red-50 rounded-xl">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-6 text-left">
              {topDoctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
            {list.length > 0 && (
              <button 
                onClick={() => navigate('/doctors')}
                className="mt-12 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-10 py-3 rounded-full font-medium transition-colors"
              >
                more
              </button>
            )}
          </>
        )}
      </div>

      {/* Bottom Banner */}
      <div className="mt-20 bg-indigo-500 rounded-3xl flex flex-col md:flex-row items-center justify-between p-12 md:p-16 text-white relative overflow-hidden">
         <div className="md:w-1/2 z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
              Book Appointment <br/> With 100+ Trusted Doctors
            </h2>
            <button 
              onClick={() => navigate('/signup')}
              className="bg-white text-gray-800 hover:bg-gray-50 px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Create account
            </button>
         </div>
         {/* Assuming an image goes here, we can put a decorative element if image missing */}
         <div className="absolute right-0 bottom-0 opacity-20 w-1/2 h-full bg-white blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
}
