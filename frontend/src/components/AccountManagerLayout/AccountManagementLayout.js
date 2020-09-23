import React, { Component } from "react";
import {
  Upload,
  message,
  Row,
  Col,
  Card,
  Button,
  Layout,
  Typography,
  Divider,
  Image,
  Modal,
} from "antd";
import { InboxOutlined, FileExcelOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import axios, { post } from "axios";

import CreateAccountsComponent from "./CreateAccountsComponent";
import EditAccountComponent from "./EditAccountComponent";

const { Text, Title } = Typography;

export default class AccountManagementLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CAVisible: false,
      EAVisible: false,
    };
  }
  showModal = (value) => {
    switch (value) {
      case "ca":
        this.setState({
          CAVisible: true,
        });
        console.log("ca modal shown");

        break;
      case "ea":
        this.setState({
          EAVisible: true,
        });
        console.log("ea modal shown");

        break;
    }
    console.log("modal shown");
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      EAVisible: false,
      CAVisible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      EAVisible: false,
      CAVisible: false,
    });
  };

  render() {
    return (
      <Layout
        style={{ backgroundColor: "blue", display: "flex", width: "100%" }}
      >
        <Layout
          style={{
            alignItems: "flex-start",
            flexDirection: "row",
            backgroundColor: "red",
            display: "flex",
            width: "100%",
          }}
        >
          <Image
            style={{ marginRight: 20 }}
            preview={false}
            width={100}
            src={require("../Images/upload-file.svg")}
          />
          <Layout style={{ flexDirection: "column", backgroundColor: "white" }}>
            <Text style={{ fontWeight: "bold", fontSize: "18" }}>
              Create Accounts
            </Text>
            <Text style={{ fontSize: " 14" }}>
              This page is used in order to create accounts
            </Text>
          </Layout>
          <Layout>
            <Button type="primary" onClick={() => this.showModal("ca")}>
              Go
            </Button>
          </Layout>
        </Layout>

        <Layout
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            backgroundColor: "yellow",
            display: "flex",
            width: "100%",
          }}
        >
          <Image
            style={{ marginRight: 20 }}
            preview={false}
            width={100}
            src={require("../Images/upload-file.svg")}
          />
          <Layout style={{ flexDirection: "column", backgroundColor: "green" }}>
            <Text style={{ fontWeight: "bold", fontSize: "18" }}>
              Edit Accounts
            </Text>
            <Text style={{ fontSize: " 14" }}>
              This page is user for the user accounts
            </Text>
          </Layout>
          <Layout>
            <Button
              style={{ marginRight: 20 }}
              type="primary"
              onClick={() => this.showModal("ea")}
            >
              Go !
            </Button>
          </Layout>
        </Layout>

        <Modal
          title="Basic Modal"
          style={{ width: "100vh", display: "flex", alignItems: "center" }}
          visible={this.state.CAVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.CAVisible === true && (
            <Layout style={{ width: "80vh", height: "70vh", display: "flex" }}>
              <CreateAccountsComponent />
            </Layout>
          )}
        </Modal>
        <Modal
          title="Basic Modal"
          style={{ width: "100vh", display: "flex", alignItems: "center" }}
          visible={this.state.EAVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.EAVisible === true && (
            <Layout style={{ width: "80vh", height: "70vh", display: "flex" }}>
              <EditAccountComponent />
            </Layout>
          )}
        </Modal>
      </Layout>
    );
  }
}
