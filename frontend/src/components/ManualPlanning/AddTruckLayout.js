import React, {Component} from "react";
import {Button, Layout, Form, Input, Typography, Select, Divider, Row, Col} from "antd";
import axios from "axios";
import "antd/dist/antd.css";

const {Text, Title} = Typography;
const {Option} = Select;

export default class AddTruckLayout extends Component {
    render() {
        return (
            <Form>
                <Row gutter={[24, 8]}>
                    <Col span={8}>
                        <Text>Truck ID:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item></Col>
                    <Col span={8}>
                        <Text>Truck S No:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item></Col>
                    <Col span={8}>
                        <Text>Availability:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[24, 8]}>
                    <Col span={8}>
                        <Text>Truck Type:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item></Col>
                    <Col span={8}>
                        <Text>Terminal:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item></Col>
                    <Col span={8}>
                        <Text>hierarchy:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={[24, 8]}>
                    <Col span={8}>
                        <Text>Use Cost:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item></Col>
                    <Col span={8}>
                        <Text>Starting Time:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item></Col>
                    <Col span={8}>
                        <Text>Date:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        );
    }
}
