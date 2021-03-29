import React from "react";
import { UserContext } from "./UserContext";

// The use case of this one is to make it easy to access the user context to
// any component in our app.

// export default withUser(YourComponent)
// ----------------^ your component now has access to the user context defined in UserProvider.jsx.

// import { withUser } from "../relative/path/to/this/file"

export const withUser = (ComponentToPassUserContextTo) => {
  return function (props) {
    return (
      <UserContext.Consumer>
        {(context) => (
          <ComponentToPassUserContextTo {...props} context={context} />
        )}
      </UserContext.Consumer>
    );
  };
};
