import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "./Contexts/AuthContext";

const AuthTransition = ({ token = undefined }) => {
  const { setToken } = useContext(AuthContext);
  const [auth, setAuth] = useState("pending");

  useEffect(() => {
    if (!token) {
      setAuth("failed");
    } else {
      setToken(token);
      setAuth("successful");
    }
  }, []);

  return (
    <div>
      {auth === "failed" && <Redirect to="login" />}
      {auth === "successful" && <Redirect to="riskzones" />}
    </div>
  );
};

export default AuthTransition;
