import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("usreInfo")
    ? JSON.parse(localStorage.getItem("usreInfo"))
    : null,
};

const userSlice = createSlice({
   name: "user", 
   initialState, 
   reducers:{
     setCred: (state, action)=>{
        state.userInfo = action.payload
        localStorage.setItem('userInfo', JSON.stringify(action.payload))
     },
     remCred: (state)=>{
        state.userInfo = null
        localStorage.removeItem('userInfo')
     }
   }
});

export const {setCred, remCred} = userSlice.actions

export default userSlice.reducer