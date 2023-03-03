import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:5000/RevRater';

export const createRatingPost = createAsyncThunk(
  'post/createRatingPost',
  async (ratingPostRequest) => {
    try {
      const response = await axios.post(`${baseURL}/posts/rating`, ratingPostRequest);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const createCommentPost = createAsyncThunk(
  'post/createCommentPost',
  async (commentPostRequest) => {
    try {
      const response = await axios.post(`${baseURL}/posts/comment`, commentPostRequest);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const createReplyPost = createAsyncThunk(
  'post/createReplyPost',
  async (replyPostRequest) => {
    try {
      const response = await axios.post(`${baseURL}/posts/reply`, replyPostRequest);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getRatingPostsOfUser = createAsyncThunk(
  'post/getRatingPostsOfUser',
  async (id) => {
    try {
      const response = await axios.get(`${baseURL}/posts/${id}/user/ratings`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getCommentPostsOfUser = createAsyncThunk(
  'post/getCommentPostsOfUser',
  async (id) => {
    try {
      const response = await axios.get(`${baseURL}/posts/${id}/user/comments`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getReplyPostsOfUser = createAsyncThunk(
  'post/getReplyPostsOfUser',
  async (id) => {
    try {
      const response = await axios.get(`${baseURL}/posts/${id}/user/replies`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getPostsAboutEmployee = createAsyncThunk(
  'post/getPostsAboutEmployee',
  async (id) => {
    try {
      const response = await axios.get(`${baseURL}/posts/${id}/emp/posts`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getUserFeed = createAsyncThunk(
  'post/getUserFeed',
  async (id) => {
    try {
      const response = await axios.get(`${baseURL}/posts/${id}/user/feed`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getCommentsOfAPost = createAsyncThunk(
  'post/getCommentsOfAPost',
  async (id) => {
    try {
      const response = await axios.get(`${baseURL}/posts/${id}/post/comments`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getRepliesOfComment = createAsyncThunk(
  'post/getRepliesOfComment',
  async (id) => {
    try {
      const response = await axios.get(`${baseURL}/posts/${id}/comment/replies`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const editRatingPost = createAsyncThunk(
  'post/editRatingPost',
  async ({ ratingPostRequest, postId }) => {
    try {
      const response = await axios.put(`${baseURL}/posts/${postId}/post/edit`, ratingPostRequest);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const editCommentPost = createAsyncThunk(
  'post/editCommentPost',
  async ({ commentPostRequest, postId }) => {
    try {
      const response = await axios.put(`${baseURL}/posts/${postId}/comment/edit`, commentPostRequest);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const editReplyPost = createAsyncThunk(
  'post/editReplyPost',
  async ({ commentPostRequest, postId }) => {
    try {
      const response = await axios.put(`${baseURL}/posts/${postId}/reply/edit`, commentPostRequest);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const postSlice = createSlice({
    name: 'post',
    initialState: {
        ratingPost: null,
        commentPost: null,
        replyPost: null,
        ratingPostsOfUser: [],
        commentPostsOfUser: [],
        replyPostsOfUser: [],
        postsAboutEmployee: [],
        userFeed: [],
        postComments: [],
        commentReplies: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createRatingPost.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createRatingPost.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.ratingPost =action.payload;
        })
        .addCase(createRatingPost.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(createCommentPost.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createCommentPost.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.commentPost = action.payload;
        })
        .addCase(createCommentPost.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(createReplyPost.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createReplyPost.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.replyPost= action.payload;
        })
        .addCase(createReplyPost.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(getRatingPostsOfUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getRatingPostsOfUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.ratingPostsOfUser = action.payload;
        })
        .addCase(getRatingPostsOfUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(getCommentPostsOfUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getCommentPostsOfUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.commentPostsOfUser = action.payload;
        })
        .addCase(getCommentPostsOfUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(getReplyPostsOfUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getReplyPostsOfUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.replyPostsOfUser = action.payload;
        })
        .addCase(getReplyPostsOfUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(getPostsAboutEmployee.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getPostsAboutEmployee.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.postsAboutEmployee = action.payload;
        })
        .addCase(getPostsAboutEmployee.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(getUserFeed.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getUserFeed.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.userFeed = action.payload;
        })
        .addCase(getUserFeed.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(getCommentsOfAPost.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getCommentsOfAPost.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.postComments = action.payload;
        })
        .addCase(getCommentsOfAPost.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(getRepliesOfComment.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getRepliesOfComment.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.commentReplies = action.payload;
        })
        .addCase(getRepliesOfComment.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(editRatingPost.pending, (state) => {
        state.status = 'loading';
        })
        .addCase(editRatingPost.fulfilled, (state) => {
        state.status = 'succeeded';
        })
        .addCase(editRatingPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        })
        .addCase(editCommentPost.pending, (state) => {
        state.status = 'loading';
        })
        .addCase(editCommentPost.fulfilled, (state) => {
        state.status = 'succeeded';
        })
        .addCase(editCommentPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        })
        .addCase(editReplyPost.pending, (state) => {
        state.status = 'loading';
        })
        .addCase(editReplyPost.fulfilled, (state) => {
        state.status = 'succeeded';
        })
        .addCase(editReplyPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        });
    },
});

export default postSlice.reducer;

