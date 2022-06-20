import exitIcon from "../images/exit_icon.png";
import React from 'react';

const InfoTooltip = ({ isOpen, onClose, msgData }) => {
  const isOpenClass = isOpen ? "popup_active" : "";
  const imgSrc = msgData.imgSrc;
  const text = msgData.text;
  return (
    <div className={`popup ${isOpenClass}`}>
      <div className="popup__window popup__window_msgPopup">
        <button
          className="popup__exit-btn popup__exit-btn_mobileMsg"
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
        <img className="popup__msgPopup-img" src={imgSrc} alt={text}/>
        <p className="popup__msgPopup-text">{text}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;
