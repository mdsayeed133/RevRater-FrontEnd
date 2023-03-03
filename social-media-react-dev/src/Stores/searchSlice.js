import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:5000/RevRater';

export const searchEmployees = createAsyncThunk(
  'employee/searchEmployees',
  async (searchRequest) => {
    try {
      const response = await axios.put(`${baseURL}/employee/advance/search`, searchRequest);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export default searchSlice.reducer;
