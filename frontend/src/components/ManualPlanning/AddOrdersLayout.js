import React, { Component } from "react";
import { Form, Input, Typography, Row, Col, message } from "antd";
import "antd/dist/antd.css";

const { Text } = Typography;

export default class AddOrdersLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: "",
      inl: "",
      latestDepTime: "",
      truckType: "",
      hierarchy: "",
      deliveryDeadline: "",
      drivingTime: "",
      processTime: "",
      serviceTime: "",
      status: "",
    };
  }

  getFormOrderData = () => {
    let temp = [];
    temp.push(
      this.state.orderNumber,
      this.state.inl,
      this.state.latestDepTime,
      this.state.truckType,
      this.state.hierarchy,
      this.state.deliveryDeadline,
      this.state.drivingTime,
      this.state.processTime,
      this.state.serviceTime
    );
    console.log(temp);
    return temp;
  };

  handleChangeOrderNumber = (event) => {
    this.setState({
      orderNumber: event.target.value,
    });
  };
  handleChangeInl = (event) => {
    this.setState({
      inl: event.target.value,
    });
  };
  handleChangeLatestDepTime = (event) => {
    this.setState({
      latestDepTime: event.target.value,
    });
  };
  handleChangeTruckType = (event) => {
    this.setState({
      truckType: event.target.value,
    });
  };
  handleChangeHierarchy = (event) => {
    this.setState({
      hierarchy: event.target.value,
    });
  };
  handleChangeDeliveryDeadline = (event) => {
    this.setState({
      deliveryDeadline: event.target.value,
    });
  };
  handleChangeDrivingTime = (event) => {
    this.setState({
      drivingTime: event.target.value,
    });
  };
  handleChangeProcessTime = (event) => {
    this.setState({
      processTime: event.target.value,
    });
  };
  handleChangeServiceTime = (event) => {
    this.setState({
      serviceTime: event.target.value,
    });
  };
  onFinishFailed = (errorInfo) => {
    message.error("Failed: Please complete all the required fields", errorInfo);
    this.setState({
      status: "error",
    });
  };
  onFinish = (values) => {
    console.log(values);
  };

  render() {
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
    return (
      <Form
        style={{ width: "100vh", marginRight: 20 }}
        name="nest-messages"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        validateMessages={validateMessages}
      >
        <Row gutter={[24, 8]}>
          <Col span={12}>
            <Form.Item
              name="orderNumber"
              label="Order Number:"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.orderNumber}
                onChange={this.handleChangeOrderNumber}
              />
            </Form.Item>
            <Form.Item
              name="Inl_terminal"
              label="Inl_terminal:"
              rules={[{ required: true }]}
            >
              <Input value={this.state.inl} onChange={this.handleChangeInl} />
            </Form.Item>
            <Form.Item
              name="latestDepTime"
              label="Latest Dep Time:"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.latestDepTime}
                onChange={this.handleChangeLatestDepTime}
              />
            </Form.Item>
            <Form.Item
              name="truckType"
              label="Truck Type:"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.truckType}
                onChange={this.handleChangeTruckType}
              />
            </Form.Item>
            <Form.Item
              name="Hierarchy"
              label="Hierarchy:"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.hierarchy}
                onChange={this.handleChangeHierarchy}
              />
            </Form.Item>
            <Form.Item
              name="deliveryDeadline"
              label="Delivery Deadline:"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.deliveryDeadline}
                onChange={this.handleChangeDeliveryDeadline}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="drivingTime"
              label="Driving Time:"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.drivingTime}
                onChange={this.handleChangeDrivingTime}
              />
            </Form.Item>
            <Form.Item
              name="processTime"
              label="Process Time:"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.processTime}
                onChange={this.handleChangeProcessTime}
              />
            </Form.Item>
            <Form.Item
              name="serviceTime"
              label="Service Time:"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.serviceTime}
                onChange={this.handleChangeServiceTime}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}
