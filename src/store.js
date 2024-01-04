import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";

// Creating the store and adding the reducers to it
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Exporting the store
export default store;
