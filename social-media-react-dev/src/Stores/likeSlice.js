import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:5000/RevRater';

export const likePost = createAsyncThunk(
  'like/likePost',
  async (likeDTO) => {
    try {
      await axios.post(`${baseURL}/likes/like`, likeDTO);
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getLikesAmount = createAsyncThunk(
  'like/getLikesAmount',
  async (postId) => {
    try {
      const response = await axios.get(`${baseURL}/likes/${postId}/amount`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const likeSlice = createSlice({
  name: 'like',
  initialState: {
    likesAmount: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(likePost.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getLikesAmount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLikesAmount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.likesAmount = action.payload;
      })
      .addCase(getLikesAmount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default likeSlice.reducer;
