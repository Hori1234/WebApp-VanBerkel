import React, { Component } from "react";
import { Form, Input, Row, Col } from "antd";
import "antd/dist/antd.css";

//const { Text } = Typography;

export default class AddTruckLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "truck_id": "",
      "s_number": "",
      "availability": "",
      "truck_type": "",
      "business_type": "",
      "Driver": "",
      "terminal": "",
      "Owner": "",
      "hierarchy": "",
      "use_cost": "",
      "date": "",
      "starting_time": "",
      "Remarks": ""   
    };
  }
  createTruckData = () => {
    let data = {
      "truck_id": this.state.truck_id,
      "s_number": this.state.s_number,
      "availability": this.state.availability,
      "truck_type": this.state.truck_type,
      "business_type": this.state.business_type,
      "Driver": this.state.Driver,
      "terminal": this.state.terminal,
      "Owner": this.state.Owner,
      "hierarchy": this.state.hierarchy,
      "use_cost": this.state.use_cost,
      "date": toString(this.state.date),
      "starting_time": this.state.starting_time,
      "Remarks": this.state.Remarks  
    }
    return data
  }

  getFormTruckData = () => {
    let temp = [];
    temp.push(
      this.state.truck_id,
      Boolean(this.state.availability),
      this.state.truck_type,
      this.state.terminal,
      Number(this.state.hierarchy),
      Number(this.state.use_cost),
      this.state.starting,
      this.state.date,
      this.state.owner,
      this.state.Driver,
      this.state.Remarks,
      this.state.business_type,
      this.state.s_number,
    );
    console.log(temp);
    return temp;
  };

  handleChangeTruckId = (event) => {
    this.setState({
      "truck_id": event.target.value,
    });
  };
  handleChangeTruckSNumber = (event) => {
    this.setState({
      "s_number": event.target.value,
    });
  };
  handleChangeAvailability = (event) => {
    this.setState({
      "availability": event.target.value,
    });
  };
  handleChangeTruckType = (event) => {
    this.setState({
      "truck_type": event.target.value,
    });
  };
  handleChangeHierarchy = (event) => {
    this.setState({
      "hierarchy": event.target.value,
    });
  };
  handleChangeTerminal = (event) => {
    this.setState({
      "terminal": event.target.value,
    });
  };
  handleChangeUseCost = (event) => {
    this.setState({
      "use_cost": event.target.value,
    });
  };
  handleChangeStartingTime = (event) => {
    this.setState({
      "starting_time": event.target.value,
    });
  };
  handleChangeDate = (event) => {
    this.setState({
      "date": event.target.value,
    });
  };
  handleChangeOwner = (event) => {
    this.setState({
      "Owner": event.target.value,
    });
  };
  handleChangeDriver = (event) => {
    this.setState({
      "Driver": event.target.value,
    });
  };
  handleChangeRemarks = (event) => {
    this.setState({
      "Remarks": event.target.value,
    });
  };
  handleChangeBusiness_type = (event) => {
    this.setState({
      "business_type": event.target.value,
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
                value={this.state.Driver}
                onChange={this.handleChangeDriver}
              />
            </Form.Item>
            <Form.Item name={"Remarks"} label={"Remarks:"}>
              <Input
                value={this.state.Remarks}
                onChange={this.handleChangeRemarks}
              />
            </Form.Item>
            <Form.Item name={"businessType"} label={"Business_type:"}>
              <Input
                value={this.state.business_type}
                onChange={this.handleChangeBusiness_type}
              />
            </Form.Item>
            <Form.Item
              name={"truckSNo"}
              label={"Truck S No:"}
            >
              <Input
                value={this.state.s_number}
                onChange={this.handleChangeTruckSNumber}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}
