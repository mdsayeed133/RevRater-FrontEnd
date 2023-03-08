import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const baseURL = "http://localhost:5000/RevRater";



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
      const response =await axios.get(`${baseURL}/users/${search}/search`);
      return response.data;
    } catch (error) {
      
      throw new Error(error);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (passwordResetRequest) => {
    try {
      const response = await axios.put(`${baseURL}/users/updatePassword`,passwordResetRequest);
      if(response.status===200){
        return "password reseted :)";
      } else{
        return "password not reseted :("; 
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const followEmployee = createAsyncThunk(
  "user/follow",
  async (followRequest) => {
    try {
      const response = await axios.put(`${baseURL}/users/follow`,followRequest);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const unfollowEmployee = createAsyncThunk(
  "user/unfollow",
  async (followRequest) => {
    try {
      const response = await axios.put(`${baseURL}/users/unfollow`, followRequest);
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
      const response = await axios.put(`${baseURL}/users/isFollowing`,followRequest);
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);


const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    followedEmployees: [],
    searchResults: null,
    followMessage: "",
    resetMessage:"",
    isFollowing: false,
    status: "idle",
    error: null
  },
  reducers: {
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
        //state.isFollowing=true;
        state.followMessage = action.payload;
      })
      .addCase(unfollowEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        //state.isFollowing= false;
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
      .addCase(updatePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.resetMessage = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
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
  setFollowMessage,
  setIsFollowing,
  resetMessage,
  resetStatus
} = userSlice.actions;

export default userSlice.reducer;