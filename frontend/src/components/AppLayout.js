import React from "react";
import NavigationLayout from "./NavigationLayout/NavigationLayout";
import SignInComponent from "./SignIn/SignInComponent";
import { useAuth } from './contextConfig'

const AppLayout = () => {
  const auth = useAuth();
  return auth.state.user ? (
    <NavigationLayout/>
  ) : (
    <SignInComponent/>
  );
};

export default AppLayout;