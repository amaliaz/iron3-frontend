import React from "react";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import { Link, Redirect, NavLink } from "react-router-dom";

import "./../styles/NavMain.css";

const NavMain = (props) => {
  const { context, toggleFormDisplay } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="NavMain">
      <NavLink exact to="/">
        <h3 className="logo">Travel</h3>
      </NavLink>
      <ul className="nav-list">
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <p onClick={toggleFormDisplay}>Add Item</p>
            </li>
            <li>
              <Link to="/list">List Items</Link>
            </li>
            {/* <li>
              <NavLink to="/profile">
                {context.user && context.user.name}
              </NavLink>
            </li> */}
            <li>
              <p onClick={handleLogout}>Logout</p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/signin" className="navlink">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="navlink">Create account</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
