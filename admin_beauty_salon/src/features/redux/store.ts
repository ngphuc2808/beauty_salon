import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import loginReducer from "./slices/dataUI/loginSlice";
import userReducer from "./slices/dataUI/userSlice";
import editUserReducer from "./slices/dataUI/editUserSlice";

import authComponentReducer from "./slices/componentUI/authComponentSlice";
import componentReducer from "./slices/componentUI/componentSlice";
import navComponentReducer from "./slices/componentUI/navComponentSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, loginReducer);

export const store = configureStore({
  reducer: {
    login: persistedReducer,
    user: userReducer,
    editUser: editUserReducer,
    navComponent: navComponentReducer,
    authComponent: authComponentReducer,
    component: componentReducer,
  },
  middleware: [thunk],
});

export const persistStor = persistStore(store);

export default store;
