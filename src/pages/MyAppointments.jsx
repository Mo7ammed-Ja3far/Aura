import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyAppointments, updateAppointmentStatus } from '../store/slices/appointmentsSlice';
import { createDiagnosis, rateDoctor } from '../store/slices/clinicalSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Button, Chip, CircularProgress, Alert, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, Rating, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';

export default function MyAppointments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, isLoading, error } = useSelector((state) => state.appointments);
  const { user } = useSelector((state) => state.auth);
  const { isLoading: clinicalLoading } = useSelector((state) => state.clinical);

  const isDoctor = user?.role === 'Doctor';
  const isPatient = user?.role === 'Patient';

  // Modal States
  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [diagnosisModalOpen, setDiagnosisModalOpen] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [ratingScore, setRatingScore] = useState(5);
  const [ratingComment, setRatingComment] = useState("");
  const [actionSuccess, setActionSuccess] = useState(null);

  const { register: regDiag, handleSubmit: handleDiagSubmit, reset: resetDiag } = useForm();

  useEffect(() => {
    dispatch(fetchMyAppointments());
  }, [dispatch]);

  const handleStatusChange = async (id, event) => {
    const newStatus = event.target.value;
    try {
      await dispatch(updateAppointmentStatus({ id, status: newStatus })).unwrap();
      setActionSuccess("Status updated successfully.");
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      // Error handled in slice
    }
  };

  const openRateModal = (appt) => {
    setSelectedAppt(appt);
    setRatingScore(5);
    setRatingComment("");
    setRateModalOpen(true);
  };

  const openDiagnosisModal = (appt) => {
    setSelectedAppt(appt);
    resetDiag();
    setDiagnosisModalOpen(true);
  };

  const submitDiagnosis = async (data) => {
    try {
      await dispatch(createDiagnosis({
        appointmentId: selectedAppt.id,
        patientId: selectedAppt.patientId, // Ensure backend returns patientId
        details: data.details,
        prescription: data.prescription
      })).unwrap();
      setActionSuccess("Diagnosis saved successfully.");
      setDiagnosisModalOpen(false);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      // Error handled in slice
    }
  };

  const submitRating = async () => {
    try {
      await dispatch(rateDoctor({
        doctorId: selectedAppt.doctorId, // Ensure backend returns doctorId
        score: ratingScore,
        comment: ratingComment
      })).unwrap();
      setActionSuccess("Rating submitted successfully.");
      setRateModalOpen(false);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      // Error handled in slice
    }
  };

  const getStatusColor = (status) => {
    if (status === 0) return "warning";
    if (status === 1) return "success";
    if (status === 2) return "error";
    return "default";
  };
  
  const getStatusLabel = (status) => {
    if (status === 0) return "Pending";
    if (status === 1) return "Confirmed";
    if (status === 2) return "Cancelled";
    return "Unknown";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isDoctor ? "My Schedule & Bookings" : "My Appointments"}
          </h1>
          <p className="text-gray-500 mt-1">
            {isDoctor ? "Manage your incoming patient appointments and diagnoses." : "View your booking history and rate your doctors."}
          </p>
        </div>
        {isPatient && (
          <Button 
            variant="contained" 
            onClick={() => navigate('/doctors')}
            className="!bg-indigo-600 hover:!bg-indigo-700 !shadow-none !rounded-full !normal-case"
          >
            Book New Appointment
          </Button>
        )}
      </div>

      {actionSuccess && <Alert severity="success" className="mb-6">{actionSuccess}</Alert>}

      {isLoading ? (
        <div className="flex justify-center p-12">
          <CircularProgress className="!text-indigo-600" />
        </div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : list.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
          <p className="text-gray-500 mb-4 text-lg">You have no appointments scheduled.</p>
          {isPatient && (
            <Button 
              variant="contained" 
              onClick={() => navigate('/doctors')}
              className="!bg-indigo-600 hover:!bg-indigo-700 !rounded-full !normal-case !shadow-none"
            >
              Browse Doctors
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {list.map((appt) => (
            <div key={appt.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
              
              {/* Info Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Chip label={getStatusLabel(appt.status)} color={getStatusColor(appt.status)} size="small" className="font-bold" />
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {new Date(appt.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>
                
                {isDoctor ? (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Patient</p>
                    <p className="text-xl font-bold text-gray-900">{appt.patientName || `Patient #${appt.patientId}`}</p>
                  </div>
                ) : (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Doctor</p>
                    <p className="text-xl font-bold text-gray-900">{appt.doctorName || `Doctor #${appt.doctorId}`}</p>
                  </div>
                )}
                
                <Button 
                  variant="text" 
                  size="small"
                  onClick={() => navigate(`/appointment/${appt.id}`)}
                  className="!normal-case !text-indigo-600 !p-0 hover:!bg-transparent hover:underline"
                >
                  View Full Details &rarr;
                </Button>
              </div>

              {/* Action Section */}
              <div className="flex flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[200px]">
                
                {isDoctor && (
                  <>
                    <FormControl size="small" fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={appt.status !== undefined ? appt.status : ''}
                        label="Status"
                        onChange={(e) => handleStatusChange(appt.id, e)}
                      >
                        <MenuItem value={0}>Pending</MenuItem>
                        <MenuItem value={1}>Confirmed</MenuItem>
                        <MenuItem value={2}>Cancelled</MenuItem>
                      </Select>
                    </FormControl>

                    <Button 
                      variant="contained" 
                      onClick={() => openDiagnosisModal(appt)}
                      className="!bg-indigo-50 !text-indigo-700 hover:!bg-indigo-100 !shadow-none !normal-case"
                      fullWidth
                    >
                      Write Diagnosis
                    </Button>
                  </>
                )}

                {isPatient && (
                  <>
                    <Button 
                      variant="outlined" 
                      onClick={() => openRateModal(appt)}
                      className="!text-indigo-600 !border-indigo-200 hover:!bg-indigo-50 !normal-case"
                      fullWidth
                    >
                      Rate Doctor
                    </Button>
                  </>
                )}

              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Modals (Reused from AppointmentDetails or Local) --- */}

      {/* Rate Doctor Modal */}
      <Dialog open={rateModalOpen} onClose={() => setRateModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Rate your experience</DialogTitle>
        <DialogContent dividers className="space-y-4">
          <div className="text-center py-4">
            <Rating
              value={ratingScore}
              onChange={(event, newValue) => setRatingScore(newValue)}
              size="large"
            />
          </div>
          <TextField
            label="Comments (Optional)"
            multiline
            rows={4}
            fullWidth
            value={ratingComment}
            onChange={(e) => setRatingComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRateModalOpen(false)} className="!text-gray-500">Cancel</Button>
          <Button onClick={submitRating} variant="contained" disabled={clinicalLoading} className="!bg-indigo-600">
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>

      {/* Write Diagnosis Modal */}
      <Dialog open={diagnosisModalOpen} onClose={() => setDiagnosisModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Diagnosis for {selectedAppt?.patientName}</DialogTitle>
        <form onSubmit={handleDiagSubmit(submitDiagnosis)}>
          <DialogContent dividers className="space-y-4">
            <TextField
              label="Diagnosis Details"
              multiline
              rows={4}
              fullWidth
              required
              {...regDiag('details')}
            />
            <TextField
              label="Prescription"
              multiline
              rows={4}
              fullWidth
              required
              {...regDiag('prescription')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDiagnosisModalOpen(false)} className="!text-gray-500">Cancel</Button>
            <Button type="submit" variant="contained" disabled={clinicalLoading} className="!bg-indigo-600">
              Save Diagnosis
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
}
