import React from "react";
import  NavigationLayoutFather from "./NavigationLayout/NavigationLayoutFather"
import NavigationLayout from "./NavigationLayout/NavigationLayout";
import SignInComponent from "./SignIn/SignInComponent";
import { useAuth } from './contextConfig'

const AppLayout = () => {
  const auth = useAuth();
  return auth.state.user ? (
    <NavigationLayoutFather/>
  ) : (
    <SignInComponent/>
  );
};

export default AppLayout;