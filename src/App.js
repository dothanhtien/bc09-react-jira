import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// templates
// import AuthTemplate from "./templates/AuthTemplate";

// views
import Login from "./views/Login";
import Signup from "./views/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
