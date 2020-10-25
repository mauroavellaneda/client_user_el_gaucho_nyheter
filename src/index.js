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
import "./i18n";

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
    <StripeProvider apiKey="pk_test_51HdB6WLqoRP4iCAc86KxXieG7mYFdiNUY5VletydKDhZKC6BWEzoC13C29OGVHKMWo6dx6qTco9Kwqikcm5IOlZJ00Q1ajKLzs">
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
