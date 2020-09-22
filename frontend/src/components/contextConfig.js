import React, { Component } from "react";

const axios = require("axios");
const AuthContext = React.createContext();

const getUser = async () => {
  //Temporary login check

  let userInfo = { username: null, role: null, postStatus: null };
  const tmp = await axios
    .get("/api/auth/user")
    .then((response) => {
      if (response.status === 200) {
        console.log("======================================>");
        console.log(response);
        return response;
      }
    })
    .catch((error) => {});

  if (tmp != null) {
    userInfo.username = tmp.data.username;
    userInfo.role = tmp.data.role;
  }

  console.log(userInfo);
  return userInfo;
};

const AuthProvider = ({ children }) => {
  const [state, setState] = React.useState({
    status: "pending",
    error: "",
    user: "",
    role: "",
  });

  React.useEffect(() => {
    getUser().then((response) => {
      setState({
        user: response.username,
        role: response.role,
        status: "success",
      });
      console.log(state.user + "=============================== " + state.role);
    });
  }, []);

  const changeUser = (usrole, usr) => {
    setState({
      userRole: usrole,
      user: usr,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        state,
        changeUser,
      }}
    >
      {state.status === "pending" ? (
        "Loading..."
      ) : state.status === "error" ? (
        <div>
          Oh no
          <div>
            <pre>{state.error.message}</pre>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
