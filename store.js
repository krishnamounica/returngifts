import { configureStore, createSlice } from '@reduxjs/toolkit';

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity--;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

// User slice for login
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    saveUserData(state, action) {
      state.user = action.payload;
    },
    clearUserData(state) {
      state.user = null;
    },
    updateRequests(state, action) {
      if (state.user) {
        state.user.requests = action.payload; // Update the requests in user data
      }
    },
  },
});

export const { saveUserData, clearUserData, updateRequests } = userSlice.actions;
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Combine slices in the store
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;





