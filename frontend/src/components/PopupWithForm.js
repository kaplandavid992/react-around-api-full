import exitIcon from "../images/exit_icon.png";
import React from 'react';

function PopupWithForm({
  isOpen,
  name,
  onClose,
  title,
  children,
  buttonText,
  onSubmit,
}) {
  const isOpenClass = isOpen ? "popup_active" : "";
  return (
    <div className={`popup ${isOpenClass}`} id={name}>
      <div className="popup__window">
        <button
          className="popup__exit-btn"
          type="reset"
          aria-label=""
          onClick={onClose}
        >
          <img
            className="popup__exit-icon"
            src={exitIcon}
            alt="exit icon button"
          />
        </button>
        <form
          className="popup__form"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          <h2 className="popup__form-header">{title}</h2>
          {children}
          <button
            className="popup__form-submit-btn"
            type="submit"
            aria-label=""
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
