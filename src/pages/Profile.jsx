import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorProfile, fetchPatientProfile, updateDoctorProfile, updatePatientProfile, changePassword, resetUpdateStatus, addSecretary, removeSecretary } from '../store/slices/profileSlice';
import { fetchMedicalRecord, fetchMyPatients } from '../store/slices/clinicalSlice';
import { useForm } from 'react-hook-form';
import { Button, TextField, CircularProgress, Alert, Tabs, Tab, Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

// TabPanel Utility
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data: profileData, isUpdating, error, updateSuccess } = useSelector((state) => state.profile);
  const { medicalRecord, myPatients, isLoading: clinicalLoading } = useSelector((state) => state.clinical);

  const [tabValue, setTabValue] = useState(0);
  const isDoctor = user?.role === 'Doctor';
  const isPatient = user?.role === 'Patient';

  const { register: regProfile, handleSubmit: handleProfileSubmit, reset: resetProfile } = useForm();
  const { register: regPwd, handleSubmit: handlePwdSubmit, reset: resetPwd } = useForm();

  useEffect(() => {
    if (isDoctor) {
      dispatch(fetchDoctorProfile());
      dispatch(fetchMyPatients());
    } else if (isPatient) {
      dispatch(fetchPatientProfile());
      dispatch(fetchMedicalRecord());
    }
  }, [dispatch, isDoctor, isPatient]);

  useEffect(() => {
    if (profileData) {
      resetProfile(profileData);
    }
  }, [profileData, resetProfile]);

  useEffect(() => {
    return () => {
      dispatch(resetUpdateStatus());
    };
  }, [dispatch]);

  const onProfileSave = (data) => {
    if (isDoctor) dispatch(updateDoctorProfile(data));
    if (isPatient) dispatch(updatePatientProfile(data));
  };

  const onPasswordChange = (data) => {
    dispatch(changePassword(data));
    resetPwd();
  };

  const [secretaryEmail, setSecretaryEmail] = useState("");
  const handleAddSecretary = (e) => {
    e.preventDefault();
    if (secretaryEmail) {
      dispatch(addSecretary({ email: secretaryEmail }));
      setSecretaryEmail("");
    }
  };

  const handleRemoveSecretary = (id) => {
    if (window.confirm("Remove this secretary?")) {
      dispatch(removeSecretary(id));
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        if (isDoctor) await api.delete('/api/doctors/delete-my-account');
        if (isPatient) await api.delete('/api/patients/delete-my-profile');
        dispatch(logout());
        navigate('/login');
      } catch (err) {
        alert("Failed to delete account");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500">Manage your account settings and preferences.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 2 }}>
          <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)} textColor="primary" indicatorColor="primary" variant="scrollable" scrollButtons="auto">
            <Tab label="Personal Info" />
            <Tab label="Security" />
            {isDoctor && <Tab label="My Patients" />}
            {isDoctor && <Tab label="Secretaries" />}
            {isPatient && <Tab label="Medical Record" />}
          </Tabs>
        </Box>

        {/* --- TAB 1: Profile Update --- */}
        <TabPanel value={tabValue} index={0}>
          <div className="p-6 max-w-2xl">
            {updateSuccess && <Alert severity="success" className="mb-6">Profile updated successfully!</Alert>}
            {error && <Alert severity="error" className="mb-6">{error}</Alert>}

            <form onSubmit={handleProfileSubmit(onProfileSave)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                  <TextField fullWidth size="small" {...regProfile('name')} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email</label>
                  <TextField fullWidth size="small" disabled {...regProfile('email')} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Age</label>
                  <TextField fullWidth size="small" type="number" {...regProfile('age')} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                  <TextField fullWidth size="small" {...regProfile('phone')} />
                </div>
              </div>

              {isDoctor && (
                <>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Clinic Location</label>
                    <TextField fullWidth size="small" {...regProfile('clinicLocation')} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">About Me</label>
                    <TextField fullWidth size="small" multiline rows={4} {...regProfile('about')} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Appointment Price ($)</label>
                    <TextField fullWidth size="small" type="number" {...regProfile('appointmentPrice')} />
                  </div>
                </>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={isUpdating}
                  className="!bg-indigo-600 hover:!bg-indigo-700 !shadow-none !px-8"
                >
                  {isUpdating ? <CircularProgress size={24} className="!text-white" /> : "Save Changes"}
                </Button>

                <Button 
                  color="error" 
                  onClick={handleDeleteAccount}
                  className="!text-red-500 hover:!bg-red-50"
                >
                  Delete Account
                </Button>
              </div>
            </form>
          </div>
        </TabPanel>

        {/* --- TAB 2: Security --- */}
        <TabPanel value={tabValue} index={1}>
          <div className="p-6 max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
            <form onSubmit={handlePwdSubmit(onPasswordChange)} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Current Password</label>
                <TextField fullWidth size="small" type="password" {...regPwd('oldPassword', { required: true })} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">New Password</label>
                <TextField fullWidth size="small" type="password" {...regPwd('newPassword', { required: true })} />
              </div>
              <Button type="submit" variant="contained" disabled={isUpdating} className="!bg-indigo-600 !mt-4">
                Update Password
              </Button>
            </form>
          </div>
        </TabPanel>

        {/* --- TAB 3: Doctor Only - My Patients --- */}
        {isDoctor && (
          <TabPanel value={tabValue} index={2}>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Registered Patients</h3>
              {clinicalLoading ? <CircularProgress /> : (
                myPatients?.length > 0 ? (
                  <ul className="divide-y divide-gray-100 border border-gray-100 rounded-lg">
                    {myPatients.map(p => (
                      <li key={p.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                        <div>
                          <p className="font-bold text-gray-900">{p.name}</p>
                          <p className="text-sm text-gray-500">{p.email}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-gray-500">No patients found.</p>
              )}
            </div>
          </TabPanel>
        )}

        {/* --- TAB 4: Doctor Only - Secretaries --- */}
        {isDoctor && (
          <TabPanel value={tabValue} index={3}>
            <div className="p-6 max-w-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Manage Secretaries</h3>
              
              <form onSubmit={handleAddSecretary} className="flex gap-2 mb-8">
                <TextField 
                  size="small" 
                  fullWidth 
                  placeholder="Secretary Email" 
                  value={secretaryEmail}
                  onChange={(e) => setSecretaryEmail(e.target.value)}
                />
                <Button type="submit" variant="contained" className="!bg-indigo-600 !shadow-none">Add</Button>
              </form>

              {/* Assuming profileData.secretaries exists, otherwise this is a placeholder UI */}
              <div className="space-y-3">
                {profileData?.secretaries?.length > 0 ? (
                  profileData.secretaries.map(sec => (
                    <div key={sec.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg bg-gray-50">
                      <span>{sec.email}</span>
                      <IconButton color="error" onClick={() => handleRemoveSecretary(sec.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No secretaries registered.</p>
                )}
              </div>
            </div>
          </TabPanel>
        )}

        {/* --- TAB 3: Patient Only - Medical Record --- */}
        {isPatient && (
          <TabPanel value={tabValue} index={2}>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">My Medical History</h3>
              {clinicalLoading ? <CircularProgress /> : (
                medicalRecord?.diagnoses?.length > 0 ? (
                  <div className="space-y-4">
                    {medicalRecord.diagnoses.map((diag, i) => (
                      <div key={i} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                        <p className="font-bold text-gray-800">Date: {new Date(diag.date).toLocaleDateString()}</p>
                        <p className="text-gray-700 mt-2"><strong>Details:</strong> {diag.details}</p>
                        <p className="text-gray-700 mt-1"><strong>Prescription:</strong> {diag.prescription}</p>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-gray-500">No medical records found.</p>
              )}
            </div>
          </TabPanel>
        )}

      </div>
    </div>
  );
}
