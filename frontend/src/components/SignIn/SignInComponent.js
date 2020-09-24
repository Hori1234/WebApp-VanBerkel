import React, { useState } from "react";
import { useAuth } from '../contextConfig'
import {
  Layout,
  message,
  Avatar,
  Form,
  Input,
  Typography,
  Divider,
  Button,
  Checkbox
} from "antd";
import "antd/dist/antd.css";
import {
  UserOutlined,
} from "@ant-design/icons";

const {Title } = Typography;

export default function SignInComponent () {

  const auth = useAuth();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const onAuthenticate = async () => {
    const success = await auth.login({
      username: state.username,
      password: state.password}
      );

    if (!success) message.info("account not valid");
  };

  const handleChangeUsername = (event) => {
    setState({
      ...state,
      username: event.target.value
    });
  };

  const handleChangePassword = (event) => {
    setState({
      ...state,
      password: event.target.value
    });
  };

  const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
          <Layout
              style={{
                margin: 30,
                height: "95vh",
                display: "flex",
                backgroundColor: "white",
              }}
          >
            <Layout
                style={{
                  alignItems: "center",
                  marginTop: 15,
                  backgroundColor: "white",
                }}
            >
              <Avatar
                  style={{marginTop: 100}}
                  shape="square"
                  size={64}
                  icon={<UserOutlined/>}
              />
              <Divider style={{marginTop: 10}}>Welcome</Divider>
            </Layout>

            <Layout
                style={{
                  alignItems: "center",
                  display: "flex",
                  marginTop: -70,
                  marginBottom: -120,
                  backgroundColor: "white",
                }}
            >
              <Title style={{marginLeft: -280}} level={5.2}>
                Sign In
              </Title>
              <Title style={{marginLeft: -190}} level={5}>
                Fil the form in order to login
              </Title>
            </Layout>

            <Layout
                style={{
                  alignItems: "center",
                  display: "flex",
                  marginTop: -50,
                  backgroundColor: "white",
                }}
            >
              <Form
                  {...layout}
                  name="basic"
                  initialValues={{remember: true}}
              >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {required: true, message: "Please input your username!"},
                    ]}
                    style={{width: "100%", marginRight: 180, marginLeft: -50}}
                >
                  <Input
                      value={state.username}
                      onChange={handleChangeUsername}
                  />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {required: true, message: "Please input your password!"},
                    ]}
                    style={{width: "100%", marginRight: 180, marginLeft: -50}}
                >
                  <Input.Password
                      value={state.password}
                      onChange={handleChangePassword}
                  />
                </Form.Item>

                <Form.Item
                    {...tailLayout}
                    name="remember"
                    valuePropName="checked"
                    style={{width: "100%", marginRight: 180, marginLeft: -50}}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button
                      type="primary"
                      htmlType="submit"
                      style={{marginLeft: 10, marginTop: 60, width: "60%"}}
                      onClick={onAuthenticate}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Layout>
          </Layout>
  );
}
