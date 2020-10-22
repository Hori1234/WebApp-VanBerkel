import React, { Component } from "react";
import Timeline from "./Timeline"
import FirstRideButton from "./FirstRideButton"
import "../Css/DataVisualization.css";
import { Row, Col, Layout, Button, message} from "antd";
import "antd/dist/antd.css";
import axios from "axios";

export default class DataVisualization extends Component {
  
  publishLatest = (value,value1) => {
    return axios
      .post(`/api/plannings/${value}/${value1}`)
      .then((res) => {
        if (res.status === 200) {
          message.success("Planning: Published successfully");
        }
        return true;
      })
      .catch((error) => {
        this.setState((state) => ({
          ...state,
          status: "error",
          error: error,
        }));
          message.error("Unauthorized: " + error.response.data.message);
          return false;
      });
  };

  render() {
    return (
      <Layout
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "white"
        }}
      >
        <Timeline timeline="latest" />
        <Row>
          <Col span={6}>
            <FirstRideButton orderNumber="latest" />
          </Col>
          <Col span={4} offset={14}>
            <Button type="primary" size={"large"} style={{ width: "100%" }} onClick={() => this.publishLatest('latest', 'latest')}>
              Publish
            </Button>
          </Col>
        </Row>
      </Layout>
    );
  }
}
