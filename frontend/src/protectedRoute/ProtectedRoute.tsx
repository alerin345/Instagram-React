// @ts-nocheck
import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import {UserContext} from './../components/userContext/UserContext'

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  const {user, setUser} = useContext(UserContext)
  return (
    <Route
      {...rest}
      render={props => {
        if (user) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
