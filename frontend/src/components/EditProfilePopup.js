import { useState, useContext, useEffect } from "react";
import React from 'react';
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function onNameChange(e) {
    setName(e.target.value);
  }

  function onaboutChange(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Edit profile"
      name="edit__form"
      buttonText="Save"
    >
      <div className="popup__form-control">
        <input
          id="inputName"
          type="text"
          className="popup__form-input"
          placeholder="Name"
          name="form__name"
          defaultValue={name}
          required
          maxLength="40"
          minLength="2"
          onChange={onNameChange}
        />
        <p className="popup__form-errorMsg" id="inputName-error" />
      </div>
      <div className="popup__form-control">
        <input
          id="inputRole"
          type="text"
          className="popup__form-input"
          placeholder="About me"
          name="form__role"
          defaultValue={about}
          required
          maxLength="200"
          minLength="2"
          onChange={onaboutChange}
        />
        <p className="popup__form-errorMsg" id="inputRole-error" />
      </div>
    </PopupWithForm>
  );
}
