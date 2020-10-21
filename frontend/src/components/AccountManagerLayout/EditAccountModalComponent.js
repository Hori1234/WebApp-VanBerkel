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

import { UserSwitchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
const { Text, Title } = Typography;
const { Option } = Select;

export default class CreateAccountsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: false,
      nUssername: "",
      nPassword: "",
      nRole: "",
    };
  }
  updateAccount = async (user_id, vUsername, vPassword, vRole) => {
    return axios
      .put(`/api/auth/user/${user_id}`, {
        username: vUsername,
        password: vPassword,
        role: vRole,
      })
      .then((res) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  };
  handleChangeUsername = (event) => {
    this.setState({
      nUssername: event.target.value,
    });
  };
  handleChangePassword = (event) => {
    this.setState({
      nPassword: event.target.value,
    });
  };
  handleChangeRole = (value) => {
    this.setState({ nRole: value });
  };

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    /* eslint no-template-curly-in-string: off */
    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };

    const onFinish = (values) => {
      console.log(values);
    };
    const onFinishFailed = (errorInfo) => {
      message.error(
        "Failed: Please complete all the required fields",
        errorInfo
      );
    };
    return (
      <Layout Scrollable
        style={{
          overflowY: "scroll",
          alignItems: "center",
          display: "flex",
          backgroundColor: "white",
        }}
      >
        <Layout style={{ backgroundColor: "white" }}>
          <Layout
            style={{
              flexDirection: "row",
              display: "flex",
              marginTop: 90,
              backgroundColor: "white",
            }}
          >
            <UserSwitchOutlined style={{ fontSize: 50, marginLeft: -10 }} />
            <Layout
              style={{
                display: "flex",
                width: "100%",
                marginRight: -10,
                backgroundColor: "white",
              }}
            >
              <Title style={{ fontSize: 16 }}>Welcome </Title>
              <Text style={{ fontSize: 14 }}>
                Change the following fields to update the new user information.
              </Text>
            </Layout>
          </Layout>
          <Divider style={{ marginTop: -170 }}></Divider>
        </Layout>
        <Layout
          style={{
            marginTop: 20,
            backgroundColor: "white",
            flexDirection: "row",
          }}
        >
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            style={{ width: "30vh", marginRight: 50 }}
          >
            <Form.Item name={["user", "Id"]} label="Id">
              <Input placeholder={this.props.info.id} disabled={true} />
            </Form.Item>
            <Form.Item name={["user", "Name"]} label="Name">
              <Input placeholder={this.props.info.username} disabled={true} />
            </Form.Item>
            <Form.Item
              name={["user", "age"]}
              label="Role"
              rules={[{ type: "string", min: 0, max: 99 }]}
            >
              <Select
                placeholder={this.props.info.role}
                disabled={true}
              ></Select>
            </Form.Item>
          </Form>

          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
            style={{ width: "40vh", marginRight: 50 }}
          >
            <Form.Item name={["user", "Id"]} label="Id">
              <Input placeholder={this.props.info.id} disabled={true} />
            </Form.Item>
            <Form.Item
              name={["user", "Username"]}
              label="Username"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.nUssername}
                onChange={this.handleChangeUsername}
              />
            </Form.Item>
            <Form.Item
              name={["user", "Password"]}
              label="Password"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.nPassword}
                onChange={this.handleChangePassword}
              />
            </Form.Item>
            <Form.Item
              name={["user", "Role"]}
              label="Role"
              rules={[{ type: "string", min: 0, max: 99, required: true }]}
            >
              <Select
                placeholder="Select a option and change input text above"
                onChange={this.handleChangeRole}
                allowClear
              >
                <Option value="administrator">Administrator</Option>
                <Option value="view-only">View Only</Option>
                <Option value="planner">Planner</Option>
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  if (
                    this.state.nUssername !== "" &&
                    this.state.nPassword !== ""
                  ) {
                    this.updateAccount(
                      this.props.info.id,
                      this.state.nUssername,
                      this.state.nPassword,
                      this.state.nRole
                    );
                    this.props.modalHandleOk();
                    message.success("Account updated succesfully");
                  } else {
                    message.warning("Fill all the empty fields");
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
