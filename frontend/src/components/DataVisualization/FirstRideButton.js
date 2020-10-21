import React, { Component } from "react";
import Chart from "react-google-charts";
import "../Css/DataVisualization.css";
import { Row, Col, Layout, Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import axios from "axios";

export default class FirstRideButton extends Component {
  

  downloadFile = (value) => {
      console.log(value);
    return axios
      .get(`/api/reports/firstrides/${value}`, { responseType: 'arraybuffer' })
      .then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement("a");
       link.href = url;
       link.setAttribute("download", response.headers["content-disposition"].split("filename=")[1]);
       document.body.appendChild(link);
       link.click();
    });
  }

  render() {
    return (
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              size={"large"}
              style={{ width: "100%" }}
              onClick={() => this.downloadFile(this.props.orderNumber)}
            >
              Download First-Rides
            </Button>
    );
  }
}
