import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/**
 * @typedef {Object} Doctor
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} specializationName
 * @property {string} clinicLocation
 * @property {string} contactInfo
 * @property {number} appointmentPrice
 * @property {number} ratings
 * @property {string[]} symptoms
 */

/**
 * @typedef {Object} DoctorsState
 * @property {Doctor[]} list
 * @property {boolean} isLoading
 * @property {string|null} error
 */

export const fetchDoctors = createAsyncThunk(
  "doctors/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/doctors");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch doctors");
    }
  }
);

export const fetchDoctorsBySpecialization = createAsyncThunk(
  "doctors/fetchBySpecialization",
  async (specName, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/doctors/specialization/${specName}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || `Failed to fetch ${specName} doctors`);
    }
  }
);

export const searchDoctorsByName = createAsyncThunk(
  "doctors/searchByName",
  async (name, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/doctors/search-by-name/${name}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Search failed");
    }
  }
);

export const searchDoctorsBySymptom = createAsyncThunk(
  "doctors/searchBySymptom",
  async (symptomName, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/doctors/search-by-symptom/${symptomName}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Search failed");
    }
  }
);

export const recommendDoctors = createAsyncThunk(
  "doctors/recommend",
  async (symptomSearchDto, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/patients/recommend-doctors", symptomSearchDto);
      return response.data; // List of doctors
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Recommendation failed");
    }
  }
);

/** @type {DoctorsState} */
const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchDoctors
      .addCase(fetchDoctors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // fetchDoctorsBySpecialization
      .addCase(fetchDoctorsBySpecialization.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsBySpecialization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchDoctorsBySpecialization.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // searchDoctorsByName
      .addCase(searchDoctorsByName.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(searchDoctorsByName.fulfilled, (state, action) => { state.isLoading = false; state.list = action.payload; })
      .addCase(searchDoctorsByName.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      // searchDoctorsBySymptom
      .addCase(searchDoctorsBySymptom.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(searchDoctorsBySymptom.fulfilled, (state, action) => { state.isLoading = false; state.list = action.payload; })
      .addCase(searchDoctorsBySymptom.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      // recommendDoctors
      .addCase(recommendDoctors.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(recommendDoctors.fulfilled, (state, action) => { state.isLoading = false; state.list = action.payload; })
      .addCase(recommendDoctors.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
  },
});

export default doctorsSlice.reducer;
