import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./components/login/Login";
import SignUp from "./components/register/SignUp";

import "./index.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <SignUp />
        </Route>
        <Route exact path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
