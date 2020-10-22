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

   /**
    * Adding an account to the database.
    * @param {New username} vUsername 
    * @param {New password} vPassword 
    * @param {New role} vRole 
    */
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

   /**
    * Handle changes in the Username text box.
    * @param {Returned value of the triggered event} event 
    */
  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

   /**
    * Handle changes in the Password text box.
    * @param {Returned value of the triggered event} event 
    */
  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

   /**
    * Handle changes in the Role selector drop down menu.
    * @param {Role values} value 
    */
  handleChangeRole = (value) => {
    this.setState({ role: value });
  };

   /**
    * Throw error if not all the required fields are completed.
    * @param {Error information retrieved from backend} errorInfo 
    */
  onFinishFailed = (errorInfo) => {
    message.error("Failed: Please complete all the required fields", errorInfo);
    this.setState({
      status: "error",
    });
  };

  /**
   * Renders the accoutn creation modal(page).
   */
  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    /**
     * Throws error if field is empty.
     */
    /* eslint no-template-curly-in-string: "off" */
    const validateMessages = {
      required: "${label} is required!",
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
              label="Password"
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
