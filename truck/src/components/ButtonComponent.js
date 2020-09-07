import React, { Component } from "react";
import { white } from "@ant-design/colors";
import { Layout, Menu, Breadcrumb, Typography } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./button.css";

const { Text } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default class ButtonComponent extends Component {
  render() {
    return (
      <Layout className="dsp">
        <Header>
          <h1 className="title">News</h1>
          <div className="logo" />
        </Header>

        <Header className="menu">
          {" "}
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <SubMenu
              icon={<SettingOutlined />}
              title="News Sources"
              className="menu-item-first"
            >
              <Menu.ItemGroup title="Global News">
                <Menu.Item key="setting:1">All</Menu.Item>
                <Menu.Item key="setting:2">BBC</Menu.Item>
                <Menu.Item key="setting:3">CNN</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Community News">
                <Menu.Item key="setting:4">All</Menu.Item>
                <Menu.Item key="setting:5">Type - 1</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="1">About Us</Menu.Item>
            <Menu.Item key="2" className="menu-item-last">
              Contact
            </Menu.Item>
          </Menu>
        </Header>
    
        <Content style={{ padding: "0 50px" }}>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <Menu.Item key="11">Somthing with trucks</Menu.Item>
                <SubMenu 
                key="sub1" 
                icon={<UserOutlined />} 
                title="Normal user"
                >
                  <Menu.Item key="1">Trucks</Menu.Item>
                  <Menu.Item key="2">Charts</Menu.Item>
                </SubMenu>
                <SubMenu 
                key="sub2" 
                icon={<LaptopOutlined />} 
                title="Planner User"
                >
                  <Menu.Item key="5">Trucks</Menu.Item>
                  <Menu.Item key="6">Charts</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  icon={<NotificationOutlined />}
                  title="Master User"
                >
                  <Menu.Item key="9">Trucks</Menu.Item>
                  <Menu.Item key="10">Charts</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content className="content">
            </Content>
          </Layout>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}
