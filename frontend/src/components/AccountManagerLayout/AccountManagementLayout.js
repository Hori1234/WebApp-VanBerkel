import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Divider,
  Button,
  Layout,
  Typography,
  Modal,
} from "antd";
import { UserAddOutlined, ArrowUpOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import axios from "axios";

import CreateAccountsComponent from "./CreateAccountsComponent";
import EditAccountComponent from "./EditAccountComponent";
import EditAccountModalComponent from "./EditAccountModalComponent";

const { Text } = Typography;

export default class AccountManagementLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CAVisible: false,
      EAVisible: false,
      data: [],
      Metadata: {
        id: "",
        username: "",
        role: "",
      },
    };
  }

  componentDidMount = () => {
    this.getUsers();
  };
  setUsers = (value) => {
    this.setState({
      users: value,
    });
  };
  getUsers = async (vPage, vPage_size) => {
    return axios
      .get("/api/auth/users", {
        params: {
          page: vPage,
          page_size: vPage_size,
        },
      })
      .then((res) => {
        this.setState((state) => ({
          ...state,
          data: res.data,
          status: "success",
        }));
        return true;
      })
      .catch((error) => {
        this.setState((state) => ({
          ...state,
          status: "error",
          error: error,
        }));
        return false;
      });
  };
  showModal = (value, vId, vUsername, vRole) => {
    console.log(this.state.Metadata);
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
        this.setState((prevState) => {
          let Metadata = Object.assign({}, prevState.Metadata); // creating copy of state variable Metadata
          Metadata.id = vId; // update the name property, assign a new value
          Metadata.username = vUsername;
          Metadata.role = vRole;
          return { Metadata }; // return new object Metadata object
        });
        console.log("ea modal shown");
        break;
      default:
      // no default
    }
    console.log(this.state.Metadata);
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
        style={{ backgroundColor: "white", display: "flex", width: "100%" }}
      >
        <Layout>
          <Layout
            style={{
              alignItems: "flex-start",
              flexDirection: "row",
              backgroundColor: "white",
              display: "flex",
              width: "100%",
            }}
          >
            <UserAddOutlined style={{ fontSize: 90 }} />
            <Layout
              style={{ flexDirection: "column", backgroundColor: "white" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: "18" }}>
                Create Accounts
              </Text>
              <Text style={{ fontSize: " 14" }}>
                This page is used create accounts
              </Text>
            </Layout>
            <Layout
              style={{ alignItems: "flex-end", backgroundColor: "white" }}
            >
              <Button
                style={{ marginRight: 20, width: 150 }}
                type="primary"
                onClick={() => this.showModal("ca")}
              >
                Create Account
              </Button>
            </Layout>
          </Layout>
          <Layout style={{ backgroundColor: "white", alignItems: "center" }}>
            <Row gutter={16}>
              <Col span={12}>
                <Card style={{ width: "20vh" }}>
                  <Statistic
                    title="Active Users"
                    value={this.state.data.length}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card style={{ marginLeft: 40, width: "20vh" }}>
                  <Statistic
                    title="Active"
                    value={this.state.data.length / 100}
                    precision={2}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
          </Layout>
        </Layout>
        <Divider />
        <Layout
          style={{
            backgroundColor: "white",
            display: "flex",
            width: "100%",
          }}
        >
          <EditAccountComponent showModal={this.showModal} />
        </Layout>

        <Modal
          title="Create Account"
          style={{
            width: "100vh",
            display: "flex",
            marginLeft: 280,
          }}
          centered={false}
          maskClosable={false}
          visible={this.state.CAVisible}
          onCancel={this.handleCancel}
        >
          {this.state.CAVisible && (
            <CreateAccountsComponent modalHandleOk={this.handleOk} />
          )}
        </Modal>
        <Modal
          title="Edit Account"
          style={{
            width: "100vh",
            display: "flex",
            alignItems: "center",
            marginLeft: 280,
          }}
          visible={this.state.EAVisible}
          maskClosable={false}
          onCancel={this.handleCancel}
        >
          {this.state.EAVisible && (
            <EditAccountModalComponent
              info={this.state.Metadata}
              modalHandleOk={this.handleOk}
            />
          )}
        </Modal>
        
      </Layout>
    );
  }
}
