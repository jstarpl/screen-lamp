import { StrictMode } from "react";
import ReactDOM from "react-dom";
import registerworker from "./registerServiceWorker";

import App from "./App";

registerworker();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
