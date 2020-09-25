import "./App.css";
import React, { Component } from "react";
import "antd/dist/antd.css";

import AppLayout from "./components/AppLayout";
import { AuthProvider } from "./components/contextConfig";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmptyState: true,
      isMenuItemClickedState: "login",
    };
  }

  render() {
    return (
        <AuthProvider>
          <AppLayout/>
        </AuthProvider>
    );
  }
}
