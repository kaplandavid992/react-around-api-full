import React from "react";
import { useHistory } from "react-router-dom";
import * as auth from "../utils/auth";
import FormLogSignIn from "./FormLogSignIn";
import { useState } from "react";
import errX from "../images/errX.png";
import okMsg from "../images/okMsg.png";

const Register = ({ setIsPopupMsgOpen, setMsgData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSuccess = () => {
    history.push("/signin");
    setMsgData({
      text: "Success! You have now been registered.",
      imgSrc: okMsg,
    });
  };

  const handleError = () => {
    setMsgData({
      text: "Oops, something went wrong! Please try again.",
      imgSrc: errX,
    });
  };

  const handleSubmit = () => {
    auth
      .register(password, email)
      .then(handleSuccess)
      .catch((err) => {
        handleError();
        console.log(err);
      })
      .finally(() => {
        setIsPopupMsgOpen(true);
      });
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <FormLogSignIn
      title="Sign up"
      name="Sign up"
      buttonText="Sign up"
      bottomLink="Already a member yet? Log in here!"
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      onSubmit={handleSubmit}
    />
  );
};

export default Register;
