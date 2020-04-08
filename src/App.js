import React from "react";
import { ToastContainer } from "react-toastify";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import "./config/ReactotronConfig";

import "react-toastify/dist/ReactToastify.css";
import "react-perfect-scrollbar/dist/css/styles.css";

import "./global.css";

import Routes from "./routes";
import history from "./services/history";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
        <ToastContainer autoClose={6000} position="top-center" />
      </Router>
    </Provider>
  );
}
