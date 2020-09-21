import React, { Component } from "react";
import {
  Upload,
  message,
  Row,
  Col,
  Card,
  Button,
  Layout,
  Form,
  Input,
  InputNumber,
  Typography,
  Divider,
  Image,
  Modal,
} from "antd";

import { InboxOutlined, FileExcelOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import axios, { post } from "axios";

export default class DeleteAccountsComponent extends Component {
  render() {
    return (
      <Layout
        style={{
          alignItems: "center",
          display: "flex",
          width: "120vh",
          height: "70vh",
        }}
      >
        <p>This is a random component paragraph delete</p>
      </Layout>
    );
  }
}
