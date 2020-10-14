import React, { Component } from "react";
import { Form, Input, Typography, Row, Col, message } from "antd";
import "antd/dist/antd.css";

const { Text } = Typography;

export default class AddOrdersLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "Container": "",
      "Unit type": "",
      "Booking": "",
      "Ship. comp.": "",
      "Terminal": "",
      "Truck": "",
      "Pickup": "",
      "order_number": "",
      "Status": "",
      "inl_terminal": "",
      "Gate": "",
      "Time": "",
      "Max. departure": "",
      "Time (1)": "",
      "latest_dep_time": "",
      "Truck Used": "",
      "truck_type": "",
      "hierarchy" : "",
      "City": "",
      "L/D": "",
      "Date": "",
      "Time (2)": "",
      "delivery_deadline": "",
      "driving_time": "",
      "process_time": "",
      "service_time": "",
      "Reference": "",
      "Truck (1)": "",
      "Gate (1)": "",
      "Time (3)": "",     
      "Inl. ter. (1)": "",
      "Gross (kgs)": "",
      "Temperature °C": "",
      "Seal": "",
      "Truck (2)": "",
      "Voyage/inland carrier": "",
      "Terminal (1)": "",
      "Closing": "",
      "POD": "",
      "Invoice reference": "",
      "Tariff type": "",
      "G": "",
      "F": "",
      "Positie": "",
      "Delay": "",
      "Weight": "",
      "departure_time": "",  
      "truck_id": "",
    };
  }

  createOrderData = () => {
    let data = {
      "Booking": Number(this.state.Booking),
      "inl_terminal": this.state.inl_terminal,
      "latest_dep_time": Number(this.state.latest_dep_time),
      "truck_type": this.state.truck_type,
      "hierarchy": Number(this.state.hierarchy),
      "driving_time": Number(this.state.driving_time),
      "process_time": Number(this.state.process_time),
      "service_time": Number(this.state.service_time),
      "delivery_deadline": Number(this.state.delivery_deadline)
    }
    return data
  }

  getFormOrderData = () => {
    let temp = [];
    temp.push(
      this.state.Booking,
      this.state.City,
      this.state.Closing,
      this.state.Container,
      this.state.Date,
      this.state.Delay,
      this.state.F,
      this.state.G,
      this.state.Gate
    );
    console.log(temp);
    return temp;
  };
  handleChangeBooking = (event) => {
    this.setState({
      "Booking": event.target.value,
    });
  };
  handleChangeInl = (event) => {
    this.setState({
      "inl_terminal": event.target.value,
    });
  };
  handleChangeLatestDepTime = (event) => {
    this.setState({
      "latest_dep_time": event.target.value,
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
  handleChangeDeliveryDeadline = (event) => {
    this.setState({
      "delivery_deadline": event.target.value,
    });
  };
  handleChangeDrivingTime = (event) => {
    this.setState({
      "driving_time": event.target.value,
    });
  };
  handleChangeProcessTime = (event) => {
    this.setState({
      "process_time": event.target.value,
    });
  };
  handleChangeServiceTime = (event) => {
    this.setState({
      "service_time": event.target.value,
    });
  };
  handleChangeCity = (event) => {
    this.setState({
      "City": event.target.value,
    });
  };
  handleChangeClosing = (event) => {
    this.setState({
      "Closing": event.target.value,
    });
  };
  handleChangeContainer = (event) => {
    this.setState({
      "Container": event.target.value,
    });
  };
  handleChangeDate = (event) => {
    this.setState({
      "Date": event.target.value,
    });
  };
  handleChangeDelay = (event) => {
    this.setState({
      "Delay": event.target.value,
    });
  };
  handleChangeGate = (event) => {
    this.setState({
      "Gate": event.target.value,
    });
  };
  handleChangeGate1 = (event) => {
    this.setState({
      "Gate1": event.target.value,
    });
  };
  handleChangeGross = (event) => {
    this.setState({
      "Gross (kgs)": event.target.value,
    });
  };
  handleChangeInl_ter_1 = (event) => {
    this.setState({
      "Inl. ter. (1)": event.target.value,
    });
  };
  handleChangeInvoice_reference = (event) => {
    this.setState({
      "Invoice reference": event.target.value,
    });
  };
  handleChangeL_D = (event) => {
    this.setState({
      "L/D": event.target.value,
    });
  };
  handleChangeMax_departure = (event) => {
    this.setState({
      "Max. departure": event.target.value,
    });
  };
  handleChangePickup = (event) => {
    this.setState({
      "Pickup": event.target.value,
    });
  };
  handleChangeSeal = (event) => {
    this.setState({
      "Seal": event.target.value,
    });
  };
  handleChangeStatus = (event) => {
    this.setState({
      "Status" : event.target.value,
    });
  };
  handleChangeShip_comp = (event) => {
    this.setState({
      "Ship. comp.": event.target.value,
    });
  };
  handleChangeTariff_type = (event) => {
    this.setState({
      "Tariff type": event.target.value,
    });
  };
  handleChangeTerminal = (event) => {
    this.setState({
      "Terminal": event.target.value,
    });
  };
  handleChangeTerminal1 = (event) => {
    this.setState({
      "Terminal1": event.target.value,
    });
  };
  handleChangeTime = (event) => {
    this.setState({
      "Time": event.target.value,
    });
  };
  handleChangeTime1 = (event) => {
    this.setState({
      "Time1": event.target.value,
    });
  };
  handleChangeTime2 = (event) => {
    this.setState({
      "Time2": event.target.value,
    });
  };
  handleChangeTime3 = (event) => {
    this.setState({
      "Time3": event.target.value,
    });
  };
  handleChangeTruck = (event) => {
    this.setState({
      "Truck": event.target.value,
    });
  };
  handleChangeTruck1 = (event) => {
    this.setState({
      "Truck1": event.target.value,
    });
  };
  handleChangeTruck2 = (event) => {
    this.setState({
      "Truck2": event.target.value,
    });
  };
  handleChangeTruck3 = (event) => {
    this.setState({
      "Truck3": event.target.value,
    });
  };
  handleChangeTruck_used = (event) => {
    this.setState({
      "Truck Used": event.target.value,
    });
  };
  handleChangeUnit_type = (event) => {
    this.setState({
      "Unit_Type": event.target.value,
    });
  };
  handleChangeVoyage_inland_carrier = (event) => {
    this.setState({
      "Voyage/inland carrier": event.target.value,
    });
  };
  handleChangeWeight = (event) => {
    this.setState({
      "Weight": event.target.value,
    });
  };
  handleChangeDeparture_time = (event) => {
    this.setState({
      "departure_time": event.target.value,
    });
  };
  handleChangeTruck_id = (event) => {
    this.setState({
      "truck_id": event.target.value,
    });
  };
  handleChangeF = (event) => {
    this.setState({
      "F": event.target.value,
    });
  };
  handleChangeG = (event) => {
    this.setState({
      "G": event.target.value,
    });
  };
  handleChangePod = (event) => {
    this.setState({
      "POD": event.target.value,
    });
  };
  handleChangePositie = (event) => {
    this.setState({
     "Positie": event.target.value,
    });
  };
  handleChangeReference = (event) => {
    this.setState({
      "Reference": event.target.value,
    });
  };
  handleChangeTemperature = (event) => {
    this.setState({
      "Temperature °C": event.target.value,
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
              name="Booking"
              label="Booking:"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.Booking}
                onChange={this.handleChangeBooking}
              />
            </Form.Item>
            <Form.Item
              name="Inl_terminal"
              label="Inl Terminal:"
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
                value={this.state.latest_dep_time}
                onChange={this.handleChangeLatestDepTime}
              />
            </Form.Item>
            <Form.Item
              name="Truck Type"
              label="Truck Type:"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.truck_type}
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
            <Form.Item name="Container" label="Container:">
              <Input
                value={this.state.Container}
                onChange={this.handleChangeContainer}
              />
            </Form.Item>
            <Form.Item name="Unit Type" label="Unit Type:">
              <Input
                value={this.state["Unit type"]}
                onChange={this.handleChangeUnit_type}
              />
            </Form.Item>
            <Form.Item name="Ship_comp" label="Ship Comp.:">
              <Input
                value={this.state["Ship. comp."]}
                onChange={this.handleChangeShip_comp}
              />
            </Form.Item>
            <Form.Item name="City" label="City:">
              <Input value={this.state.City} onChange={this.handleChangeCity} />
            </Form.Item>
            <Form.Item name="Closing" label="Closing:">
              <Input
                value={this.state.Closing}
                onChange={this.handleChangeClosing}
              />
            </Form.Item>
            <Form.Item name="Date" label="Date:">
              <Input value={this.state.Date} onChange={this.handleChangeDate} />
            </Form.Item>
            <Form.Item name="Delay" label="Delay:">
              <Input
                value={this.state.Delay}
                onChange={this.handleChangeDelay}
              />
            </Form.Item>
            <Form.Item name="Gate" label="Gate:">
              <Input value={this.state.Gate} onChange={this.handleChangeGate} />
            </Form.Item>
            <Form.Item name="Gate1" label="Gate (1):">
              <Input
                value={this.state["Gate (1)"]}
                onChange={this.handleChangeGate1}
              />
            </Form.Item>
            <Form.Item name="Gross" label="Gross (kgs):">
              <Input
                value={this.state["Gross (kgs)"]}
                onChange={this.handleChangeGross}
              />
            </Form.Item>
            <Form.Item name="Inl_ter_1" label="Inl Terminal 1:">
              <Input
                value={this.state["Inl. ter. (1)"]}
                onChange={this.handleChangeInl_ter_1}
              />
            </Form.Item>
            <Form.Item name="Invoice_reference" label="Invoice Reference:">
              <Input
                value={this.state["Invoice reference"]}
                onChange={this.handleChangeInvoice_reference}
              />
            </Form.Item>
            <Form.Item name="L_D" label="L_D:">
              <Input value={this.state["L/D"]} onChange={this.handleChangeL_D} />
            </Form.Item>
            <Form.Item name="maxDeparture" label="Max. Departure:">
              <Input
                value={this.state["Max. departure"]}
                onChange={this.handleChangeMax_departure}
              />
            </Form.Item>
            <Form.Item name="Pickup" label="Pickup:">
              <Input
                value={this.state.Pickup}
                onChange={this.handleChangePickup}
              />
            </Form.Item>
            <Form.Item name="Seal" label="Seal:">
              <Input value={this.state.Seal} onChange={this.handleChangeSeal} />
            </Form.Item>
            <Form.Item name="Status" label="Status:">
              <Input
                value={this.state.Status}
                onChange={this.handleChangeStatus}
              />
            </Form.Item>
            <Form.Item name="Temperature" label="Temperature °C:">
              <Input
                value={this.state["Temperature °C"]}
                onChange={this.handleChangeTemperature}
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
                value={this.state.driving_time}
                onChange={this.handleChangeDrivingTime}
              />
            </Form.Item>
            <Form.Item
              name="processTime"
              label="Process Time:"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.process_time}
                onChange={this.handleChangeProcessTime}
              />
            </Form.Item>
            <Form.Item
              name="serviceTime"
              label="Service Time:"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.service_time}
                onChange={this.handleChangeServiceTime}
              />
            </Form.Item>
            <Form.Item
              name="deliveryDeadline"
              label="Delivery Deadline:"
              rules={[{ required: true }]}
            >
              <Input
                value={this.state.delivery_deadline}
                onChange={this.handleChangeDeliveryDeadline}
              />
            </Form.Item>
            <Form.Item name="Tariff_type" label="Tariff_type:">
              <Input
                value={this.state["Tariff type"]}
                onChange={this.handleChangeTariff_type}
              />
            </Form.Item>
            <Form.Item name="Terminal" label="Terminal:">
              <Input
                value={this.state.Terminal}
                onChange={this.handleChangeTerminal}
              />
            </Form.Item>
            <Form.Item name="Terminal1" label="Terminal 1:">
              <Input
                value={this.state["Terminal (1)"]}
                onChange={this.handleChangeTerminal1}
              />
            </Form.Item>
            <Form.Item name="Time" label="Time:">
              <Input value={this.state.Time} onChange={this.handleChangeTime} />
            </Form.Item>
            <Form.Item name="Time1" label="Time (1):">
              <Input
                value={this.state["Time (1)"]}
                onChange={this.handleChangeTime1}
              />
            </Form.Item>
            <Form.Item name="Time2" label="Time (2):">
              <Input
                value={this.state["Time (2)"]}
                onChange={this.handleChangeTime2}
              />
            </Form.Item>
            <Form.Item name="Time3" label="Time (3):">
              <Input
                value={this.state["Time (3)"]}
                onChange={this.handleChangeTime3}
              />
            </Form.Item>
            <Form.Item name="Truck" label="Truck:">
              <Input
                value={this.state.Truck}
                onChange={this.handleChangeTruck1}
              />
            </Form.Item>
            <Form.Item name="Truck1" label="Truck (1):">
              <Input
                value={this.state["Truck (1)"]}
                onChange={this.handleChangeTruck2}
              />
            </Form.Item>
            <Form.Item name="Truck2" label="Truck (2):">
              <Input
                value={this.state["Truck (2)"]}
                onChange={this.handleChangeTruck_used}
              />
            </Form.Item>
            <Form.Item
              name="Voyage_inland_carrier"
              label="Voyage Inland Carrier:"
            >
              <Input
                value={this.state["Voyage/inland carrier"]}
                onChange={this.handleChangeVoyage_inland_carrier}
              />
            </Form.Item>
            <Form.Item name="Weight" label="Weight:">
              <Input
                value={this.state.Weight}
                onChange={this.handleChangeWeight}
              />
            </Form.Item>
            <Form.Item name="Departure_time" label="Departure_time:">
              <Input
                value={this.state.departure_time}
                onChange={this.handleChangeDeparture_time}
              />
            </Form.Item>
            <Form.Item name="F" label="F:">
              <Input value={this.state.F} onChange={this.handleChangeF} />
            </Form.Item>
            <Form.Item name="G" label="G:">
              <Input value={this.state.G} onChange={this.handleChangeG} />
            </Form.Item>
            <Form.Item name="POD" label="POD:">
              <Input value={this.state.POD} onChange={this.handleChangePod} />
            </Form.Item>
            <Form.Item name="Positie" label="Positie:">
              <Input
                value={this.state.Positie}
                onChange={this.handleChangePositie}
              />
            </Form.Item>
            <Form.Item name="Reference" label="Reference:">
              <Input
                value={this.state.Reference}
                onChange={this.handleChangeReference}
              />
            </Form.Item>
            <Form.Item name="Truck_id" label="Truck_id:">
              <Input
                value={this.state.truck_id}
                onChange={this.handleChangeTruck_id}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}
