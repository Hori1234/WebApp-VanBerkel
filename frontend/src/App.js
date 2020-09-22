import "./App.css";
import React, { Component } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";

import AppLayout from "./components/AppLayout";
import { AuthProvider } from "./components/contextConfig";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmptyState: true,
      isMenuItemClickedState: "login",
      userRole: "Tmp",
    };
  }

  triggerAddTripState = (value) => {
    this.setState({
      ...this.state,
      isEmptyState: false,
      isMenuItemClickedState: value,
    });
  };

  render() {
    return (
      <Layout>
        {/* {this.state.isMenuItemClickedState == "login" && (
          <SignInComponent
            {...this.state}
            changeUser={this.changeUserState.bind(this)}
            changeState={() => this.triggerAddTripState("navi")}
          />
        )}
        {this.state.isMenuItemClickedState == "navi" && (
          <NavigationLayout {...this.state} />
        )} */}
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </Layout>
    );
  }
}
