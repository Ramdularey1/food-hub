import { configureStore } from "@reduxjs/toolkit";
import userLocationSlice from "./userLocationSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer : {
        "userLocation" : userLocationSlice,
        "cart" : cartSlice,
    }
})

export default store;