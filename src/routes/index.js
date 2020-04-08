import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Login from "../pages/Login";
import RegisterUser from "../pages/Register/User";
import RegisterPerformer from "../pages/Register/Performer";

import Performers from "../pages/Performers";
import Profile from "../pages/Profile";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register/user" exact component={RegisterUser} />
      <Route path="/register/performer" exact component={RegisterPerformer} />

      <Route path="/performers" component={Performers} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
