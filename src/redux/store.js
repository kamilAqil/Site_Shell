import { configureStore } from "@reduxjs/toolkit";
import pageWrapperReducer from "src/redux/pageWrapperSlice.js";
const store = configureStore({
  reducer: {
    
    width: pageWrapperReducer
  },
});

export default store;
