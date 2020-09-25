import React, { Component } from "react";
import {
  Layout,
  List,
  Popover,
  Spin,
  Avatar,
  Button,
  message,
} from "antd";

import axios from 'axios';

import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import InfiniteScroll from "react-infinite-scroller";
import "../Css/EditAC.css";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

export default class EditAccountComponent extends Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    visible: false,
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };

  componentDidMount() {
    this.fetchData((res) => {
      console.log(res);
      this.setState({
        data: res.data.results,
      });
    });
  }

  fetchData = (callback) => {
    axios(fakeDataUrl).then(callback);
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
    this.fetchData((res) => {
      data = data.concat(res.data.results);
      this.setState({
        data,
        loading: false,
      });
    });
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
                    title={<a href="https://ant.design">{item.name.last}</a>}
                    description={item.email}
                  />
                  <div>
                    <Button
                      style={{ marginRight: 20 }}
                      type="primary"
                      onClick={() => this.props.showModal("ea")}
                      icon={<EditOutlined />}
                    >
                      Edit Account
                    </Button>
                    <Popover
                      content={
                        <p
                          onClick={() => {
                            this.setState({
                              visible: false,
                            });
                          }}
                        >
                          Close
                        </p>
                      }
                      title="Title"
                      trigger="click"
                      visible={this.state.visible}
                      onVisibleChange={this.handleVisibleChange}
                    >
                      <Button type="primary" icon={<DeleteOutlined />}>
                        Delete Account
                      </Button>
                    </Popover>
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
