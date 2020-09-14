import React, { Component } from 'react'
import {
    Layout,
    Menu,
    Avatar,
    Form, 
    Input, 
    Button, 
    Checkbox,
    Typography, Space,
    Divider,
} from 'antd';
import 'antd/dist/antd.css';
import {
    UserOutlined,
    LaptopOutlined,

    NotificationOutlined
} from '@ant-design/icons';


const { Text, Link, Title  } = Typography;

export default class SignInComponent extends Component {
    
    
    constructor(props) {
        super(props)
        
    };

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
            <Layout style={{ margin: 30, height: '95vh', display: "flex", }}>
                <Layout style={{alignItems: "center", marginTop: 15}}>
                    <Avatar
                        style={{ marginTop: 100 }}
                        shape="square"
                        size={64}
                        icon={<UserOutlined />} />
                    <Divider style={{marginTop: 10}}>Welcome</Divider>
                </Layout> 
                
                <Layout style={{alignItems: "center" ,display: "flex", marginTop: -70, marginBottom: -120}}>
                        <Title style ={{marginLeft: -280}} level={5.2}>Sign In</Title>
                        <Title style ={{marginLeft: -190}} level={5}>Fil the form in order to login</Title>
                </Layout>
                
                <Layout style={{alignItems: "center" ,display: "flex", marginTop: -50 }}>
                    
                   
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
                            style={{width:'100%', marginRight: 180,marginLeft: -50}}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            style={{width:'100%', marginRight: 180,marginLeft: -50}}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked"
                            style={{width:'100%', marginRight: 180,marginLeft: -50}}
                        > 
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" 
                                style={{marginLeft: 10, marginTop: 60, width: '60%'}}
                                onClick={this.props.changeState}
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Layout>

           </Layout> 
        )
        
    }
}
