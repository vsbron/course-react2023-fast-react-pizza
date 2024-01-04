import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";

// Creating the store and adding the reducers to it
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

// Exporting the store
export default store;
