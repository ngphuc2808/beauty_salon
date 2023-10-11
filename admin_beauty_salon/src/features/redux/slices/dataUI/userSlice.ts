import { createSlice } from "@reduxjs/toolkit";

const userInfoInitialState: iUserInfo = {
  id: "",
  username: "",
  fullName: "",
  email: "",
  phone: "",
  status: false,
  role: "employee",
  slug: "",
  avatar: "",
};

// Initial state
const initialState = {
  info: userInfoInitialState,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInfoUser: (state, action) => {
      state.info = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInfoUser } = userSlice.actions;

export default userSlice.reducer;
