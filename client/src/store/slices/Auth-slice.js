import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    token: null, // Add token field
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    console.log(state.token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    
      
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
