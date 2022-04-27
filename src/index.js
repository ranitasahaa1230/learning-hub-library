import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  CategoryProvider,
  ThemeProvider,
  VideoProvider,PlayListProvider
} from "./contexts";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
        <PlayListProvider>
          <VideoProvider>
            <CategoryProvider>
                <App />
            </CategoryProvider>
          </VideoProvider>
          </PlayListProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
