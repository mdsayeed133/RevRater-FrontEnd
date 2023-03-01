import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const baseURL = "http://localhost:5000/RevRater";

const initialState = {
  user: {},
  followedEmployees: [],
  searchResults: [],
  followMessage: "",
  isFollowing: false,
  status: "idle",
  error: null
};

export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (id) => {
    try {
      const response = await axios.get(`${baseURL}/users/${id}/id`);
      //console.log(response.data);
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
  initialState: initialState,
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
    setFollowMessage:(state,action) =>{
      state.followMessage= action.payload;
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
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFollowedEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFollowedEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.followedEmployees = action.payload;
      })
      .addCase(fetchFollowedEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(followEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(unfollowEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(followEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.followMessage = action.payload;
      })
      .addCase(unfollowEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.followMessage = action.payload;
      })
      .addCase(followEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(unfollowEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchUsers.pending, (state) => {
        state.status = "loading";
      }) 
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(checkIsFollowing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkIsFollowing.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isFollowing = action.payload;
      })
      .addCase(checkIsFollowing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      ;
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