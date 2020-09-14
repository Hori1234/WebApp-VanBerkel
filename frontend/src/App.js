import './App.css';
import React, { Component } from 'react'

import NavigationLayout from "./components/NavigationLayout/NavigationLayout"
import SignInComponent from "./components/SignIn/SignInComponent"

export default class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = { isEmptyState: true, isMenuItemClickedState : 'login' }
  };

  triggerAddTripState = (value) => {
      this.setState({
        ...this.state,
        isEmptyState: false,
        isMenuItemClickedState: value,
      })
  };
  
  render() {
    return (
      <div>
        {this.state.isMenuItemClickedState == "login" && <SignInComponent changeState={() => this.triggerAddTripState("navi")}/> }
        {this.state.isMenuItemClickedState == "navi" && <NavigationLayout/> }
      </div>
    )
  }
}
