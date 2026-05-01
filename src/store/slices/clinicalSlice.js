import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchMedicalRecord = createAsyncThunk(
  "clinical/fetchMedicalRecord",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/patients/my-medical-record");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch medical record");
    }
  }
);

export const fetchMyPatients = createAsyncThunk(
  "clinical/fetchMyPatients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/doctors/my-patients");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch patients");
    }
  }
);

export const createDiagnosis = createAsyncThunk(
  "clinical/createDiagnosis",
  async (diagnosisData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/diagnoses/create", diagnosisData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create diagnosis");
    }
  }
);

export const rateDoctor = createAsyncThunk(
  "clinical/rateDoctor",
  async (ratingData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/patients/rate-doctor", ratingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to submit rating");
    }
  }
);

export const reExamine = createAsyncThunk(
  "clinical/reExamine",
  async (reExamData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/diagnoses/re-examine", reExamData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to submit re-examination");
    }
  }
);

const initialState = {
  medicalRecord: null,
  myPatients: [],
  isLoading: false,
  error: null,
};

const clinicalSlice = createSlice({
  name: "clinical",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicalRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMedicalRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.medicalRecord = action.payload;
      })
      .addCase(fetchMyPatients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyPatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myPatients = action.payload;
      });
  },
});

export default clinicalSlice.reducer;
