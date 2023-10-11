import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addAccount: true,
  listAccount: false,
  editUserAccount: false,
  editMyAccount: false,
};

export const authComponentSlice = createSlice({
  name: "authComponent",
  initialState,
  reducers: {
    setAddAccount: (state) => {
      state.addAccount = true;
      state.listAccount = false;
      state.editUserAccount = false;
      state.editMyAccount = false;
    },
    setListAccount: (state) => {
      state.addAccount = false;
      state.listAccount = true;
      state.editUserAccount = false;
      state.editMyAccount = false;
    },
    setEditUserAccount: (state) => {
      state.addAccount = false;
      state.listAccount = false;
      state.editUserAccount = true;
      state.editMyAccount = false;
    },
    setEditMyAccount: (state) => {
      state.addAccount = false;
      state.listAccount = false;
      state.editUserAccount = false;
      state.editMyAccount = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAddAccount,
  setListAccount,
  setEditUserAccount,
  setEditMyAccount,
} = authComponentSlice.actions;

export default authComponentSlice.reducer;
