import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: 26.8912141,
  longitude: 81.0648758,
  city: "Lucknow",
};

const userLocationSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.city = action.payload.city;
    },
  },
});

export const { setLocation } = userLocationSlice.actions;
export default userLocationSlice.reducer;
