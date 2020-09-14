import React, { Component } from 'react'
import { Upload, message, Row, Col, Card, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const { Dragger } = Upload;

export default class UploadButton extends Component {
    render() {
        const props = {
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange(info) {
                const { status } = info.file;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Upload Order List" bordered={false}>
                        <Row gutter={[16, 24]} >
                            <Col className="gutter-row">
                                <Dragger {...props}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                        band files
                                </p>
                                </Dragger>
                            </Col>
                            <Col className="gutter-row">
                                <Button type="primary">Comfirm Upload</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Upload Truck Availibility" bordered={false}>
                        <Row gutter={[16, 24]} >
                            <Col className="gutter-row">
                                <Dragger {...props}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                        band files
                                </p>
                                </Dragger>
                            </Col>
                            <Col className="gutter-row">
                                <Button type="primary">Comfirm Upload</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        )
    }
}
