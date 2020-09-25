import React, { Component } from "react";
import { AuthProvider } from "../contextConfig";
import { Layout, Typography, Button } from "antd";
import "antd/dist/antd.css";
const { Text } = Typography;

export default class Logout extends Component {
  render() {
    return (
      <AuthProvider.Consumer>
        {(context) => (
          <Layout
            style={{
              flexDirection: "column",
              alignItems: "center",
              display: "flex",
              marginBottom: 1,
              width: "100%",
              backgroundColor: "white",
              padding: 250,
            }}
          >
            <Layout
              style={{ flexDirection: "column", backgroundColor: "white" }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "18",
                  alignContent: "center",
                }}
              >
                Logout
              </Text>
              <Text style={{ fontSize: " 14" }}>
                Are you sure you would like to logout?
              </Text>
            </Layout>
            <Layout style={{ alignItems: "center", backgroundColor: "white" }}>
              <Button type="primary" onClick={() => context.logout}>
                Logout
              </Button>
            </Layout>
          </Layout>
        )}
      </AuthProvider.Consumer>
    );
  }
}
