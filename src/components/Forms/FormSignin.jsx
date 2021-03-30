import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { withUser } from "./../Auth/withUser";
import apiHandler from "./../../api/apiHandler";
import "./../../styles/SigninSignUp.css";

class FormSignin extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        console.log("DATAAAAA",data);
        this.props.context.setUser(data); // update the context
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.props.context.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="wrapper">
        <header className="section header">

          <div className="header__text">
            <h1>sup.</h1>
            <p>Sign in or create a new account.</p>
          </div>
        </header>

        <div className="section sign-in">
          <form
            autoComplete="off"
            className="form"
            onSubmit={this.handleSubmit}
          >
            <input
              onChange={this.handleChange}
              value={this.state.email}
              className="input"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              onChange={this.handleChange}
              value={this.state.password}
              className="input"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              
            />
            <button className="btn-submit">Sign In</button>
            <Link to="/signup" className="opposite-btn1">Don't have an account?</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default withUser(FormSignin);
