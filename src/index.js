import { StrictMode } from "react";
import ReactDOM from "react-dom";

import PITree from "./PITree"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <PITree />
  </StrictMode>,
  rootElement
);
