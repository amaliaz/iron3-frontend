import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { withUser } from "./../Auth/withUser";
import apiHandler from "./../../api/apiHandler";
import "./../../styles/SigninSignUp.css";

class FormSignup extends Component {
  state = {};

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    apiHandler
      .signup(this.state)
      .then((data) => {
        this.props.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.props.context.isLoggedIn) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="wrapper">
        <header className="section header">
          <div className="header__text">
            <h1>sup.</h1>
            <p>Create an Account</p>
          </div>
        </header>

        <div className="section sign-up">
          <form
            autoComplete="off"
            className="form"
            onSubmit={this.handleSubmit}
          >
            <input
              onChange={this.handleChange}
              value={this.state.firstName}
              className="input"
              id="firstName"
              type="text"
              name="firstName"
              placeholder="First Name"
            />
            <input
              onChange={this.handleChange}
              value={this.state.lastName}
              className="input"
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
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
            {/* <div className="fileUpload">
            <div className="uploader"> */}
            {/* <p>Profile Image</p> */}
            <input
              onChange={this.handleChange}
              value={this.state.profileImg}
              className="input"
              id="profileImg"
              type="file"
              name="profileImg"
              placeholder="Profile Image"
              multiple
            />
            {/* </div>
            <button className="uploadFiles">Upload</button>
            </div> */}
            <button className="btn-submit">Sign up</button>
            <Link to="/signin" className="opposite-btn1">Already a Member?</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default withUser(FormSignup);
