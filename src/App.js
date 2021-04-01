import "./App.css";
import NavMain from "./components/NavMain";
import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "./components/Views/SignIn";
import Signup from "./components/Views/Signup";
import Home from "./components/Views/Home";
import FormUpdate from "./components/Forms/FormUpdate";
import List from "./components/Views/List"
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

class App extends React.Component {
  state = {
    displayForm: false,
  };

  toggleFormDisplay = () => {
    this.setState({ displayForm: !this.state.displayForm });
  };

  handleClose = () => {
    this.setState({ displayForm: false });
  };

  render() {
    return (
      <div >
        <NavMain toggleFormDisplay={this.toggleFormDisplay} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            render={(historyProps) => (
              <Home
                {...historyProps}
                displayForm={this.state.displayForm}
                handleFormClose={this.handleClose}
              />
            )}
          />
          <ProtectedRoute
            exact
            path="/list"
            render={(historyProps) => (
              <List
                {...historyProps}
                displayForm={this.state.displayForm}
                handleFormClose={this.handleClose}
              />
            )}
          />
          <ProtectedRoute
            exact
            path="/list/edit/:id"
            render={(historyProps) => (
              <FormUpdate
                {...historyProps}
                displayForm={this.state.displayForm}
                handleFormClose={this.handleClose}
              />
            )}
          />
          {/* <ProtectedRoute
            exact
            path="/profile"
            render={(historyProps) => (
              <Profile
                {...historyProps}
                displayForm={this.state.displayForm}
                handleFormClose={this.handleClose}
              />
            )}
          />
          <ProtectedRoute
            exact
            path="/profile/settings"
            component={FormProfile}
          /> */}

          {/* <Route exact path="/about" component={About} /> */}
          {/* <Route exact path="/" render={(historyProps) => (
              <Home  {...historyProps}
              displayForm={this.state.displayForm}
              handleFormClose={this.handleClose} />)} /> */}

          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={SignIn} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
