import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AuthGuard = () => {
  const { user, token, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

  if (!token || !user) {
    // Not logged in, redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authorized so return child components
  return <Outlet />;
};

export const GuestGuard = () => {
  const { user, token } = useSelector((state) => state.auth);

  if (token && user) {
    // Already logged in, redirect to home or dashboard
    return <Navigate to="/" replace />;
  }

  // Guest so return child components
  return <Outlet />;
};
