import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:5000/RevRater';

export const getEmployeeById = createAsyncThunk(
  'employee/getEmployeeById',
  async (id) => {
    try {
      const response = await axios.get(`${baseURL}/employee/${id}/id`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getAllEmployees = createAsyncThunk(
  'employee/getAllEmployees',
  async () => {
    try {
      const response = await axios.get(`${baseURL}/employee`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const createEmployee = createAsyncThunk(
  'employee/createEmployee',
  async (employeeData) => {
    try {
      const response = await axios.post(`${baseURL}/employee`, employeeData);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const searchEmployees = createAsyncThunk(
  'employee/searchEmployees',
  async (searchTerm) => {
    try {
      const response = await axios.get(`${baseURL}/employee/${searchTerm}/search`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employee: null,
    createdEmployee: null,
    allEmployees: [],
    searchResults: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employee = action.payload;
      })
      .addCase(getEmployeeById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAllEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allEmployees = action.payload;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.createdEmployee = action.payload;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
