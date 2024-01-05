import { createSlice } from "@reduxjs/toolkit";

// Creating initial state for the redux store
const initialState = {
  cart: [],

  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: "Mediterranean",
  //     quantity: 1,
  //     unitPrice: 16,
  //     totalPrice: 16,
  //   },
  // ],
};

// Creating the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Adding item to the cart
    addItem(state, action) {
      // Payload = new item
      state.cart.push(action.payload);
    },
    // Removing item from the cart
    deleteItem(state, action) {
      // Payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    // Increasing the quantity of the item
    increaseItemQuantity(state, action) {
      // Payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      // Increasing quantity and calculating total price
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    // Decreasing the quantity of the item
    decreaseItemQuantity(state, action) {
      // Payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      // Decreasing quantity and calculating total price
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    // Clearing the cart
    clearCart(state) {
      state.cart = [];
    },
  },
});

// Exporting the action creators
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

// Exporting the reducers as default
export default cartSlice.reducer;

// Selector functions to get the data from the Redux
//// "reselect" library can be used here to optimize these selectors in the larger apps

// Getting the cart
export const getCart = (state) => state.cart.cart;

// Getting the total quantity of items in the cart
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => (sum += item.quantity), 0);

// Getting the total price of the items in the cart
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => (sum += item.totalPrice), 0);
