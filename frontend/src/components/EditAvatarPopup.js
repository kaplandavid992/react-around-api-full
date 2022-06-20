import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useContext, useRef, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef(currentUser.avatar);
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
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
          defaultValue=""
          ref={avatarRef}
          required
        />
        <p className="popup__form-errorMsg" id="inputImageLink-error" />
      </div>
    </PopupWithForm>
  );
}
