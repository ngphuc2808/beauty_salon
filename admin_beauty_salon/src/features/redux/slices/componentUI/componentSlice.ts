import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navigationComponent: true,
  authComponent: false,
};

export const componentSlice = createSlice({
  name: "authComponent",
  initialState,
  reducers: {
    setNavComponent: (state) => {
      state.navigationComponent = true;
      state.authComponent = false;
    },
    setAuthComponent: (state) => {
      state.navigationComponent = false;
      state.authComponent = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNavComponent, setAuthComponent } = componentSlice.actions;

export default componentSlice.reducer;
