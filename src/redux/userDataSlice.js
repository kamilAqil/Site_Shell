import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  user: undefined,
};
const userDataSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUserData(state, action) {
      state.user = action.payload;
    },
    resetUserData(state, action) {
      state.user = undefined;
    },
  },
});



export const getUser = state => state.user

export const { setUserData, resetUserData } = userDataSlice.actions;
export default userDataSlice.reducer;


