import React, {Component} from "react";
import {Form, Input, Typography, Row, Col, message} from "antd";
import "antd/dist/antd.css";

const {Text} = Typography;

export default class AddOrdersLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingNumber: "",
            inl: "",
            latestDepTime: "",
            truckType: "",
            hierarchy: "",
            deliveryDeadline: "",
            drivingTime: "",
            processTime: "",
            serviceTime: "",
            city: "",
            closing: "",
            container: "",
            date: "",
            delay: "",
            gate: "",
            gate1: "",
            gross: "",
            inl_ter_1: "",
            invoice_reference: "",
            l_d: "",
            max_departure: "",
            pickup: "",
            seal: "",
            status: "",
            ship_comp: "",
            tariff_type: "",
            terminal1: "",
            time: "",
            time1: "",
            time2: "",
            time3: "",
            truck1: "",
            truck2: "",
            truck_used: "",
            unit_type: "",
            voyage_inland_carrier: "",
            weight: "",
            departure_time: "",
            truck_id: "",

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
    handleChangeBookingNumber = (event) => {
        this.setState({
            bookingNumber: event.target.value,
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
    handleChangeCity = (event) => {
        this.setState({
            city: event.target.value,
        });
    };
    handleChangeClosing = (event) => {
        this.setState({
            closing: event.target.value,
        });
    };
    handleChangeContainer = (event) => {
        this.setState({
            container: event.target.value,
        });
    };
    handleChangeDate = (event) => {
        this.setState({
            date: event.target.value,
        });
    };
    handleChangeDelay = (event) => {
        this.setState({
            delay: event.target.value,
        });
    };
    handleChangeGate = (event) => {
        this.setState({
            gate: event.target.value,
        });
    };
    handleChangeGate1 = (event) => {
        this.setState({
            gate1: event.target.value,
        });
    };
    handleChangeGross = (event) => {
        this.setState({
            gross: event.target.value,
        });
    };
    handleChangeInl_ter_1 = (event) => {
        this.setState({
            inl_ter_1: event.target.value,
        });
    };
    handleChangeInvoice_reference = (event) => {
        this.setState({
            invoice_reference: event.target.value,
        });
    };
    handleChangeL_D = (event) => {
        this.setState({
            l_d: event.target.value,
        });
    };
    handleChangeMax_departure = (event) => {
        this.setState({
            max_departure: event.target.value,
        });
    };
    handleChangePickup = (event) => {
        this.setState({
            pickup: event.target.value,
        });
    };
    handleChangeSeal = (event) => {
        this.setState({
            seal: event.target.value,
        });
    };
    handleChangeStatus = (event) => {
        this.setState({
            status: event.target.value,
        });
    };
    handleChangeShip_comp = (event) => {
        this.setState({
            ship_comp: event.target.value,
        });
    };
    handleChangeTariff_type = (event) => {
        this.setState({
            tariff_type: event.target.value,
        });
    };
    handleChangeTerminal1 = (event) => {
        this.setState({
            terminal1: event.target.value,
        });
    };
    handleChangeTime = (event) => {
        this.setState({
            time: event.target.value,
        });
    };
    handleChangeTime1 = (event) => {
        this.setState({
            time1: event.target.value,
        });
    };
    handleChangeTime2 = (event) => {
        this.setState({
            time2: event.target.value,
        });
    };
    handleChangeTime3 = (event) => {
        this.setState({
            time3: event.target.value,
        });
    };
    handleChangeTruck1 = (event) => {
        this.setState({
            truck1: event.target.value,
        });
    };
    handleChangeTruck2 = (event) => {
        this.setState({
            truck2: event.target.value,
        });
    };
    handleChangeTruck_used = (event) => {
        this.setState({
            truck_used: event.target.value,
        });
    };
    handleChangeUnit_type = (event) => {
        this.setState({
            unit_type: event.target.value,
        });
    };
    handleChangeVoyage_inland_carrier = (event) => {
        this.setState({
            voyage_inland_carrier: event.target.value,
        });
    };
    handleChangeWeight = (event) => {
        this.setState({
            weight: event.target.value,
        });
    };
    handleChangeDeparture_time = (event) => {
        this.setState({
            departure_time: event.target.value,
        });
    };
    handleChangeTruck_id = (event) => {
        this.setState({
            truck_id: event.target.value,
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
                style={{width: "100vh", marginRight: 20}}
                name="nest-messages"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                validateMessages={validateMessages}
            >
                <Row gutter={[24, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name="bookingNumber"
                            label="Booking Number:"
                            rules={[{required: true}]}
                        >
                            <Input
                                value={this.state.bookingNumber}
                                onChange={this.handleChangeBookingNumber}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Inl_terminal"
                            label="Inl_terminal:"
                            rules={[{required: true}]}
                        >
                            <Input value={this.state.inl} onChange={this.handleChangeInl}/>
                        </Form.Item>
                        <Form.Item
                            name="Latest Dep Time"
                            label="Latest Dep Time:"
                            rules={[{required: true}]}
                        >
                            <Input
                                value={this.state.latestDepTime}
                                onChange={this.handleChangeLatestDepTime}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Truck Type"
                            label="Truck Type:"
                            rules={[{required: true}]}
                        >
                            <Input
                                value={this.state.truckType}
                                onChange={this.handleChangeTruckType}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Hierarchy"
                            label="Hierarchy:"
                            rules={[{required: true}]}
                        >
                            <Input
                                value={this.state.hierarchy}
                                onChange={this.handleChangeHierarchy}
                            />
                        </Form.Item>
                        <Form.Item
                            name="City"
                            label="City:"
                        >
                            <Input
                                value={this.state.city}
                                onChange={this.handleChangeCity}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Closing"
                            label="Closing:"
                        >
                            <Input
                                value={this.state.closing}
                                onChange={this.handleChangeClosing}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Container"
                            label="Container:"
                        >
                            <Input
                                value={this.state.container}
                                onChange={this.handleChangeContainer}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Date"
                            label="Date:"
                        >
                            <Input
                                value={this.state.date}
                                onChange={this.handleChangeDate}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Delay"
                            label="Delay:"
                        >
                            <Input
                                value={this.state.delay}
                                onChange={this.handleChangeDelay}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Gate"
                            label="Gate:"
                        >
                            <Input
                                value={this.state.gate}
                                onChange={this.handleChangeGate}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Gate1"
                            label="Gate1:"
                        >
                            <Input
                                value={this.state.gate1}
                                onChange={this.handleChangeGate1}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Gross"
                            label="Gross:"
                        >
                            <Input
                                value={this.state.gross}
                                onChange={this.handleChangeGross}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Inl_ter_1"
                            label="Inl_ter_1:"
                        >
                            <Input
                                value={this.state.inl_ter_1}
                                onChange={this.handleChangeInl_ter_1}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Invoice_reference"
                            label="Invoice_reference:"
                        >
                            <Input
                                value={this.state.invoice_reference}
                                onChange={this.handleChangeInvoice_reference}
                            />
                        </Form.Item>
                        <Form.Item
                            name="L_D"
                            label="L_D:"
                        >
                            <Input
                                value={this.state.l_d}
                                onChange={this.handleChangeL_D}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Max_Departure"
                            label="Max_Departure:"
                        >
                            <Input
                                value={this.state.max_departure}
                                onChange={this.handleChangeMax_departure}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Pickup"
                            label="Pickup:"
                        >
                            <Input
                                value={this.state.pickup}
                                onChange={this.handleChangePickup}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Seal"
                            label="Seal:"
                        >
                            <Input
                                value={this.state.seal}
                                onChange={this.handleChangeSeal}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Status"
                            label="Status:"
                        >
                            <Input
                                value={this.state.status}
                                onChange={this.handleChangeStatus}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="Driving Time"
                            label="Driving Time:"
                            rules={[{required: true}]}
                        >
                            <Input
                                value={this.state.drivingTime}
                                onChange={this.handleChangeDrivingTime}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Process Time"
                            label="Process Time:"
                            rules={[{required: true}]}
                        >
                            <Input
                                value={this.state.processTime}
                                onChange={this.handleChangeProcessTime}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Service Time"
                            label="Service Time:"
                            rules={[{required: true}]}
                        >
                            <Input
                                value={this.state.serviceTime}
                                onChange={this.handleChangeServiceTime}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Delivery Deadline"
                            label="Delivery Deadline:"
                            rules={[{required: true}]}
                        >
                            <Input
                                value={this.state.deliveryDeadline}
                                onChange={this.handleChangeDeliveryDeadline}
                            />
                        </Form.Item>

                        <Form.Item
                            name="Ship_comp"
                            label="Ship_comp:"
                        >
                            <Input
                                value={this.state.ship_comp}
                                onChange={this.handleChangeShip_comp}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Tariff_type"
                            label="Tariff_type:"
                        >
                            <Input
                                value={this.state.tariff_type}
                                onChange={this.handleChangeTariff_type}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Terminal1"
                            label="Terminal1:"
                        >
                            <Input
                                value={this.state.terminal1}
                                onChange={this.handleChangeTerminal1}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Time"
                            label="Time:"
                        >
                            <Input
                                value={this.state.time}
                                onChange={this.handleChangeTime}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Time1"
                            label="Time1:"
                        >
                            <Input
                                value={this.state.time1}
                                onChange={this.handleChangeTime1}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Time2"
                            label="Time2:"
                        >
                            <Input
                                value={this.state.time2}
                                onChange={this.handleChangeTime2}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Time3"
                            label="Time3:"
                        >
                            <Input
                                value={this.state.time3}
                                onChange={this.handleChangeTime3}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Truck1"
                            label="Truck1:"
                        >
                            <Input
                                value={this.state.truck1}
                                onChange={this.handleChangeTruck1}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Truck2"
                            label="Truck2:"
                        >
                            <Input
                                value={this.state.truck2}
                                onChange={this.handleChangeTruck2}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Truck_used"
                            label="Truck_used:"
                        >
                            <Input
                                value={this.state.truck_used}
                                onChange={this.handleChangeTruck_used}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Unit_type"
                            label="Unit_type:"
                        >
                            <Input
                                value={this.state.unit_type}
                                onChange={this.handleChangeUnit_type}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Voyage_inland_carrier"
                            label="Voyage_inland_carrier:"
                        >
                            <Input
                                value={this.state.voyage_inland_carrier}
                                onChange={this.handleChangeVoyage_inland_carrier}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Weight"
                            label="Weight:"
                        >
                            <Input
                                value={this.state.weight}
                                onChange={this.handleChangeWeight}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Departure_time"
                            label="Departure_time:"
                        >
                            <Input
                                value={this.state.departure_time}
                                onChange={this.handleChangeDeparture_time}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Truck_id"
                            label="Truck_id:"
                        >
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
