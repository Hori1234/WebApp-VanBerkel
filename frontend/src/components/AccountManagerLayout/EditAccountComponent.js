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

  /**
   * Number of accounts displayed in the first page.
   */
  componentDidMount() {
    this.getUsers(1, 10);
  }

   /**
    * Get users from the database.
    * @param {Current page} vPage 
    * @param {Current account list size} vPage_size 
    */
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

   /**
    * Handles succsessful and unsuccessful account deletions.
    * @param {Path to user to be deleted} value 
    */
  deleteUser = (value) => {
    return axios
      .delete(`/api/auth/user/${value}`)
      .then((res) => {
        if (res.status === 204) {
          message.success("Account successfully deleted");
        }
        return true;
      })
      .catch((error) => {
        this.setState((state) => ({
          ...state,
          status: "error",
          error: error,
        }));
        if (error.response.status === 404) {
          message.error(error.response.data.message);
        } else {
          if (error.response.status === 401) {
            message.error("Unauthorized Action");
          } else {
            message.error("Service Unavailable");
          }
        }
        return false;
      });
  };

   /**
    * Delete item by id in the databse.
    * @param {Id of the user to be deleted} id 
    */
  deleteItemById = (id) => {
    this.deleteUser(id);
    const filteredData = this.state.data.filter((item) => item.id !== id);
    this.setState({ data: filteredData });
  };

  /**
   * Gets list of users on multiple pages from the database.
   */
  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });

    if (data.length < vPage * vPage_size) {
      message.warning("Infinite List loaded all");
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

   /**
    * Handles Cancel button on account deletion confirmation pop up.
    * @param {Returned value of the triggered event} e 
    */
  handleCancel = (e) => {
    this.setState({
      DAVisible: false,
    });
  };

   /**
    * Displays the confirmation pop up for account deletion.
    * @param {Returned value of the triggered event} e 
    */
  showDeleteAccountModal = (e) => {
    this.setState({
      DAVisible: true,
      item: e,
    });
  };

   /**
    * Item is sent to be deleted by id in the database.
    * @param {Id of the user to be deleted} id 
    */
  handleDelete = (id) => {
    this.setState({
      DAVisible: false,
    });
    this.deleteItemById(id);
  };

  /**
   * Renders the Edit account and Delete account buttons. 
   * As well as the confirmation pop ups.
   */
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
                    title={<a>{item.username}</a>}
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
          {this.state.DAVisible && <DeleteAccountConfirmationComponent />}
        </Modal>
      </Layout>
    );
  }
}
