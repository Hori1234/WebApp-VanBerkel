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
      owner: "",
      driver: "",
      remarks: "",
      business_type: "",
    };
  }

  getFormTruckData = () => {
    let temp = [];
    var availability = this.state.availability === "true";
    temp.push(
      this.state.truck_id,
      this.state.truck_snumber,
      availability,
      this.state.truck_type,
      this.state.terminal,
      Integer(this.state.hierarchy),
      parseFloat(this.state.use_cost),
      this.state.starting_time,
      this.state.date,
      this.state.owner,
      this.state.driver,
      this.state.remarks,
      this.state.business_type
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
  handleChangeOwner = (event) => {
    this.setState({
      owner: event.target.value,
    });
  };
  handleChangeDriver = (event) => {
    this.setState({
      driver: event.target.value,
    });
  };
  handleChangeRemarks = (event) => {
    this.setState({
      remarks: event.target.value,
    });
  };
  handleChangeBusiness_type = (event) => {
    this.setState({
      business_type: event.target.value,
    });
  };

  render() {
    return (
      <Form>
        <Row gutter={[24, 8]}>
          <Col span={12}>
            <Form.Item
              name={"truckID"}
              label={"truckId:"}
              rules={[{ required: true }]}
            >
              <Input
                disabled={false}
                value={this.state.truck_id}
                onChange={this.handleChangeTruckId}
              />
            </Form.Item>
            <Form.Item
              name={"truckSNo"}
              label={"Truck S No:"}
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.truck_snumber}
                onChange={this.handleChangeTruckSNumber}
              />
            </Form.Item>

            <Form.Item
              name={"Availability"}
              label={"Availability:"}
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.availability}
                onChange={this.handleChangeAvailability}
              />
            </Form.Item>
            <Form.Item
              name={"truckType"}
              label={"Truck Type:"}
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.truck_type}
                onChange={this.handleChangeTruckType}
              />
            </Form.Item>
            <Form.Item
              name={"Terminal"}
              label={"Terminal:"}
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.terminal}
                onChange={this.handleChangeTerminal}
              />
            </Form.Item>
            <Form.Item
              name={"Hierarchy"}
              label={"Hierarchy:"}
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.hierarchy}
                onChange={this.handleChangeHierarchy}
              />
            </Form.Item>
            <Form.Item
              name={"useCost"}
              label={"Use Cost:"}
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.use_cost}
                onChange={this.handleChangeUseCost}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={"startingTime"}
              label={"Starting Time:"}
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.starting_time}
                onChange={this.handleChangeStartingTime}
              />
            </Form.Item>
            <Form.Item
              name={"Date"}
              label={"Date:"}
              rules={[{ required: true }]}
            >
              <Input value={this.state.date} onChange={this.handleChangeDate} />
            </Form.Item>
            <Form.Item name={"Owner"} label={"Owner:"}>
              <Input
                value={this.state.owner}
                onChange={this.handleChangeOwner}
              />
            </Form.Item>
            <Form.Item name={"Driver"} label={"Driver:"}>
              <Input
                value={this.state.driver}
                onChange={this.handleChangeDriver}
              />
            </Form.Item>
            <Form.Item name={"Remarks"} label={"Remarks:"}>
              <Input
                value={this.state.remarks}
                onChange={this.handleChangeRemarks}
              />
            </Form.Item>
            <Form.Item name={"businessType"} label={"Business_type:"}>
              <Input
                value={this.state.business_type}
                onChange={this.handleChangeBusiness_type}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}
