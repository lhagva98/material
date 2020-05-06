import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './redux/store';

import Axios from "./Axios.js";

// core components
import Admin from "layouts/Admin.js";
import LoginScreen from 'layouts/LoginScreen';
import Home from './layouts/Home';

import 'bootstrap/dist/css/bootstrap.min.css'
import "assets/css/material-dashboard-react.css?v=1.8.0";
import "react-datepicker/dist/react-datepicker.css";

const hist = createBrowserHistory();

Axios();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={LoginScreen} />
        <Redirect from="/" to="login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
