import ReactDOM from "react-dom";
import React from "react";
import ConnectedWeatherApp from "./components/App";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(<Provider store={store}>
  <ConnectedWeatherApp />
</Provider>, document.getElementById("app"));