import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState : {
    items: [],
		restaurant: null,
    tipAmount : 0
  },
  reducers: {
    addToCart: (
      state,
      action
    ) => {
      if (state.restaurant === null) {
        state.restaurant = action.payload.resCart;
        state.items.push(action.payload.item);
      } else if (state.restaurant.id !== action.payload.resCart.id) {
        state.restaurant = action.payload.resCart;
        state.items = [action.payload.item];
      } else {
        state.items.push(action.payload.item);
      }
    },
    increaseCount: (state, action) => {
      state.items.forEach((item) => {
        if (item[0]?.id === action.payload) {
          item[1]++;
        }
      });
    },
    decreaseCount: (state, action) => {
      state.items.forEach((item, idx) => {
        if (item[0].id === action.payload) {
          item[1]--;
          if (item[1] === 0) {
            state.items.splice(idx, 1);
          }
        }
        if (state.items.length === 0) {
          state.restaurant = null;
          state.tipAmount = 0;
        }
      });
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurant = null;
      state.tipAmount = 0;
    },
    addTip: (state, action) => {
      state.tipAmount = action.payload;
    },
    deleteTip: (state) => {
      state.tipAmount = 0;
    },
  },
});

export const {
  addToCart,
  increaseCount,
  decreaseCount,
  clearCart,
  addTip,
  deleteTip,
} = cartSlice.actions;

export default cartSlice.reducer;
