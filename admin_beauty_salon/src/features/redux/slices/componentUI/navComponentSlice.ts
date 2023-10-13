import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  table: true,
  detailCategory: false,
  createPost: false,
};

export const navComponentSlice = createSlice({
  name: "authComponent",
  initialState,
  reducers: {
    setTable: (state) => {
      state.table = true;
      state.detailCategory = false;
      state.createPost = false;
    },
    setDetailCategory: (state) => {
      state.table = false;
      state.detailCategory = true;
      state.createPost = false;
    },
    setCreatePost: (state) => {
      state.table = false;
      state.detailCategory = false;
      state.createPost = true;
    },
  },
});

export const { setTable, setDetailCategory, setCreatePost } =
  navComponentSlice.actions;

export default navComponentSlice.reducer;
