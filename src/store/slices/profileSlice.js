import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchDoctorProfile = createAsyncThunk(
  "profile/fetchDoctor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/doctors/my-profile"); // Assume GET exists for profile, if not use id
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

export const fetchPatientProfile = createAsyncThunk(
  "profile/fetchPatient",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/patients/my-profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

export const updateDoctorProfile = createAsyncThunk(
  "profile/updateDoctor",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.put("/api/doctors/my-profile", profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

export const updatePatientProfile = createAsyncThunk(
  "profile/updatePatient",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.put("/api/patients/my-profile", profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/change-password", passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to change password");
    }
  }
);

export const addSecretary = createAsyncThunk(
  "profile/addSecretary",
  async (secretaryData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/doctors/add-secretary", secretaryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add secretary");
    }
  }
);

export const removeSecretary = createAsyncThunk(
  "profile/removeSecretary",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/doctors/remove-secretary/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove secretary");
    }
  }
);

const initialState = {
  data: null,
  isLoading: false,
  isUpdating: false,
  error: null,
  updateSuccess: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateSuccess = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Update Doctor Profile
      .addCase(updateDoctorProfile.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateDoctorProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.data = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updateDoctorProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })
      // Update Patient Profile
      .addCase(updatePatientProfile.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.data = action.payload;
        state.updateSuccess = true;
      })
      .addCase(updatePatientProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isUpdating = false;
        state.updateSuccess = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })
      // Add Secretary
      .addCase(addSecretary.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(addSecretary.fulfilled, (state) => {
        state.isUpdating = false;
        state.updateSuccess = true;
      })
      .addCase(addSecretary.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })
      // Remove Secretary
      .addCase(removeSecretary.fulfilled, (state) => {
        state.updateSuccess = true;
      });
  },
});

export const { resetUpdateStatus } = profileSlice.actions;
export default profileSlice.reducer;
