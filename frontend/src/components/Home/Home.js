import React, { Component } from "react";
import {
  Upload,
  message,
  Layout,
  Image,
  Typography,
  Button,
  Divider,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
const { Text } = Typography;

export default class Home extends Component {
  render() {
    return (
      <Layout
        style={{
          flexDirection: "row",
          alignItems: "center",
          display: "flex",
          width: "100%",
          justifyConten: "space-around",
          backgroundColor: "white",
        }}
      >
        <Layout
          style={{
            alignItems: "flex-start",
            display: "flex",
            justifyContent: "space-around",
            marginBottom: 50,
            marginRight: 100,
            backgroundColor: "white",
            marginLeft: 30,
          }}
        >
          <Layout
            style={{
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
              marginBottom: 50,
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <Image
              style={{ marginRight: 20 }}
              preview={false}
              width={100}
              src={require("../Images/1635626-200.png")}
            />
            <Layout
              style={{ flexDirection: "column", backgroundColor: "white" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: "18" }}>
                Account Management
              </Text>
              <Text style={{ fontSize: " 14" }}>
                Manage roles, usernames, and passwords for all users
              </Text>
            </Layout>
            <Layout
              style={{ alignItems: "flex-end", backgroundColor: "white" }}
            >
              <Button type="primary">Go</Button>
            </Layout>
          </Layout>

          <Layout
            style={{
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
              marginBottom: 50,
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <Image
              style={{ marginRight: 20 }}
              preview={false}
              width={100}
              src={require("../Images/23_generate_value_for_investors_rapid_growth_planning-512.svg")}
            />
            <Layout
              style={{ flexDirection: "column", backgroundColor: "white" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: "18" }}>
                Create Planning
              </Text>
              <Text style={{ fontSize: " 14" }}>
                Manual and automatic creation of a planning
              </Text>
            </Layout>
            <Layout
              style={{ alignItems: "flex-end", backgroundColor: "white" }}
            >
              <Button type="primary">Go</Button>
            </Layout>
          </Layout>

          <Layout
            style={{
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <Image
              style={{ marginRight: 20 }}
              preview={false}
              width={100}
              src={require("../Images/Data Visualisation.webp")}
            />
            <Layout
              style={{ flexDirection: "column", backgroundColor: "white" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: "18" }}>
                Data Visualisation
              </Text>
              <Text style={{ fontSize: " 14" }}>
                View charts of the supplied data
              </Text>
            </Layout>
            <Layout
              style={{ alignItems: "flex-end", backgroundColor: "white" }}
            >
              <Button type="primary">Go</Button>
            </Layout>
          </Layout>
        </Layout>
        <Layout
          style={{
            height: "50vh",
            alignItems: "flex-end",
            backgroundColor: "white",
          }}
        >
          <Divider
            type="vertical"
            style={{ height: "50vh", marginRight: 20 }}
          ></Divider>
        </Layout>
        <Layout
          style={{
            justifyContent: "space-around",
            marginBottom: 50,
            display: "flex",
            alignItems: "flex-start",
            backgroundColor: "white",
            marginRight: 30,
          }}
        >
          <Layout
            style={{
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
              marginBottom: 50,
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <Image
              style={{ marginRight: 20 }}
              preview={false}
              width={100}
              src={require("../Images/upload-file.svg")}
            />
            <Layout
              style={{ flexDirection: "column", backgroundColor: "white" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: "18" }}>
                Upload Documents
              </Text>
              <Text style={{ fontSize: " 14" }}>
                Upload the documents for the creation of the plannings
              </Text>
            </Layout>
            <Layout
              style={{ alignItems: "flex-end", backgroundColor: "white" }}
            >
              <Button type="primary">Go</Button>
            </Layout>
          </Layout>

          <Layout
            style={{
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
              marginBottom: 50,
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <Image
              style={{ marginRight: 20 }}
              preview={false}
              width={100}
              src={require("../Images/view-planning.svg")}
            />
            <Layout
              style={{ flexDirection: "column", backgroundColor: "white" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: "18" }}>
                View Planning
              </Text>
              <Text style={{ fontSize: " 14" }}>
                View the planning that was created for today
              </Text>
            </Layout>
            <Layout
              style={{ alignItems: "flex-end", backgroundColor: "white" }}
            >
              <Button type="primary">Go</Button>
            </Layout>
          </Layout>

          <Layout
            style={{
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <Image
              style={{ marginRight: 20 }}
              preview={false}
              width={100}
              src={require("../Images/Data Analytics.webp")}
            />
            <Layout
              style={{ flexDirection: "column", backgroundColor: "white" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: "18" }}>
                Data Analytics
              </Text>
              <Text style={{ fontSize: " 14" }}>
                View statistical data about this and past plannings
              </Text>
            </Layout>
            <Layout
              style={{ alignItems: "flex-end", backgroundColor: "white" }}
            >
              <Button type="primary">Go</Button>
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
