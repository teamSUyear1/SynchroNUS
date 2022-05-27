import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { ProvideAuth } from "./hooks/useAuth";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider>
      <ThemeProvider theme={darkTheme}>
        <ProvideAuth>
          <App />
        </ProvideAuth>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
