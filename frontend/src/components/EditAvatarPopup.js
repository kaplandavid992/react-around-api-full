import React from 'react';
import PopupWithForm from "./PopupWithForm.js";
import { useEffect, useState } from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [link, setLink] = useState("");
 
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: link,
    });
    setLink("");
  }

  function onLinkChange(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    if (isOpen) {
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Change profile picture"
      name="editProfileImage__form"
      isOpen={isOpen}
      buttonText="Save"
    >
      <div className="popup__form-control">
        <input
          id="inputImageLink"
          type="url"
          className="popup__form-input"
          placeholder="Insert new image link"
          name="form__imageLink"
          value={""||link}
          onChange={onLinkChange}
          required
        />
        <p className="popup__form-errorMsg" id="inputImageLink-error" />
      </div>
    </PopupWithForm>
  );
};
