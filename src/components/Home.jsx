import React from "react";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
// import "./../styles/Home.css";
import AppMap from './AppMap'
class Home extends React.Component {

  state = {
    selectedItem: null,
    items: [],
  };

  render() {
    const { user } = this.props.context;

    return (
        <AppMap/>
    )}
}

export default withUser(Home);
