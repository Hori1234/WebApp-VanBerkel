import React, { Component } from "react";
import { white } from "@ant-design/colors";
import { Layout, Menu, Breadcrumb, Typography, Image } from "antd";
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
         <Image
            width={200}
            src={require("../components/testimg.png")}
          />
      </Layout>
    );
  }
}
