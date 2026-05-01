import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { loginSchema } from '../api/schemas';
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const resultAction = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-86px)] bg-white items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>
          <p className="text-gray-500 text-sm">Please login to book appointment</p>
        </div>

        {error && (
          <Alert severity="error" className="mb-6 rounded-lg">{error}</Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <TextField
              fullWidth
              type="password"
              variant="outlined"
              size="small"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            className="!mt-6 h-12 !rounded-md !bg-indigo-500 hover:!bg-indigo-600 !text-white !font-medium !text-base transition-colors !shadow-none hover:!shadow-none !normal-case"
          >
            {isLoading ? <CircularProgress size={24} className="!text-white" /> : 'Login'}
          </Button>

          <p className="text-sm text-gray-600 mt-6">
            Don't have an account? <Link to="/signup" className="text-indigo-500 hover:underline">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
