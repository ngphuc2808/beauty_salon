import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import store from "./features/redux/store.ts";
import App from "./main/App.tsx";
import "./main/global.css";
import { GlobalProvider } from "./contexts/globalContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </GlobalProvider>
  </React.StrictMode>
);
