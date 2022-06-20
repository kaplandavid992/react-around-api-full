import React from "react";
import useForm from "../utils/useForm";
import validate from "../utils/loginFormValidationRules";

const FormLogSignIn = ({
  title,
  name,
  buttonText,
  onSubmit,
  bottomLinkText,
  bottomLinkPath,
  onEmailChange,
  onPasswordChange,
}) => {
  const afterSubmitValidation = onSubmit;

  const { values, errors, handleChange, handleSubmit } = useForm(
    afterSubmitValidation,
    validate
  );
  const changesEmail = (e) => {
    onEmailChange(e);
    handleChange(e);
  };
  const changesPassword = (e) => {
    onPasswordChange(e);
    handleChange(e);
  };

  return (
    <div className="formLogSignIn">
      <form name={name} noValidate onSubmit={handleSubmit}>
        <h2 className="formLogSignIn__header">{title}</h2>
        <div className="formLogSignIn__form-control">
          <input
            value={values.email || ""}
            id="email"
            type="email"
            className={`formLogSignIn__form-input ${
              errors.email && "formLogSignIn_error"
            }`}
            placeholder="Email"
            name="email"
            required
            maxLength="254"
            minLength="3"
            onChange={changesEmail}
          />
          {errors.email && <p className="formLogSignIn__err">{errors.email}</p>}
        </div>
        <div className="formLogSignIn__form-control">
          <input
            value={values.password || ""}
            id="password"
            type="password"
            className={`formLogSignIn__form-input ${
              errors.password && "formLogSignIn_error"
            }`}
            placeholder="Password"
            name="password"
            required
            maxLength="200"
            minLength="2"
            onChange={changesPassword}
          />
          {errors.password && (
            <p className="formLogSignIn__err" id="inputPassword-error">
              {errors.password}
            </p>
          )}
        </div>
        <button
          className="formLogSignIn__submitBtn"
          type="submit"
          aria-label=""
        >
          {buttonText}
        </button>
        <a href={bottomLinkPath} className="formLogSignIn__bottomLink">
          {bottomLinkText}
        </a>
      </form>
    </div>
  );
};

export default FormLogSignIn;
