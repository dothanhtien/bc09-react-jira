import React, { useEffect } from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ACCESS_TOKEN } from "./utils/constants/config";
import { fetchMe } from "./store/actions/auth";
import { AuthRoute, PrivateRoute } from "./HOCs/Route";

// layouts
import AuthLayout from "./HOCs/layouts/Auth";

// views
import Login from "./views/Login";
import Signup from "./views/Signup";

import Projects from "./views/Projects";
import NewProject from "./views/Projects/New";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) dispatch(fetchMe);
  }, [dispatch]);

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
          path="/register"
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
