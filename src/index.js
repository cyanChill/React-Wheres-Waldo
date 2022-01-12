import React from "react";
import ReactDOM from "react-dom";

import FirebaseContextProvider from "./context/firebase-ctx";
import App from "./App";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContextProvider>
      <App />
    </FirebaseContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
