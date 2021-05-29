import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

// Views
import Login from "./Login";
import Callback from "./Callback";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/callback" exact>
            <Callback />
          </Route>

          <Route path="*">
            <Dashboard />
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

