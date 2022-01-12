import React from "react";
import ReactDOM from "react-dom";

import FirebaseContextProvider from "./context/firebase-ctx";
import App from "./App";

import "./index.css";

ReactDOM.render(
  <FirebaseContextProvider>
    <App />
  </FirebaseContextProvider>,
  document.getElementById("root")
);
