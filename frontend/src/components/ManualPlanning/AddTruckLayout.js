import React, { Component } from "react";
import { Form, Input, Typography, Row, Col } from "antd";
import "antd/dist/antd.css";

const { Text } = Typography;

export default class AddTruckLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truck_id: "",
      truck_snumber: "",
      availability: "",
      truck_type: "",
      terminal: "",
      hierarchy: "",
      use_cost: "",
      starting_time: "",
      date: "",
    };
  }

  getFormData = () => {
    let temp = [];
    temp.push(
      this.state.truck_id,
      this.state.truck_snumber,
      this.state.availability,
      this.state.truck_type,
      this.state.terminal,
      this.state.hierarchy,
      this.state.use_cost,
      this.state.starting_time,
      this.state.date
    );
    console.log(temp);
    return temp;
  };

  handleChangeTruckId = (event) => {
    this.setState({
      truck_id: event.target.value,
    });
  };
  handleChangeTruckSNumber = (event) => {
    this.setState({
      truck_snumber: event.target.value,
    });
  };
  handleChangeAvailability = (event) => {
    this.setState({
      availability: event.target.value,
    });
  };
  handleChangeTruckType = (event) => {
    this.setState({
      truck_type: event.target.value,
    });
  };
  handleChangeHierarchy = (event) => {
    this.setState({
      hierarchy: event.target.value,
    });
  };
  handleChangeTerminal = (event) => {
    this.setState({
      terminal: event.target.value,
    });
  };
  handleChangeUseCost = (event) => {
    this.setState({
      use_cost: event.target.value,
    });
  };
  handleChangeStartingTime = (event) => {
    this.setState({
      starting_time: event.target.value,
    });
  };
  handleChangeDate = (event) => {
    this.setState({
      date: event.target.value,
    });
  };

  render() {
    return (
      <Form>
        <Row gutter={[24, 8]}>
          <Col span={8}>
            <Text>Truck ID:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                disabled={false}
                value={this.state.truck_id}
                onClick={this.handleChangeTruckId}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Text>Truck S No:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                value={this.state.truck_snumber}
                onClick={this.handleChangeTruckSNumber}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Text>Availability:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                value={this.state.availability}
                onClick={this.handleChangeAvailability}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[24, 8]}>
          <Col span={8}>
            <Text>Truck Type:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                value={this.state.truck_type}
                onClick={this.handleChangeTruckType}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Text>Terminal:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                value={this.state.terminal}
                onClick={this.handleChangeTerminal}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Text>hierarchy:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                value={this.state.hierarchy}
                onClick={this.handleChangeHierarchy}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[24, 8]}>
          <Col span={8}>
            <Text>Use Cost:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                value={this.state.use_cost}
                onClick={this.handleChangeUseCost}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Text>Starting Time:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input
                value={this.state.starting_time}
                onClick={this.handleChangeStartingTime}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Text>Date:</Text>
            <Form.Item rules={[{ required: true }]}>
              <Input value={this.state.date} onClick={this.handleChangeDate} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}
