import { createSlice } from "@reduxjs/toolkit";

// Creating initial state for the redux store
const initialState = {
  cart: [
    {
      pizzaId: 12,
      name: "Mediterranean",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
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
