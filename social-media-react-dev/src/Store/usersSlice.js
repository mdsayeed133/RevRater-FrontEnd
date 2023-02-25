import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import axios from "axios"

const initialState = {
    user: {},

};

export const felchUserById= createAsyncThunk(
    "user/felchById",
    async(id)=> {
        try{
            const response= await axios.get(`localhost:5000/RevRater/users/${id}/id`);
            return response.data;
        } catch(error){
            throw new Error(error);
        }
    }
 )

const userSlice = createSlice({ 
    name: "users", 
    initialState,
reducers: {}, 
extraReducers(builder) {builder.addCase} });

export const {}= userSlice.actions

export default userSlice.reducer

