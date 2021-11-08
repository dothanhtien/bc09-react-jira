import React, { useEffect } from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ACCESS_TOKEN } from "./utils/constants/config";
import { fetchMe } from "./store/actions/auth";
import { AuthRoute, PrivateRoute } from "./HOCs/Route";

// layouts
import AuthLayout from "./HOCs/layouts/Auth";
import MainLayout from "./HOCs/layouts/Main";

// views
import Login from "./views/Login";
import Signup from "./views/Signup";

import Projects from "./views/Projects";
import NewProject from "./views/Projects/New";
import ProjectDetail from "./views/Projects/Detail";
import EditProject from "./views/Projects/Edit";

import Tasks from "./views/Tasks";
import UserManagment from "./views/Users/UserManagement";
import UserLayout from "./HOCs/layouts/Users";
import EditUser from "./views/Users/EditUsers";

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
        <PrivateRoute
          path="/projects/:projectId/board"
          exact
          component={Tasks}
          layout={MainLayout}
          redirectPath="/login"
        />
        <PrivateRoute
          path="/users"
          exact
          component={UserManagment}
          layout={UserLayout}
          redirectPath="/login"
        />
        <PrivateRoute
          path="/users/:id/edit"
          exact
          component={EditUser}
          layout={UserLayout}
          redirectPath="/login"
        />
        
      </Switch>
    </BrowserRouter>
  );
};

export default App;
