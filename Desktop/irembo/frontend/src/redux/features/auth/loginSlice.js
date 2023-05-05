import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'user',
  initialState: {
    value: '',
  },
  reducers: {
    logginUser: (state, user) => ({
      user,
    }),
    loggoutUser: (state) => ({
      value: '',
    }),
  },
});

export const { logginUser, loggoutUser } = loginSlice.actions;
export const thisUser = (state) => state.login;

export default loginSlice.reducer;