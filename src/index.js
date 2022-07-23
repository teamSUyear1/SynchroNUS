import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  StyledEngineProvider,
} from "@mui/material/styles";
import { ProvideAuth } from "./hooks/useAuth";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <ProvideAuth>
    <StyledEngineProvider>
          <App />   
    </StyledEngineProvider>
    </ProvideAuth>
  </React.StrictMode>
);
