import React, { Component } from "react";
import {
  Button,
  Layout,
  Form,
  Input,
  Typography,
  Select,
  Divider,
} from "antd";

import {
  UserSwitchOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
const { Text, Title } = Typography;
const { Option } = Select;

export default class CreateAccountsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: false,
    };
  }
  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    /* eslint no-template-curly-in-string: off */
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
    const onGenderChange = (value) => {
      this.setState({ role: value });
    };

    const onFinish = (values) => {
      console.log(values);
    };

    return (
      <Layout
        style={{
          alignItems: "center",
          display: "flex",
          width: "120vh",
          height: "70vh",
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
              <Title style={{ fontSize: 16 }}>Welecome </Title>
              <Text style={{ fontSize: 14 }}>
                Change the following fields in order to update the new user
                information.
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
            <Form.Item
              name={["user", "name"]}
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[{ type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "age"]}
              label="Role"
              rules={[{ type: "string", min: 0, max: 99 }]}
            >
              <Select
                placeholder="Select a option and change input text above"
                onChange={onGenderChange}
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
          </Form>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            style={{ width: "40vh", marginRight: 50 }}
          >
            <Form.Item
              name={["user", "name"]}
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[{ type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "age"]}
              label="Role"
              rules={[{ type: "string", min: 0, max: 99 }]}
            >
              <Select
                placeholder="Select a option and change input text above"
                onChange={onGenderChange}
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Layout>
      </Layout>
    );
  }
}
