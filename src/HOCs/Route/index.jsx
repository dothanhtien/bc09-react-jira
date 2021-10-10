import React from "react";
import { Redirect, Route } from "react-router-dom";
import { ACCESS_TOKEN } from "../../utils/constants/config";

const createRoute = (condition) => {
  return ({
    path,
    component: RouteComponent,
    layout: LayoutComponent,
    redirectPath,
    ...restProps
  }) => {
    return (
      <Route
        path={path}
        {...restProps}
        render={(routeProps) => {
          if (condition()) {
            if (LayoutComponent) {
              return (
                <LayoutComponent>
                  <RouteComponent {...routeProps} />
                </LayoutComponent>
              );
            }

            return <RouteComponent {...routeProps} />;
          }
          return <Redirect to={redirectPath} />;
        }}
      />
    );
  };
};

export const AuthRoute = createRoute(() => !localStorage.getItem(ACCESS_TOKEN));

export const PrivateRoute = createRoute(() =>
  localStorage.getItem(ACCESS_TOKEN)
);
