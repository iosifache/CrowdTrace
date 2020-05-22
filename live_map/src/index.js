// Import React libraries
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./helpers/serviceWorker";

// Import components
import App from "./App";

// Render React app to the DOM
ReactDOM.render(<App/>, document.getElementById("root"));

// Start service worker
serviceWorker.unregister();