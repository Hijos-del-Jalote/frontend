import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App";
import { WebSocketProvider } from "./contexto/WebSocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // NOTE: Saco el stric mode porque me renderiza dos veces algunos componentes
  // <React.StrictMode>
  <WebSocketProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </WebSocketProvider>
  // </React.StrictMode>
);
