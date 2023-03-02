import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:5000/RevRater';

export const login = createAsyncThunk(
  'auth/login',
  async (loginRequest) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, loginRequest);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      const response = await axios.post(`${baseURL}/auth/logout`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (registerRequest) => {
    try {
      const response = await axios.post(`${baseURL}/auth/register`, registerRequest);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userCurr: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userCurr = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = {};
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
