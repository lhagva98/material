import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Home from './layouts/Home';
import CEO from './layouts/CEO';
import Manager from './layouts/Manager';
import Employee from "./layouts/Employee";

export default function Main() {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/ceo" component={CEO} />
      <Route path="/manager" component={Manager} />
      <Route path="/employee" component={Employee} />
    </Switch>
  );
}