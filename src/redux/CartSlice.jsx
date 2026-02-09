import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [] // each item: { id, name, price, image, category, quantity }
};

const findIndexById = (items, id) => items.findIndex((i) => i.id === id);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const idx = findIndexById(state.items, product.id);
      if (idx === -1) {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    incrementQty: (state, action) => {
      const id = action.payload;
      const idx = findIndexById(state.items, id);
      if (idx !== -1) state.items[idx].quantity += 1;
    },
    decrementQty: (state, action) => {
      const id = action.payload;
      const idx = findIndexById(state.items, id);
      if (idx !== -1) {
        state.items[idx].quantity -= 1;
        if (state.items[idx].quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, incrementQty, decrementQty, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalAmount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;

