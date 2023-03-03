import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:5000/RevRater';

export const getEmployeeAvgRating = createAsyncThunk(
  'rating/getEmployeeAvgRating',
  async (employeeId) => {
    try {
      const response = await axios.get(`${baseURL}/rating/employee/${employeeId}/average`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getTop3TagsOfEmployee = createAsyncThunk(
  'rating/getTop3TagsOfEmployee',
  async (employeeId) => {
    try {
      const response = await axios.get(`${baseURL}/rating/employee/${employeeId}/top3tags`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getTop3Employees = createAsyncThunk(
  'rating/getTop3Employees',
  async () => {
    try {
      const response = await axios.get(`${baseURL}/rating/top3employees`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const ratingSlice = createSlice({
  name: 'rating',
  initialState: {
    employeeAvgRating: null,
    top3Tags: [],
    top3Employees: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeAvgRating.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEmployeeAvgRating.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employeeAvgRating = action.payload;
      })
      .addCase(getEmployeeAvgRating.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getTop3TagsOfEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTop3TagsOfEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.top3Tags = action.payload;
      })
      .addCase(getTop3TagsOfEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getTop3Employees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTop3Employees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.top3Employees = action.payload;
      })
      .addCase(getTop3Employees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default ratingSlice.reducer;
