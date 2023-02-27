import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
//const axios = require("axios");

const baseURL = "http://localhost:5000/RevRater";

const initialState = {
  user: {},
  followedEmployees: [],
  searchResults: [],
  isFollowing: false,
  status: "idle",
  error: null
};

export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (id) => {
    try {
      const response = await axios.get(`${baseURL}/users/${id}/id`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const fetchFollowedEmployees = createAsyncThunk(
  "user/fetchFollowedEmployees",
  async (userId) => {
    try {
      const response = await axios.get(`${baseURL}/users/followed/${userId}/id`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const searchUsers = createAsyncThunk(
  "user/search",
  async (search) => {
    try {
      const response = await axios.get(`${baseURL}/users/${search}/search`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const followEmployee = createAsyncThunk(
  "user/follow",
  async (followRequest) => {
    try {
      const response = await axios.put(`${baseURL}/users/follow`, followRequest);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const unfollowEmployee = createAsyncThunk(
  "user/unfollow",
  async (unfollowRequest) => {
    try {
      const response = await axios.put(`${baseURL}/users/unfollow`, unfollowRequest);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const checkIsFollowing = createAsyncThunk(
  "user/checkIsFollowing",
  async (followRequest) => {
    try {
      const response = await axios.get(`${baseURL}/users/isFollowing`, { data: followRequest });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);


const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFollowedEmployees: (state, action) => {
      state.followedEmployees = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setIsFollowing: (state, action) => {
      state.isFollowing = action.payload;
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  }
});

export const {
  setUser,
  setFollowedEmployees,
  setSearchResults,
  setIsFollowing,
  resetStatus
} = userSlice.actions;

export default userSlice.reducer;