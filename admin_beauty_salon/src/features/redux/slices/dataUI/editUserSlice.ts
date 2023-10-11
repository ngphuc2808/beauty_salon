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

export const editUserSlice = createSlice({
  name: "editUser",
  initialState,
  reducers: {
    setEditInfoUser: (state, action) => {
      state.info = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEditInfoUser } = editUserSlice.actions;

export default editUserSlice.reducer;
