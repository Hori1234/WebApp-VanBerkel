import React, { Component } from 'react'
import { Menu, Dropdown, Button } from 'antd';
import 'antd/dist/antd.css';




export default class TestComponent extends Component {

    constructor(props) {
        super(props)
    };

    render() {

        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.props.UserVO}>
                        View Only
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.props.UserAdmin}>
                        Administrator
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.props.UserPlanner}>
                        Planner
                    </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div id="user-types">
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                    <Button>User Types</Button>
                </Dropdown>
            </div>
        )
    }
}

