import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/authSlice';
import { registerSchema, Role, Gender } from '../api/schemas';
import { useNavigate, Link } from 'react-router-dom';
import {
  TextField, Button, CircularProgress, Alert,
  MenuItem, Select, FormControl, FormHelperText,
  RadioGroup, FormControlLabel, Radio, FormLabel
} from '@mui/material';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: Role.Patient,
      gender: Gender.Male,
      appointmentPrice: 0,
      specializationId: 1
    }
  });

  const selectedRole = watch('role');

  useEffect(() => {
    if (selectedRole !== Role.Doctor) {
      setValue('appointmentPrice', 0);
      setValue('specializationId', 1);
    }
  }, [selectedRole, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      role: Number(data.role),
      gender: Number(data.gender),
      specializationId: Number(data.specializationId),
      appointmentPrice: Number(data.appointmentPrice),
    };
    
    const resultAction = await dispatch(registerUser(payload));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-86px)] bg-white items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-500 text-sm">Please sign up to book appointment</p>
        </div>

        {error && <Alert severity="error" className="mb-6 rounded-lg">{error}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <TextField size="small" {...register('name')} error={!!errors.name} helperText={errors.name?.message} fullWidth />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <TextField size="small" type="email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} fullWidth />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <TextField size="small" type="password" {...register('password')} error={!!errors.password} helperText={errors.password?.message} fullWidth />
          </div>

          {/* API Driven Fields */}
          <div className="pt-2">
            <FormControl fullWidth error={!!errors.role} size="small">
              <label className="block text-sm text-gray-600 mb-1">Account Type</label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value={Role.Patient}>Patient</MenuItem>
                    <MenuItem value={Role.Doctor}>Doctor</MenuItem>
                    <MenuItem value={Role.Secretary}>Secretary</MenuItem>
                  </Select>
                )}
              />
              {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
            </FormControl>
          </div>

          <div>
            <FormControl component="fieldset" error={!!errors.gender}>
              <FormLabel component="legend" className="!text-sm !text-gray-600 !mb-1">Gender</FormLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <RadioGroup row {...field} className="!mt-0">
                    <FormControlLabel value={Gender.Male} control={<Radio size="small" />} label={<span className="text-sm text-gray-700">Male</span>} />
                    <FormControlLabel value={Gender.Female} control={<Radio size="small" />} label={<span className="text-sm text-gray-700">Female</span>} />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </div>

          {selectedRole === Role.Doctor && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-4 mt-2">
              <h3 className="text-xs font-bold text-gray-500 uppercase">Doctor Details</h3>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Specialization ID</label>
                <TextField size="small" type="number" {...register('specializationId', { valueAsNumber: true })} error={!!errors.specializationId} fullWidth />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Appointment Price ($)</label>
                <TextField size="small" type="number" {...register('appointmentPrice', { valueAsNumber: true })} error={!!errors.appointmentPrice} fullWidth />
              </div>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            className="!mt-6 h-12 !rounded-md !bg-indigo-500 hover:!bg-indigo-600 !text-white !font-medium !text-base transition-colors !shadow-none hover:!shadow-none !normal-case"
          >
            {isLoading ? <CircularProgress size={24} className="!text-white" /> : 'Create account'}
          </Button>

          <p className="text-sm text-gray-600 mt-6">
            Already have an account? <Link to="/login" className="text-indigo-500 hover:underline">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
