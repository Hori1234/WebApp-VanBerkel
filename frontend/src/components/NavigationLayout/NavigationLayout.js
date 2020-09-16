import React, { Component , useState} from 'react'
import 'antd/dist/antd.css';
import { 
    Layout, 
    Menu, 
    Avatar,
    Divider , Upload } from 'antd';
import { 
    UserOutlined, 
    LaptopOutlined,
     
    NotificationOutlined 
} from '@ant-design/icons';

import TestComponent from "./TestComponent"
import Home from "../Home/Home"
import UploadButton from "../UploadButton/UploadButton"
import "../Css/NavigationLayout.css"
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

export default class NavigationLayout extends Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            isEmptyState: true ,
            isMenuItemClickedState: false,
            UserState: false,
        }
    };

    triggerAddTripState = (value) => {
        this.setState({
          ...this.state,
          isMenuItemClickedState: value,
        })
    };

    changeUser = (value) => {
        this.setState({
            ...this.state,
            UserState: value,
        })
        console.log(this.state.UserState);
    };

    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
        const divider = document.getElementsByClassName('ant-divider')[0];
        const userTypesButton = document.getElementById('user-types');

        if (collapsed) {
            divider.style.setProperty('display', 'none');
            userTypesButton.style.setProperty('display', 'none');
        }
        else {
            divider.style.setProperty('display', 'flex');
            userTypesButton.style.setProperty('display', 'initial');
        }

    };
    
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
                           <TestComponent 
                            UserVO={() => this.changeUser("View Only")} 
                            UserAdmin={() => this.changeUser("Administrator")}
                            UserPlanner={() => this.changeUser("Planner")}
                            />
                        </Layout>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                           {this.state.UserState == 'Administrator' &&
                            
                                <SubMenu key="sub1" icon={<UserOutlined />} title="User Type: ">
                                    <Menu.Item key="1" onClick={() => this.triggerAddTripState('am')}>Account Management</Menu.Item>
                                    <Menu.Item key="2" onClick={() => this.triggerAddTripState('upp')}>Upload</Menu.Item>
                                    <Menu.Item key="3" onClick={() => this.triggerAddTripState('cp')}>Create Planning</Menu.Item>
                                    <Menu.Item key="4" onClick={() => this.triggerAddTripState('vp')}>View Planning</Menu.Item>
                                    <Menu.Item key="5" onClick={() => this.triggerAddTripState('dv')}>Data Visualization</Menu.Item>
                                    <Menu.Item key="6" onClick={() => this.triggerAddTripState('mda')}>Monthly Data Analytics</Menu.Item>
                                    
                                </SubMenu>
                            }
                            
                            {this.state.UserState == 'Planner' &&
                            
                                <SubMenu key="sub1" icon={<UserOutlined />} title="User Type: ">
                                    <Menu.Item key="2" onClick={() => this.triggerAddTripState('upp')}>Upload</Menu.Item>
                                    <Menu.Item key="3" onClick={() => this.triggerAddTripState('cp')}>Create Planning</Menu.Item>
                                    <Menu.Item key="4" onClick={() => this.triggerAddTripState('vp')}>View Planning</Menu.Item>
                                    <Menu.Item key="5" onClick={() => this.triggerAddTripState('dv')}>Data Visualization</Menu.Item>
                                    <Menu.Item key="6" onClick={() => this.triggerAddTripState('mda')}>Monthly Data Analytics</Menu.Item>
                                </SubMenu>
                            }

                            {this.state.UserState == 'View Only' &&
                            
                                <SubMenu key="sub1" icon={<UserOutlined />} title="User Type: ">
                                    <Menu.Item key="4" onClick={() => this.triggerAddTripState('vp')}>View Planning</Menu.Item>
                                    <Menu.Item key="5" onClick={() => this.triggerAddTripState('dv')}>Data Visualization</Menu.Item>
                                    <Menu.Item key="6" onClick={() => this.triggerAddTripState('mda')}>Monthly Data Analytics</Menu.Item>
                                    
                                </SubMenu>
                            }

                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' , height: '100%', }}>
                        <Layout  
                            style={{ 
                                    marginTop: 25,
                                    minHeight: 280,
                                    alignItems:'center',
                                    width: '100%', }}>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    marginTop: 25,
                                    minHeight: 280,
                                    width: '100%'
                                }}
                                >
                                <Layout 
                                    style={{
                                        padding: 24,
                                        width: '100%',
                                        height: '100%',
                                        alignItems: "center",
                                        backgroundColor: "white"
                                    }}>
                                    {this.state.isMenuItemClickedState == "upp" && <UploadButton/> }
                                    {this.state.isMenuItemClickedState == false && <Home/> }
                                
                                    
                                </Layout>
                            
                            </Content>
                        </Layout>
                        <Footer style={{ textAlign: 'center' }}>T.R.U.C.K. ©2020 Created by SEP Group 2</Footer>
                    </Layout>
                    
                </Layout>

            </Layout>
        )
    }
}
