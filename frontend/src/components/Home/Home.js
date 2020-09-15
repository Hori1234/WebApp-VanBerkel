import React, { Component } from 'react'
import { Upload, message, Layout } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Image } from 'antd';

export default class Home extends Component {
    render() {
        return (
            <Layout style={{flexDirection: "row", alignItems: "center", display: "flex"}}>
                <Layout style={{justifyContent: "space-around", marginBottom: 50, padding: 20}}>
                    <Layout style={{flexDirection: "row", alignItems: "center", display: "flex"}}>
                        <Image style={{marginRight: 50, marginBottom: 50}}
                            width={100}
                            src={require("../Images/1635626-200.png")}
                        />
                        Account Management
                    </Layout>

                    <Layout style={{flexDirection: "row", alignItems: "center", display: "flex"}}>
                        <Image style={{marginRight: 50, marginBottom: 50}}
                            width={100}
                            src={require("../Images/23_generate_value_for_investors_rapid_growth_planning-512.svg")}
                        />
                        Generate Planning
                    </Layout>

                    <Layout style={{flexDirection: "row", alignItems: "center", display: "flex"}}>
                        <Image style={{marginRight: 50}}
                           width={100}
                           src={require("../Images/Data Visualisation.webp")}
                        />
                        Data Visualisation
                    </Layout>
                </Layout>

                <Layout style={{justifyContent: "space-around", marginBottom: 50, padding: 20}}>
                    <Layout style={{flexDirection: "row", alignItems: "center", display: "flex"}}>
                        <Image style={{marginRight: 50, marginBottom: 50}}
                            width={100}
                            src={require("../Images/upload-file.svg")}
                        />
                        Upload Files
                    </Layout>

                    <Layout style={{flexDirection: "row", alignItems: "center", display: "flex"}}>
                        <Image style={{marginRight: 50, marginBottom: 50}}
                            width={100}
                            src={require("../Images/view-planning.svg")}
                        />
                        View Planning
                    </Layout>

                    <Layout style={{flexDirection: "row", alignItems: "center", display: "flex"}}>
                        <Image style={{marginRight: 50}}
                            width={100}
                            src={require("../Images/Data Analytics.webp")}
                        />
                        Data Analytics
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
