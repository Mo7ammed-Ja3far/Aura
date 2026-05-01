import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import doctorsReducer from "./slices/doctorsSlice";
import profileReducer from "./slices/profileSlice";
import appointmentsReducer from "./slices/appointmentsSlice";
import clinicalReducer from "./slices/clinicalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer,
    profile: profileReducer,
    appointments: appointmentsReducer,
    clinical: clinicalReducer,
  },
});
