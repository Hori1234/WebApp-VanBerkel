import './App.css';
import React, { Component } from 'react'

import NavigationLayout from "./components/NavigationLayout/NavigationLayout"
import SignInComponent from "./components/SignIn/SignInComponent"



export default class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = { 
      isEmptyState: true, 
      isMenuItemClickedState : 'login',  
      userRole: "Tmp"
    }
  };

  triggerAddTripState = (value) => {
      this.setState({
        ...this.state,
        isEmptyState: false,
        isMenuItemClickedState: value,
      })
  };
  
  changeUserState = (usrole) => {
    this.setState({
      userRole: usrole
    });
  };

  render() {
    
    
    return (
      <div>
        {this.state.isMenuItemClickedState == "login" && <SignInComponent 
          {...this.state}
          changeUser={this.changeUserState.bind(this)} 
          changeState={() => this.triggerAddTripState("navi")}/> }
        {console.log(this.state.userRole)}
        {this.state.isMenuItemClickedState == "navi" && <NavigationLayout {...this.state} /> }
      </div>
    )
  }
}
