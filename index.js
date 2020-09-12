import React from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./src/app.json";
import { applyMiddleware, compose, createStore } from "redux";
import Store from "./src/store/reducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import App from "./src/App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Store, composeEnhancers(applyMiddleware(thunk)));

const app = () =>
  <Provider store={store}>
    <App />
  </Provider>;

AppRegistry.registerComponent(appName, () => app);
