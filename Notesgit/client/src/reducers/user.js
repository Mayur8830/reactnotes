import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    userloading:true,
    blurActive:false
};

export const userReducer  = createReducer(initialState,{
    LoginRequest:(state) => {
        state.loading = true;
     },
    
     LoginSuccess:(state,action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated =true;
     },
    
     LoginFailure:(state,action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated =false
     },
    
     ClearError : (state) => {
        state.error =  "" 
     },

     RegisterRequest:(state) => {
        state.loading = true;
     },
    
     RegisterSuccess:(state,action) => {
        state.loading = false;
        state.user = action.payload;
     },
    
     RegisterFailure:(state,action) => {
        state.loading = false;
        state.error = action.payload;
     },
    
    
     LoadUserRequest:(state) => {
        state.userloading = true;
     },
    
     LoadUserSuccess:(state,action) => {
        state.userloading = false;
        state.user = action.payload;
        state.isAuthenticated =true
     },
    
     LoadUserFailure:(state,action) => {
         state.userloading = false;
         state.error = action.payload;
         state.isAuthenticated =false
     },
    
    
     LogoutUserRequest:(state) => {
       state.loading = true;
    },
    
    LogoutUserSuccess:(state,action) => {
       state.loading = false;
       state.user = null;
       state.isAuthenticated =false;
    },
    
    LogoutUserFailure:(state,action) => {
       state.loading = false;
       state.error = action.payload;
       state.isAuthenticated =true;
    },
    
    BlurActive:(state,action) => {
      state.blurActive = action.payload;
  },
})