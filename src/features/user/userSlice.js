import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);

      localStorage.setItem("token", response.data.token);
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
