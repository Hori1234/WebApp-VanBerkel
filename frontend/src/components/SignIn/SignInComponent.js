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

const axios = require('axios');
const { Text, Link, Title  } = Typography;



export default class SignInComponent extends Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            role: "tmp"
        }
        
    };

    postCredentials = async(uss, pass) => {
            
        var responseRole="";
        
        await axios.post('/api/auth/login', {
            username: "test2",
            password: "test2",
            remember: true
        })
        .then(function (response) {
            console.log(response);
            console.log(response.data.role);
            //this.props.userRole = response.data.role;
            responseRole = response.data.role;
            console.log("===============");
        })
        .catch(function (error) {
            console.log(error);
        });

        console.log("waiting for post response");
        //responseRole = "view only";
        this.onChangeRole(responseRole);  
        console.log(this.state.role);
    };


    onChangeRole = (value) => {
        this.setState({
            role: value
        });
    }

    onAuthentificate = async() => {
        await this.postCredentials();
        console.log("check state: " + this.state.role);
        this.props.changeUser(this.state.role);
        this.props.changeState();
    };

    onFinis = value => {
        console.log('Failed:', value);
    };
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
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
                        onFinish={this.onFinis}
                        onFinishFailed={this.onFinishFailed}
                        
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
                                onClick={this.onAuthentificate.bind(this)}
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
