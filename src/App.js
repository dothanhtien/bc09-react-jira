import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { AuthRoute, PrivateRoute } from "./HOCs/Route";

// layouts
// import AuthLayout from "./HOCs/layouts/Auth";
import MainLayout from "./HOCs/layouts/Main";

// views
import Login from "./views/Login";
import Signup from "./views/Signup";

import Projects from "./views/Projects";
import NewProject from "./views/Projects/New";
import ProjectDetail from "./views/Projects/Detail";
import EditProject from "./views/Projects/Edit";

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
          layout={MainLayout}
          redirectPath="/login"
        />
        <PrivateRoute
          path="/projects/new"
          exact
          component={NewProject}
          layout={MainLayout}
          redirectPath="/login"
        />
        <PrivateRoute
          path="/projects/:id"
          exact
          component={ProjectDetail}
          layout={MainLayout}
          redirectPath="/login"
        />
        <PrivateRoute
          path="/projects/:id/edit"
          exact
          component={EditProject}
          layout={MainLayout}
          redirectPath="/login"
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
