import React, {Component} from "react";
import {Form, Input, Typography, Row, Col} from "antd";
import "antd/dist/antd.css";

const {Text} = Typography;

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
                    <Col span={12}>
                        <Form.Item name={""} label={"Truck Id:"} rules={[{required: true}]}>
                            <Input
                                disabled={false}
                                value={this.state.truck_id}
                                onChange={this.handleChangeTruckId}
                            />
                        </Form.Item>
                        <Form.Item name={"Truck S No"} label={"Truck S No:"} rules={[{required: true}]}>
                            <Input
                                value={this.state.truck_snumber}
                                onChange={this.handleChangeTruckSNumber}
                            />
                        </Form.Item>

                        <Form.Item name={"Availability"} label={"Availability:"} rules={[{required: true}]}>
                            <Input
                                value={this.state.availability}
                                onChange={this.handleChangeAvailability}
                            />
                        </Form.Item>
                        <Form.Item name={"Truck Type"} label={"Truck Type:"} rules={[{required: true}]}>
                            <Input
                                value={this.state.truck_type}
                                onChange={this.handleChangeTruckType}
                            />
                        </Form.Item>
                        <Form.Item name={"Terminal"} label={"Terminal:"} rules={[{required: true}]}>
                            <Input
                                value={this.state.terminal}
                                onChange={this.handleChangeTerminal}
                            />
                        </Form.Item>
                        <Form.Item name={"hierarchy"} label={"hierarchy:"} rules={[{required: true}]}>
                            <Input
                                value={this.state.hierarchy}
                                onChange={this.handleChangeHierarchy}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name={"Use Cost"} label={"Use Cost:"} rules={[{required: true}]}>
                            <Input
                                value={this.state.use_cost}
                                onChange={this.handleChangeUseCost}
                            />
                        </Form.Item>
                        <Form.Item name={"Starting Time"} label={"Starting Time:"} rules={[{required: true}]}>
                            <Input
                                value={this.state.starting_time}
                                onChange={this.handleChangeStartingTime}
                            />
                        </Form.Item>
                        <Form.Item name={"Date"} label={"Date:"} rules={[{required: true}]}>
                            <Input value={this.state.date} onChange={this.handleChangeDate}/>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        );
    }
}
