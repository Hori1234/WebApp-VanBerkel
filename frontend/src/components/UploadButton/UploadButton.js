import React, { Component } from "react";
import {
  Upload,
  message,
  Row,
  Col,
  Card,
  Button,
  Layout,
  Typography,
  Divider,
  Image,
} from "antd";
import { InboxOutlined, FileExcelOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { post } from "axios";

const { Dragger } = Upload;
const { Text } = Typography;

export default class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onPress = this.onPress.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onChange(info) {
    this.setState({ file: info.file });
  }

  onPress(e) {
    e.preventDefault(); // Stop form submit
    console.log(this.state.file);
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
    });
  }

  fileUpload(file) {
    const url = "";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  }

  render() {
    const props = {
      name: "file",
      multiple: false,
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <Layout style={{ backgroundColor: "white" }}>
        <Layout
          style={{
            display: "flex",
            marginBottom: 20,
            height: "40vh",
            backgroundColor: "white",
          }}
        >
          <Card style={{ height: "100%" }}>
            <Layout
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                marginBottom: 35,
              }}
            >
              <Image
                style={{ marginRight: 20 }}
                preview={false}
                width={100}
                src={require("../Images/upload-file.svg")}
              />
              <Layout
                style={{ flexDirection: "column", backgroundColor: "white" }}
              >
                <Text style={{ fontWeight: "bold", fontSize: "18" }}>
                  Upload Documents
                </Text>
                <Text style={{ fontSize: " 14" }}>
                  Upload the documents for the creation of the plannings
                </Text>
              </Layout>
            </Layout>
            <Divider />
            <Layout
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                marginBottom: 35,
              }}
            >
              <FileExcelOutlined
                style={{ fontSize: "100px", marginRight: 20 }}
              />
              <Layout
                style={{ flexDirection: "column", backgroundColor: "white" }}
              >
                <Text style={{ fontWeight: "bold", fontSize: "18" }}>
                  Upload Order List
                </Text>
                <Text style={{ fontSize: " 14" }}>
                  Upload the Excel file that contains the list of all{" "}
                </Text>
                <Text style={{ fontSize: " 14" }}>
                  the orders that will be placed this month
                </Text>
              </Layout>
            </Layout>
            <Divider />
            <Layout style={{ flexDirection: "row", backgroundColor: "white" }}>
              <FileExcelOutlined
                style={{ fontSize: "100px", marginRight: 20 }}
              />
              <Layout
                style={{ flexDirection: "column", backgroundColor: "white" }}
              >
                <Text style={{ fontWeight: "bold", fontSize: "18" }}>
                  Upload Truck Availibility List
                </Text>
                <Text style={{ fontSize: " 14" }}>
                  Upload the documents for the creation of the plannings
                </Text>
              </Layout>
            </Layout>
          </Card>
        </Layout>

        <Layout style={{ backgroundColor: "white" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Upload Order List" bordered={false}>
                <Row gutter={[16, 24]}>
                  <Col className="gutter-row">
                    <Dragger onChange={this.onChange}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit
                        from uploading company data or other band files
                      </p>
                    </Dragger>
                  </Col>
                  <Col className="gutter-row">
                    <Button
                      type="primary"
                      style={{ marginTop: 10 }}
                      onClick={this.onPress}
                    >
                      Comfirm Upload
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Upload Truck Availibility" bordered={false}>
                <Row gutter={[16, 24]}>
                  <Col className="gutter-row">
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit
                        from uploading company data or other band files
                      </p>
                    </Dragger>
                  </Col>
                  <Col className="gutter-row">
                    <Button type="primary" style={{ marginTop: 10 }}>
                      Comfirm Upload
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Layout>
      </Layout>
    );
  }
}
