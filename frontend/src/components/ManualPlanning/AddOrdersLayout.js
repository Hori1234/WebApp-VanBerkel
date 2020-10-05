import React, { Component } from "react";
import { Form, Input, Typography, Row, Col } from "antd";
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
    };
  }

  getFormData = () => {
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

  render() {
    return (
      <Form>
        <Row gutter={[24, 8]}>
          <Col span={8}>
            <Text>Order Number:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                value={this.state.orderNumber}
                onChange={this.handleChangeOrderNumber}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Text>Inl:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input value={this.state.inl} onChange={this.handleChangeInl} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Text>Latest Dep Time:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                value={this.state.latestDepTime}
                onChange={this.handleChangeLatestDepTime}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[24, 8]}>
          <Col span={8}>
            <Text>Truck Type:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                value={this.state.truckType}
                onChange={this.handleChangeTruckType}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Text>Hierarchy:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                value={this.state.hierarchy}
                onChange={this.handleChangeHierarchy}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Text>Delivery Deadline:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                value={this.state.deliveryDeadline}
                onChange={this.handleChangeDeliveryDeadline}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[24, 8]}>
          <Col span={8}>
            <Text>Driving Time:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                value={this.state.drivingTime}
                onChange={this.handleChangeDrivingTime}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Text>Process Time:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                value={this.state.processTime}
                onChange={this.handleChangeProcessTime}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Text>Service Time:</Text>
            <Form.Item rules={[{ required: true }]}>
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
