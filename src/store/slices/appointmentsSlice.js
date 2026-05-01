import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchMyAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/appointments/my-appointments");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch appointments");
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  "appointments/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/appointments/${id}/status`, { status });
      return { id, status, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update appointment status");
    }
  }
);

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchMyAppointments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchMyAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Status
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        const index = state.list.findIndex(app => app.id === action.payload.id);
        if (index !== -1) {
          state.list[index].status = action.payload.status;
        }
      });
  },
});

export default appointmentsSlice.reducer;
