import React from "react";
import axios from "axios";

export const AuthContext = React.createContext({
  status: "pending",
  error: null,
  user: null,
  getUsersStatus: "pending",
});

const AuthProvider = (props) => {
  const [state, setState] = React.useState({
    status: "pending",
    error: null,
    user: null,
    getUsersStatus: "pending",
  });

  React.useEffect((state) => {
    // check if user is already logged in
    axios
      .get("/api/auth/user")
      .then((res) => {
        setState((state) => ({
          ...state,
          user: res.data,
          status: "success",
        }));
      })
      .catch((error) => {
        setState((state) => ({
          ...state,
          status: "error",
          error: error,
        }));
      });
  }, []);

  const login = async (credentials) => {
    return axios
      .post("/api/auth/login", credentials)
      .then((res) => {
        setState((state) => ({
          ...state,
          user: res.data,
          status: "success",
        }));
        return true;
      })
      .catch((error) => {
        setState((state) => ({
          ...state,
          status: "error",
          error: error,
        }));
        return false;
      });
  };

  const logout = async () => {
    return axios
      .post("/api/auth/logout")
      .then(() => {
        setState((state) => ({
          ...state,
          user: null,
          status: "logged-out",
        }));
        return true;
      })
      .catch((error) => {
        setState((state) => ({
          ...state,
          status: "error",
          error: error,
        }));
        return false;
      });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
      {...props}
    />
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
