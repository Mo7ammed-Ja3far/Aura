import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyAppointments, updateAppointmentStatus } from '../store/slices/appointmentsSlice';
import { createDiagnosis, rateDoctor } from '../store/slices/clinicalSlice';
import { useForm } from 'react-hook-form';
import { 
  Button, Chip, CircularProgress, Alert, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, Rating, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';

export default function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { list, isLoading } = useSelector((state) => state.appointments);
  const { user } = useSelector((state) => state.auth);
  const { isLoading: clinicalLoading } = useSelector((state) => state.clinical);

  const [appointment, setAppointment] = useState(null);
  
  // Modals
  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [diagnosisModalOpen, setDiagnosisModalOpen] = useState(false);
  const [ratingScore, setRatingScore] = useState(5);
  const [ratingComment, setRatingComment] = useState("");
  const [actionSuccess, setActionSuccess] = useState(null);

  const { register: regDiag, handleSubmit: handleDiagSubmit, reset: resetDiag } = useForm();

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchMyAppointments());
    }
  }, [dispatch, list.length]);

  useEffect(() => {
    if (list.length > 0) {
      const found = list.find(a => a.id.toString() === id);
      setAppointment(found);
    }
  }, [list, id]);

  if (isLoading && !appointment) {
    return <div className="flex justify-center p-20"><CircularProgress className="!text-indigo-600" /></div>;
  }

  if (!appointment) {
    return (
      <div className="max-w-3xl mx-auto p-10 text-center">
        <Alert severity="error">Appointment not found.</Alert>
        <Button onClick={() => navigate('/my-appointments')} className="!mt-4">Back to Appointments</Button>
      </div>
    );
  }

  const isDoctor = user?.role === 'Doctor';
  const isPatient = user?.role === 'Patient';

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    try {
      await dispatch(updateAppointmentStatus({ id: appointment.id, status: newStatus })).unwrap();
      setActionSuccess("Status updated successfully.");
    } catch (err) {
      // Error handled in slice
    }
  };

  const submitDiagnosis = async (data) => {
    try {
      await dispatch(createDiagnosis({
        appointmentId: appointment.id,
        patientId: appointment.patientId, // Assuming this is in the appt object
        details: data.details,
        prescription: data.prescription
      })).unwrap();
      setActionSuccess("Diagnosis saved successfully.");
      setDiagnosisModalOpen(false);
      resetDiag();
    } catch (err) {
      // Error handled in slice
    }
  };

  const submitRating = async () => {
    try {
      await dispatch(rateDoctor({
        doctorId: appointment.doctorId,
        score: ratingScore,
        comment: ratingComment
      })).unwrap();
      setActionSuccess("Thank you! Rating submitted successfully.");
      setRateModalOpen(false);
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Button onClick={() => navigate('/my-appointments')} className="!mb-6 !text-gray-500 !normal-case">
        &larr; Back to Appointments
      </Button>

      {actionSuccess && <Alert severity="success" className="mb-6">{actionSuccess}</Alert>}

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Appointment Details</h1>
          <Chip label={getStatusLabel(appointment.status)} color={getStatusColor(appointment.status)} className="font-bold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Date & Time</p>
            <p className="text-lg text-gray-900">{new Date(appointment.date).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
              {isDoctor ? 'Patient Name' : 'Doctor Name'}
            </p>
            <p className="text-lg text-gray-900">{isDoctor ? appointment.patientName : appointment.doctorName}</p>
          </div>
        </div>

        <hr className="my-8 border-gray-100" />

        {/* RBAC Actions Zone */}
        <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>
        
        {isDoctor && (
          <div className="space-y-6">
            <FormControl size="small" className="w-64">
              <InputLabel>Update Status</InputLabel>
              <Select
                value={appointment.status}
                label="Update Status"
                onChange={handleStatusChange}
              >
                <MenuItem value={0}>Pending</MenuItem>
                <MenuItem value={1}>Confirmed</MenuItem>
                <MenuItem value={2}>Cancelled</MenuItem>
              </Select>
            </FormControl>

            <div className="pt-4">
              <Button 
                variant="contained" 
                onClick={() => setDiagnosisModalOpen(true)}
                className="!bg-indigo-600 hover:!bg-indigo-700 !shadow-none !normal-case"
              >
                Write Diagnosis
              </Button>
            </div>
          </div>
        )}

        {isPatient && (
          <div className="space-y-4">
            <Button 
              variant="outlined" 
              onClick={() => setRateModalOpen(true)}
              className="!text-indigo-600 !border-indigo-200 hover:!bg-indigo-50 !normal-case"
            >
              Rate Doctor
            </Button>
          </div>
        )}
      </div>

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
        <DialogTitle>Create Diagnosis</DialogTitle>
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
