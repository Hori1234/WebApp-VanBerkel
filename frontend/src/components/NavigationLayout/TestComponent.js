import React, { Component } from "react";
import { Menu, Dropdown, Button } from "antd";
import "antd/dist/antd.css";

export default class TestComponent extends Component {

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <p onClick={this.props.UserVO}>View Only</p>
        </Menu.Item>
        <Menu.Item>
          <p onClick={this.props.UserAdmin}>Administrator</p>
        </Menu.Item>
        <Menu.Item>
          <p onClick={this.props.UserPlanner}>Planner</p>
        </Menu.Item>
      </Menu>
    );
    return (
      <div id="user-types">
        <Dropdown overlay={menu} placement="bottomLeft" arrow>
          <Button>User Types</Button>
        </Dropdown>
      </div>
    );
  }
}
