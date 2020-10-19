import React, { Component } from "react";
import {
  Button,
  Layout,
  Form,
  Input,
  Typography,
  Select,
  Divider,
  message,
} from "antd";
import axios from "axios";

import { UserAddOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
const { Text, Title } = Typography;
const { Option } = Select;

export default class CreateAccountsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      username: "",
      password: "",
      rUsername: "",
      rRole: "",
      status: "",
    };
  }

  addAccount = async (vUsername, vPassword, vRole) => {
    return axios
      .post("/api/auth/user", {
        username: vUsername,
        password: vPassword,
        role: vRole,
      })
      .then((res) => {
        this.setState((state) => ({
          ...state,
          rUsername: res.username,
          rRole: res.role,
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

  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleChangeRole = (value) => {
    this.setState({ role: value });
  };

  onFinish = (values) => {
    console.log(values);
  };
  onFinishFailed = (errorInfo) => {
    message.error("Failed: Please complete all the required fields", errorInfo);
    this.setState({
      status: "error",
    });
  };

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    /* eslint no-template-curly-in-string: "off" */
    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not validate email!",
        number: "${label} is not a validate number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };

    return (
      <Layout
        style={{
          alignItems: "center",
          width: "70vh",
          height: "50vh",
          backgroundColor: "white",
        }}
      >
        <Layout
          style={{
            flexDirection: "row",
            backgroundColor: "white",
          }}
        >
          <UserAddOutlined style={{ fontSize: 50 }} />
          <Layout
            style={{
              backgroundColor: "white",
            }}
          >
            <Title style={{ fontSize: 16 }}>Welcome </Title>
            <Text style={{ fontSize: 14 }}>
              Complete the following form in order to add a new user. Every
              field is required to be filled.
            </Text>
          </Layout>
        </Layout>
        <Divider style={{backgroundColor: "white"}}></Divider>
        <Layout style={{ backgroundColor: "white" }}>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            validateMessages={validateMessages}
            style={{ width: "60vh", marginRight: 50 }}
          >
            <Form.Item
              name={["user", "name"]}
              label="Name"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.username}
                onChange={this.handleChangeUsername}
              />
            </Form.Item>
            <Form.Item
              name={["user", "password"]}
              label="password"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.password}
                onChange={this.handleChangePassword}
              />
            </Form.Item>
            <Form.Item
              name={["user", "role"]}
              label="Role"
              rules={[{ type: "string", min: 0, max: 99, required: true }]}
            >
              <Select
                placeholder="Select an option"
                onChange={this.handleChangeRole}
                allowClear
              >
                <Option value="administrator">Administrator</Option>
                <Option value="view-only">View Only</Option>
                <Option value="planner">Planner</Option>
              </Select>
            </Form.Item>
            <Form.Item name={["user", "introduction"]} label="Introduction">
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  if (
                    this.state.username !== "" &&
                    this.state.password !== "" &&
                    this.state.role !== ""
                  ) {
                    this.addAccount(
                      this.state.username,
                      this.state.password,
                      this.state.role
                    );
                    this.props.modalHandleOk();
                    window.location.reload(false);
                    message.success("Account created !");
                  }
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Layout>
      </Layout>
    );
  }
}
