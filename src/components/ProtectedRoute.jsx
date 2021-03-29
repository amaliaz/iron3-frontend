import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withUser } from "./Auth/withUser";

const ProtectedRoute = ({ context, ...rest }) => {
  if (context.isLoading) {
    return null;
  } else if (context.isLoggedIn) {
    return <Route {...rest} />;
  } else {
    return <Redirect to="/signin" />;
  }
};

export default withUser(ProtectedRoute);
