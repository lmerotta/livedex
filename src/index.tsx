import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { CacheProvider } from "rest-hooks";
import "./styles.css";
import App from "./App";

ReactDOM.render(
  <CacheProvider>
    <Suspense fallback="loading...">
      <App />
    </Suspense>
  </CacheProvider>,
  document.getElementById("root")
);
