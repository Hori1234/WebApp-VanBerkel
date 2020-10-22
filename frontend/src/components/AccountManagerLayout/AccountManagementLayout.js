import React, { Component } from "react";
import {
  Divider,
  Button,
  Layout,
  Typography,
  Modal,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import axios from "axios";

import CreateAccountsComponent from "./CreateAccountsComponent";
import EditAccountComponent from "./EditAccountComponent";
import EditAccountModalComponent from "./EditAccountModalComponent";

const { Text } = Typography;

/**
 * Export the class.
 */
export default class AccountManagementLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CAVisible: false,
      EAVisible: false,
      data: [],
      Metadata: {
        id: "",
        username: "",
        role: "",
      },
    };
  }

  componentDidMount = () => {
    this.getUsers();
  };

  /**
   * Set the values of all the users.
   * @param {Current value} value 
   */
  setUsers = (value) => {
    this.setState({
      users: value,
    });
  };

   /**
    * Sending a request to the database
    * to retrive the list of all users.
    * @param {Current page} vPage 
    * @param {Current account list size} vPage_size 
    */
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

   /**
    * case ca: Display the account creation modal(page).
    * case ea: Display the edit account modal(page).
    * @param {ea or ca (create account or eddit account)} value 
    * @param {Id of a user} vId 
    * @param {New username of a user} vUsername 
    * @param {New role of a user} vRole 
    */
  showModal = (value, vId, vUsername, vRole) => {
    console.log(this.state.Metadata);
    switch (value) {
      case "ca":
        this.setState({
          CAVisible: true,
        });
        console.log("ca modal shown");

        break;
      case "ea":
        this.setState({
          EAVisible: true,
        });
        this.setState((prevState) => {
          let Metadata = Object.assign({}, prevState.Metadata); // creating copy of state variable Metadata
          Metadata.id = vId; // update the name property, assign a new value
          Metadata.username = vUsername;
          Metadata.role = vRole;
          return { Metadata }; // return new object Metadata object
        });
        console.log("ea modal shown");
        break;
      default:
      // no default
    }
    console.log(this.state.Metadata);
  };
  
   /**
    * Hide modals after Submit or Cancel button have been pressed.
    * @param {Returned value of the triggered event} e 
    */
  handleOk = (e) => {
    this.setState({
      EAVisible: false,
      CAVisible: false,
    });
  };

  /**
   * Rendering of the account management page.
   */
  render() {
    return (
      <Layout
        style={{ backgroundColor: "white", display: "flex", width: "100%" }}
      >
        <Layout>
          <Layout
            style={{
              alignItems: "flex-start",
              flexDirection: "row",
              backgroundColor: "white",
              display: "flex",
              width: "100%",
            }}
          >
            <UserAddOutlined style={{ fontSize: 90 }} />
            <Layout
              style={{ flexDirection: "column", backgroundColor: "white" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: "18" }}>
                Create Accounts
              </Text>
              <Text style={{ fontSize: " 14" }}>
                This page is used create accounts
              </Text>
            </Layout>
            <Layout
              style={{ alignItems: "flex-end", backgroundColor: "white" }}
            >
              <Button
                style={{ marginRight: 20, width: 150 }}
                type="primary"
                onClick={() => this.showModal("ca")}
              >
                Create Account
              </Button>
            </Layout>
          </Layout>
        </Layout>
        <Divider />
        <Layout
          style={{
            backgroundColor: "white",
            display: "flex",
            width: "100%",
          }}
        >
          <EditAccountComponent showModal={this.showModal} />
        </Layout>

        <Modal
          title="Create Account"
          style={{
            display: "flex",
            marginLeft: "33%",
          }}
          centered={false}
          maskClosable={false}
          visible={this.state.CAVisible}
          onCancel={this.handleOk}
        >
          {this.state.CAVisible && (
            <CreateAccountsComponent modalHandleOk={this.handleOk} />
          )}
        </Modal>
        <Modal
          title="Edit Account"
          style={{
            position: "absolute",
            top: "25%",
            bottom: "25%",
            left: "15%",
            right: "25%",
            display: "flex",
            alignItems: "center",
            marginLeft: 280,
          }}
          visible={this.state.EAVisible}
          maskClosable={false}
          onCancel={this.handleOk}
        >
          {this.state.EAVisible && (
            <EditAccountModalComponent
              info={this.state.Metadata}
              modalHandleOk={this.handleOk}
            />
          )}
        </Modal>
        
      </Layout>
    );
  }
}

