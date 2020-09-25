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
      DAVisible: false,
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
      case "da":
        this.setState({
          DAVisible: true,
        });
        console.log("ea modal shown");
        break;
      default:
      // no default
    }
    console.log("modal shown");
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      EAVisible: false,
      CAVisible: false,
      DAVisible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      EAVisible: false,
      CAVisible: false,
      DAVisible: false,
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
                This page is used in order to create accounts
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
                  <Statistic title="Active Users" value={112893} />
                </Card>
              </Col>
              <Col span={12}>
                <Card style={{ marginLeft: 40, width: "20vh" }}>
                  <Statistic
                    title="Active"
                    value={11.28}
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
          style={{ backgroundColor: "white", display: "flex", width: "100%" }}
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
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.CAVisible && <CreateAccountsComponent />}
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
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.EAVisible && <EditAccountModalComponent />}
        </Modal>
      </Layout>
    );
  }
}
