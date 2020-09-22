import React, { Component } from "react";
import NavigationLayout from "./NavigationLayout/NavigationLayout";
import SignInComponent from "./SignIn/SignInComponent";
import AuthContext from "./contextConfig";

const useAuthState = () => {
  const state = React.useContext(AuthContext);
  const role = state.role;
  const isPending = state.status === "pending";
  const isError = state.status === "error";
  const isSuccess = state.status === "success";
  const isAuthenticated = state.user && isSuccess;
  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated,
    role,
  };
};

const SwitchLayout = (props) => {
  const user1 = props.user;
  return user1 ? (
    <NavigationLayout userRole={props.userRole} />
  ) : (
    <SignInComponent changeUser={props.method} />
  );
};

const AppLayout = () => {
  return (
    <AuthContext.Consumer>
      {(context) => (
        <SwitchLayout
          method={context.changeUser}
          userRole={context.state.role}
          user={context.state.user}
        />
      )}
    </AuthContext.Consumer>
  );
};

export default AppLayout;
