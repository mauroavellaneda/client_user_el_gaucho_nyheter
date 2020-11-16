import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore";
import { StripeProvider } from "react-stripe-elements";

let apiUrl;
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://api-el-gaucho-nyheter.herokuapp.com/api/v1";
} else {
  apiUrl = "http://localhost:3000/api/v1";
}
axios.defaults.baseURL = apiUrl;
const store = configureStore();
window.store = store;

ReactDOM.render(
  <React.StrictMode>
    <StripeProvider apiKey="pk_test_21nBNjeqdyB1Mzm2VjDPQprF00kyEKYZSK">
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </StripeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
