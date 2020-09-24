import React, { Component } from "react";
import {
  Layout,
} from "antd";

import "antd/dist/antd.css";

export default class EditAccountComponent extends Component {
  render() {
    return (
      <Layout
        style={{
          alignItems: "center",
          display: "flex",
          width: "120vh",
          height: "70vh",
        }}
      >
        <p>This is a random component paragraph</p>
      </Layout>
    );
  }
}
