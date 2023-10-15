import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/dataUI/userSlice";
import editUserReducer from "./slices/dataUI/editUserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    editUser: editUserReducer,
  },
});

export default store;
