import React, { useState } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Avatar, Divider } from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "../Home/Home";
import UploadButton from "../UploadButton/UploadButton";
import AccountManagementLayout from "../AccountManagerLayout/AccountManagementLayout";
import "../Css/NavigationLayout.css";
import Logout from "../Logout/Logout";
import { useAuth } from '../contextConfig'
const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

export default function NavigationLayout() {

  const auth = useAuth();

  const [state, setState] = useState({
    isEmptyState: true,
    UserState: false,
    collapsed: false,
  });
  
  const onCollapse = (collapsed) => {
    setState({
      ...state,
      collapsed: collapsed,
    });
    const divider = document.getElementsByClassName("ant-divider")[0];

    if (collapsed) {
      divider.style.setProperty("display", "none");
    } else {
      divider.style.setProperty("display", "flex");
    }
  };

  return (
    !auth.state ?  <pre>Loading...</pre> :
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Layout style={{ margin: 10 }}>
          <Sider
            collapsible
            collapsed={state.collapsed}
            onCollapse={onCollapse}
            width={200}
            className="site-layout-background"
          >
            <Layout className="dividers-style">
              <Avatar
                style={{ marginTop: 10 }}
                shape="square"
                size={64}
                icon={<UserOutlined />}
              />

              <Divider>T.R.U.C.K.</Divider>
            </Layout>
            <Menu
              mode="inline"
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              {auth.state.user.role === "administrator" && (
                <SubMenu
                  key="sub1"
                  defaultSelectedKeys={["0"]}
                  icon={<UserOutlined />}
                  title="User Type: "
                >
                  <Menu.Item key="0">
                    <Link to="/" >Home</Link>
                  </Menu.Item>
                  <Menu.Item key="1">
                    <Link to="/account">Account Management</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/upload">Upload</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/planning">Create Planning</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/view">View Planning</Link>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Link to="/data">Data Visualization</Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to="/montly">Monthly Data Analytics</Link>
                  </Menu.Item>
                  <Menu.Item key="7" onClick={auth.logout}>Logout</Menu.Item>
                </SubMenu>
              )}

              {auth.state.user.role === "planner" && (
                <SubMenu
                  key="sub1"
                  defaultSelectedKeys={["1"]}
                  icon={<UserOutlined />}
                  title="User Type: "
                >
                  <Menu.Item key="1">
                    <Link to="/">Home</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/upload">Upload</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/planning">Create Planning</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/view">View Planning</Link>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Link to="/data">Data Visualization</Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to="/montly">Monthly Data Analytics</Link>
                  </Menu.Item>
                  <Menu.Item key="7" onClick={auth.logout}>Logout</Menu.Item>
                </SubMenu>
              )}

              {auth.state.user.role === "view-only" && (
                <SubMenu
                  key="sub1"
                  defaultSelectedKeys={["3"]}
                  icon={<UserOutlined />}
                  title="User Type: "
                >
                  <Menu.Item key="3">
                    <Link to="/">Home</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/view">View Planning</Link>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Link to="/data">Data Visualization</Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to="/montly">Monthly Data Analytics</Link>
                  </Menu.Item>
                  <Menu.Item key="7" onClick={auth.logout}>Logout</Menu.Item>
                </SubMenu>
              )}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px", height: "100%" }}>
            <Layout
              style={{
                marginTop: 25,
                minHeight: 280,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  marginTop: 25,
                  minHeight: 280,
                  width: "100%",
                }}
              >
                <Layout
                  style={{
                    padding: 24,
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                >
                  <Switch>
                    <Route path="/upload">
                      <UploadButton />
                    </Route>
                    <Route path="/account">
                      <AccountManagementLayout />
                    </Route>
                    <Route path="/logout"><Logout/></Route>
                    <Route path="/planning"></Route>
                    <Route path="/view"></Route>
                    <Route path="/data"></Route>
                    <Route path="/montly"></Route>
                    <Route path="/" exact>
                      <Home />
                    </Route>
                  </Switch>
                </Layout>
              </Content>
            </Layout>
            <Footer style={{ textAlign: "center" }}>
              T.R.U.C.K. ©2020 Created by SEP Group 2
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );

}
