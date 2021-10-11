import React, { useEffect } from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { AuthRoute, PrivateRoute } from "./HOCs/Route";
import AuthLayout from './HOCs/AuthLayout'


// views
import Login from "./views/Login";
import Signup from "./views/Signup";

import Projects from "./views/Projects";
import NewProject from "./views/Projects/New";
import { useDispatch} from "react-redux";
import { ACCESS_TOKEN } from "./utils/constants/config";
import { fetchMe } from "./store/actions/auth";

const App = () => {
  const dispatch = useDispatch();
  //duy trì đăng nhập
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    console.log("duy trì đăng nhập token", token);
    if (token) dispatch(fetchMe)
  }, [])

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
