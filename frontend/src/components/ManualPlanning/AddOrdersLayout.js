import React, {Component} from "react";
import {Button, Layout, Form, Input, Typography, Select, Divider, Row, Col} from "antd";
import axios from "axios";
import "antd/dist/antd.css";

const {Text, Title} = Typography;
const {Option} = Select;

export default class AddOrdersLayout extends Component {
    render() {
        return (
            <Form>
                <Row gutter={[24, 8]}>
                    <Col span={8}>
                        <Text>Order Number:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item></Col>
                    <Col span={8}>
                        <Text>Inl:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item></Col>
                    <Col span={8}>
                        <Text>Latest Dep Time:</Text>
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
                        <Text>Hierarchy:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item></Col>
                    <Col span={8}>
                        <Text>Delivery Deadline:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={[24, 8]}>
                    <Col span={8}>
                        <Text>Driving Time:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item></Col>
                    <Col span={8}>
                        <Text>Process Time:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item></Col>
                    <Col span={8}>
                        <Text>Service Time:</Text>
                        <Form.Item rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        );
    }
}
