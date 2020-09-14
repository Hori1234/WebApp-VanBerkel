import React, { Component } from 'react'
import { Upload, message, Layout } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Image } from 'antd';

export default class Home extends Component {
    render() {
        return (
            <Layout style={{alignItems: "center", display: "flex"}}>
                <Layout style={{flexDirection: "row", justifyContent: "space-around", marginBottom: 50, padding: 25}}>
                    <Image style={{marginRight: 50}}
                        width={100}
                        src={require("../Images/1635626-200.png")}
                    />
                    <Image
                        width={100}
                        src={require("../Images/upload-file.svg")}
                    />
                </Layout>

                <Layout style={{flexDirection: "row", justifyContent: "space-around", marginBottom: 50, padding: 25}}>
                    <Image style={{marginRight: 50, marginBottom: 50}}
                        width={100}
                        src={require("../Images/23_generate_value_for_investors_rapid_growth_planning-512.svg")}
                    />
                    <Image
                        width={100}
                        src={require("../Images/view-planning.svg")}
                    />
                </Layout>

                <Layout style={{flexDirection: "row", justifyContent: "space-around"}}>
                    <Image style={{marginRight: 50, marginBottom: 50}}
                        width={100}
                        src={require("../Images/Data Visualisation.webp")}
                    />
                    <Image
                        width={100}
                        src={require("../Images/Data Analytics.webp")}
                    />
                </Layout>
            </Layout>
        )
    }
}
