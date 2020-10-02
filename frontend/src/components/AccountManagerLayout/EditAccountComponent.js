import React, { Component } from "react";
import { Layout, List, Spin, Avatar, Button, message } from "antd";

import axios from "axios";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import InfiniteScroll from "react-infinite-scroller";
import "../Css/EditAC.css";

export default class EditAccountComponent extends Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    error: "",
    status: "",
  };

  componentDidMount() {
    this.getUsers(1, 10);
    console.log(this.state.data);
  }

  getUsers = async (vPage, vPage_size) => {
    return axios
      .get("/api/auth/users", {
        params: {
          page: vPage,
          page_size: vPage_size,
        },
      })
      .then((res) => {
        this.setState((state) => ({
          ...state,
          data: res.data,
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
            message.success("Account succesfully deleted");
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
    if (data.length > 20) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    // this.fetchData((res) => {
    //   data = data.concat(res.data.results);
    //   this.setState({
    //     data,
    //     loading: false,
    //   });
    // });
    this.getUsers(1, 10);
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
                      onClick={() => {
                        this.deleteItemById(item.id);
                      }}
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
      </Layout>
    );
  }
}
