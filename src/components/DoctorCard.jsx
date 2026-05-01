import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function DoctorCard({ doctor, onBookClick }) {
  const navigate = useNavigate();

  // Handle default avatar if image doesn't exist
  const handleImageError = (e) => {
    e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(doctor.name) + '&background=E0E7FF&color=3730A3';
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="bg-blue-50 h-48 flex items-center justify-center p-4">
         {/* We assume doctor images would be provided, fallback to ui-avatars */}
        <img 
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name || 'Doc')}&background=E0E7FF&color=3730A3&size=150`} 
          alt={doctor.name} 
          onError={handleImageError}
          className="h-full object-contain"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-green-500 text-xs font-semibold uppercase tracking-wider">Available</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{doctor.name}</h3>
        <p className="text-gray-500 text-sm mb-4">{doctor.specializationName}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Button 
            variant="outlined" 
            fullWidth 
            onClick={() => onBookClick ? onBookClick(doctor) : navigate(`/appointment/${doctor.id}`)}
            className="!rounded-full !normal-case !text-indigo-600 !border-indigo-200 hover:!bg-indigo-50"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}
