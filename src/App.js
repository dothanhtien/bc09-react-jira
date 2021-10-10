import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { AuthRoute, PrivateRoute } from "./HOCs/Route";
import AuthLayout from './HOCs/AuthLayout'


// views
import Login from "./views/Login";
import Signup from "./views/Signup";

import Projects from "./views/Projects";
import NewProject from "./views/Projects/New";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <AuthRoute
          path="/login"
          exact
          component={Login}
          redirectPath="/projects"
          layout={AuthLayout}
        />
        <AuthRoute
          path="/signup"
          exact
          component={Signup}
          redirectPath="/projects"
        />
        <PrivateRoute
          path="/projects"
          exact
          component={Projects}
          redirectPath="/login"
        />
        <PrivateRoute
          path="/projects/new"
          exact
          component={NewProject}
          redirectPath="/login"
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
