import React, { Component } from "react";
import { Layout, List, Spin, Avatar, Button, message, Modal } from "antd";

import axios from "axios";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import InfiniteScroll from "react-infinite-scroller";
import "../Css/EditAC.css";
import DeleteAccountConfirmationComponent from "./DeleteAccountModalComponent";
var vPage = 1;
const vPage_size = 10;

export default class EditAccountComponent extends Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    error: "",
    status: "",
    DAVisible: false,
    item: "",
  };

  componentDidMount() {
    this.getUsers(1, 10);

    console.log(this.state.data);
  }

  getUsers = async (vPage, vPage_size) => {
    let { data } = this.state;
    return axios
      .get("/api/auth/users", {
        params: {
          page: vPage,
          page_size: vPage_size,
        },
      })
      .then((res) => {
        data = data.concat(res.data);
        this.setState((state) => ({
          ...state,
          data,
          status: "success",
        }));
        return true;
      })
      .catch((error) => {
        this.setState((state) => ({
          ...state,
          status: "error",
          error: error,
        }));
        return false;
      });
  };

  deleteUser = (value) => {
    return axios
      .delete(`/api/auth/user/${value}`)
      .then((res) => {
        if (res.status === 404) {
          message.error(res.message);
        } else {
          if (res.status === 204) {
            message.success("Account successfully deleted");
          } else {
            if (res.status === 401) {
              message.error("Unauthorized Action");
            } else {
              message.error("Service Unavailable");
            }
          }
        }
        return true;
      })
      .catch((error) => {
        this.setState((state) => ({
          ...state,
          status: "error",
          error: error,
        }));
        return false;
      });
  };

  deleteItemById = (id) => {
    this.deleteUser(id);
    const filteredData = this.state.data.filter((item) => item.id !== id);
    this.setState({ data: filteredData });
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });

    if (data.length < vPage * vPage_size) {
      message.warning("Infinite List loaded all");
      console.log("i am heree");
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    if (data.length === vPage * vPage_size) {
      vPage = vPage + 1;
      this.getUsers(vPage, 10);
      console.log("Calling page: " + vPage);
      return;
    }
  };

  handleCancel = (e) => {
    this.setState({
      DAVisible: false,
    });
  };

  showDeleteAccountModal = (e) => {
    this.setState({
      DAVisible: true,
      item: e,
    });
  };

  handleDelete = (id) => {
    this.setState({
      DAVisible: false,
    });
    this.deleteItemById(id)
  };

  render() {
    return (
      <Layout
        style={{
          display: "flex",
          backgroundColor: "white",
          width: "100%",
          marginTop: 20,
        }}
      >
        <div className="demo-infinite-container">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={this.state.data}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.username}</a>}
                    description={item.role}
                  />
                  <div>
                    <Button
                      style={{ marginRight: 20 }}
                      type="primary"
                      onClick={() =>
                        this.props.showModal(
                          "ea",
                          item.id,
                          item.username,
                          item.role
                        )
                      }
                      icon={<EditOutlined />}
                    >
                      Edit Account
                    </Button>
                    <Button
                      type="primary"
                      icon={<DeleteOutlined />}
                      onClick={() => this.showDeleteAccountModal(item.id)}
                    >
                      Delete Account
                    </Button>
                    
                  </div>
                </List.Item>
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
        </div>
        <Modal
          title="Delete Account"
          style={{
            position: "absolute",
            left: "25%",
            top: "37%",
            width: "100vh",
            display: "flex",
            alignItems: "center",
            marginLeft: 280,
          }}
          visible={this.state.DAVisible}
          maskClosable={false}
          onCancel={this.handleCancel}
          onOk={() => this.handleDelete(this.state.item)}
        >
          {this.state.DAVisible && (
            <DeleteAccountConfirmationComponent />
          )}
        </Modal>
      </Layout>
    );
  }
}
