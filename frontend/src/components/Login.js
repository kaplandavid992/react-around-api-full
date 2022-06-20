import { useState } from "react";
import FormLogSignIn from "./FormLogSignIn";
import { useHistory } from "react-router-dom";
import * as auth from "../utils/auth";
import React from 'react';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const history = useHistory();

  const handleSubmit = () => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(password, email)
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
          handleLogin(email);
          history.push("/");
          resetForm();
          return data;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <FormLogSignIn
        title="Login"
        name="Login"
        buttonText="Login"
        onSubmit={handleSubmit}
        bottomLinkText="Not a member yet? Sign up here!"
        bottomLinkPath="/signup"
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
      />
    </div>
  );
};

export default Login;
