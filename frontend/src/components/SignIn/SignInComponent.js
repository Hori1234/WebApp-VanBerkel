import React, { Component } from 'react'
import {
    Layout,
    Menu,
    Avatar,
    Form, 
    Input, 
    Button, 
    Checkbox,
    Divider,
} from 'antd';
import 'antd/dist/antd.css';
import {
    UserOutlined,
    LaptopOutlined,

    NotificationOutlined
} from '@ant-design/icons';


export default class SignInComponent extends Component {
    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };

        const onFinish = values => {
            console.log('Success:', values);
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Layout style={{ margin: 30, height: '70vh', display: "flex", width: '40%'}}>
                <Layout style={{alignItems: "center"}}>
                    <Avatar
                        style={{ marginTop: 10 }}
                        shape="square"
                        size={64}
                        icon={<UserOutlined />} />
                    <Divider>Welcome</Divider>
                    <h1> Sign In</h1>
                </Layout> 

                <Layout style={{alignItems: "center",  width: '100%'}}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Layout>

           </Layout> 
        )
        
    }
}
