import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors, fetchDoctorsBySpecialization, recommendDoctors } from "../store/slices/doctorsSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import DoctorCard from "../components/DoctorCard";
import api from "../api/api";

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, CircularProgress, Alert
} from "@mui/material";

export default function Doctors() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSpec = searchParams.get("speciality");

  const { list, isLoading, error } = useSelector((state) => state.doctors);
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  // Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const baseSpecialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const [knownSpecs, setKnownSpecs] = useState(baseSpecialities);

  useEffect(() => {
    if (selectedSpec) {
      dispatch(fetchDoctorsBySpecialization(selectedSpec));
    } else {
      dispatch(fetchDoctors());
    }
  }, [dispatch, selectedSpec]);

  // Dynamically extract specialities if list is fully loaded (not filtered)
  useEffect(() => {
    if (!selectedSpec && list.length > 0) {
      const extracted = list.map(d => d.specializationName).filter(Boolean);
      setKnownSpecs(prev => [...new Set([...prev, ...extracted])]);
    }
  }, [list, selectedSpec]);

  const [symptomInput, setSymptomInput] = useState("");
  const handleSymptomSearch = (e) => {
    e.preventDefault();
    if (symptomInput.trim()) {
      dispatch(recommendDoctors({ symptoms: [symptomInput] }));
    } else {
      dispatch(fetchDoctors());
    }
  };

  const handleBookClick = (doctor) => {
    if (!token) {
      navigate("/login");
      return;
    }
    setSelectedDoctor(doctor);
    setAppointmentDate("");
    setBookingError(null);
    setBookingSuccess(false);
    setIsModalOpen(true);
  };

  const submitBooking = async () => {
    if (!appointmentDate) {
      setBookingError("Please select a date and time.");
      return;
    }

    setIsBooking(true);
    setBookingError(null);

    try {
      await api.post("/api/appointments/Book", {
        doctorId: selectedDoctor.id,
        date: new Date(appointmentDate).toISOString(),
      });
      setBookingSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    } catch (err) {
      setBookingError(err.response?.data?.message || "Failed to book appointment. Please try again.");
    } finally {
      setIsBooking(true);
      setIsBooking(false); // Quick fix for finally block logic
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-xl font-medium text-gray-800 mb-6">Browse through the doctors specialist.</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-3">
          <button
            onClick={() => setSearchParams({})}
            className={`text-left px-4 py-2 border rounded-md text-sm transition-colors ${
              !selectedSpec ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-medium" : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            All Specialities
          </button>
          
          {knownSpecs.map((spec) => (
            <button
              key={spec}
              onClick={() => setSearchParams({ speciality: spec })}
              className={`text-left px-4 py-2 border rounded-md text-sm transition-colors ${
                selectedSpec === spec ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-medium" : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {spec}
            </button>
          ))}

          {isAuthenticated && user?.role === 'Patient' && (
            <form onSubmit={handleSymptomSearch} className="mt-4 flex flex-col gap-2">
              <TextField 
                size="small" 
                placeholder="Search by symptom..." 
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
              />
              <Button type="submit" variant="outlined" className="!text-indigo-600 !border-indigo-200">
                Find by Symptom
              </Button>
            </form>
          )}
        </div>

        {/* Doctors Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : list.length === 0 ? (
            <div className="text-gray-500 text-center p-12 bg-gray-50 rounded-xl">
              No doctors found for the selected speciality.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {list.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} onBookClick={handleBookClick} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={isModalOpen} onClose={() => !isBooking && setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="!font-bold text-gray-800">
          Book Appointment with Dr. {selectedDoctor?.name}
        </DialogTitle>
        <DialogContent dividers>
          {bookingSuccess ? (
            <Alert severity="success">Appointment booked successfully!</Alert>
          ) : (
            <div className="space-y-4 py-2">
              <p className="text-sm text-gray-600">
                <strong>Speciality:</strong> {selectedDoctor?.specializationName} <br/>
                <strong>Price:</strong> ${selectedDoctor?.appointmentPrice}
              </p>
              
              {bookingError && <Alert severity="error" className="mb-4">{bookingError}</Alert>}
              
              <TextField
                label="Date & Time"
                type="datetime-local"
                fullWidth
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: new Date().toISOString().slice(0, 16), // Prevent past dates
                }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions className="!px-6 !py-4">
          {!bookingSuccess && (
            <>
              <Button onClick={() => setIsModalOpen(false)} disabled={isBooking} className="!text-gray-500">
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={submitBooking} 
                disabled={isBooking || !appointmentDate}
                className="!bg-indigo-600 hover:!bg-indigo-700 !shadow-none"
              >
                {isBooking ? <CircularProgress size={24} className="!text-white" /> : "Confirm Booking"}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
