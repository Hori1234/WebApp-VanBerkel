import React, { useState } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Avatar, Divider, Image } from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";

import {withRouter , useLocation, BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "../Home/Home";
import UploadButton from "../UploadButton/UploadButton";
import AccountManagementLayout from "../AccountManagerLayout/AccountManagementLayout";
import "../Css/NavigationLayout.css";
import Logout from "../Logout/Logout";
import { useAuth } from '../contextConfig'
import ManualPlanning from "../ManualPlanning/ManualPlanning";
const { SubMenu } = Menu;
const { Content, Sider, Footer, Header } = Layout;


function NavigationLayout() {

  const auth = useAuth();
  const location = useLocation();
  const [state, setState] = useState({
    isEmptyState: true,
    UserState: false,
    collapsed: false,
    selectedKeys: [],
  });
  const keys = (pathname) =>{
    if(pathname === '/'){
      return '0';
    }
    else if(pathname === '/account'){
      return '1';
    }
    else if(pathname === '/upload'){
      return '2';
    }
    else if(pathname === '/planning'){
      return '3';
    }
    else if(pathname === '/view'){
      return '4';
    }
    else if(pathname === '/data'){
      return '5';
    }
    else if(pathname === '/montly'){
      return '6';
    }
  }
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
    
      <Layout style={{ height: "100vh" }}>
        <Layout style={{ margin: 10}}>
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
              <Menu
                mode="inline"
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
                selectedKeys={keys(location.pathname)}
              >
                {auth.state.user.role === "administrator" &&(
                  <SubMenu
                    key="sub1"
                    defaultSelectedKeys={["0"]}
                    icon={<UserOutlined />}
                    title={auth.state.user.username}
                  >
                    <Menu.Item key="0" >
                      <Link to="/" >Home </Link>
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
                    title={auth.state.user.username}
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
                    title={auth.state.user.username}
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
            </Layout>
          </Sider>
          <Layout style={{ padding: "0 24px 24px", height: "100%" }}>
            <Header style={{ backgroundColor: "white"}}>
              <Image
              src={require("../Images/van-berkel-logo-final.png")}
              />
            </Header>
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
                    <Route path="/planning">
                      <ManualPlanning />
                    </Route>
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
    
  );

}
export default withRouter(NavigationLayout);