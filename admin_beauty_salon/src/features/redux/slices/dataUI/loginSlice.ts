import { createSlice } from "@reduxjs/toolkit";

const loginState: iLogin = {
  isLoggedIn: false,
  session: "",
};

// Initial state
const initialState = {
  info: loginState,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.info = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoggedIn } = loginSlice.actions;

export default loginSlice.reducer;
