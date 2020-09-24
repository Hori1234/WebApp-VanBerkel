import React, { Component } from 'react'
import AuthContext from "../contextConfig.js"
import {Layout, Image, Typography, Button, Divider } from 'antd';
import 'antd/dist/antd.css';
import {
    Link
} from "react-router-dom";
const { Text } = Typography;


export default class Logout extends Component {

    render() {
        return (
            <AuthContext.Consumer>
                {(context) => (
                    <Layout style={{ flexDirection: "column", alignItems: "center", display: "flex", marginBottom: 1, width: "100%", backgroundColor: "white" }}>
                        <Layout style={{ flexDirection: "column", backgroundColor: "white" }}>
                            <Text style={{ fontWeight: "bold", fontSize: "18" }}>Logout</Text>
                            <Text style={{ fontSize: " 14" }}>Are you sure you would like to logout?</Text>
                        </Layout>
                        <Layout style={{ alignItems: "center", backgroundColor: "white" }}>
                            <Button type="primary" onClick={() => context.changeUser('','')}>Logout</Button>
                        </Layout>
                    </Layout>  
                )}
            </AuthContext.Consumer>
        );
    };
}
