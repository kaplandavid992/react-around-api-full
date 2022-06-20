import exitIcon from "../images/exit_icon.png";
import React from 'react';

function ImagePopup({ isOpen, onClose, card, text }) {
  const isOpenClass = isOpen ? "popup_active" : "";
  return (
    <div className={`popup ${isOpenClass}`} id="imagePopUp">
      <div className="popup__window popup__window_imagePopUp">
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
        <img src={card} className="popup__imagePopUp" alt={`view of ${text}`} />
        <p className="popup__imagePopUp-text">{text}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
