import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { 
    Layout, 
    Menu, 
    Avatar,
    Divider , } from 'antd';
import { 
    UserOutlined, 
    LaptopOutlined,
     
    NotificationOutlined } from '@ant-design/icons';

import SignInComponent from "../SignIn/SignInComponent"
import "../Css/NavigationLayout.css"
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

export default class NavigationLayout extends Component {
    render() {
        return (
            <Layout style={{ height: "100vh" }}>
                
                <Layout style={{margin: 10}}>
                    
                    <Sider width={200} className="site-layout-background">
                        <Layout 
                            className="dividers-style" >
                            <Avatar
                                style={{marginTop: 10}}
                                shape="square" 
                                size={64} 
                                icon={<UserOutlined />} />
                            <Divider>T.R.U.C.K.</Divider>
                        </Layout>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' , height: '100%'}}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                marginTop: 25,
                                minHeight: 280,
                                
                            }}
                            >
                            Show the control panel for each of the users connected
                            <Layout style={{alignItems: "center"}}>
                                <SignInComponent/>
                            </Layout>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>T.R.U.C.K. ©2020 Created by SEP Group 2</Footer>
                    </Layout>
                </Layout>

            </Layout>
        )
    }
}
