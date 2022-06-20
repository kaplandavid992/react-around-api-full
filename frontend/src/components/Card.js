import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useContext } from "react";
import React from 'react';

function Card({
  card,
  likesCount,
  onCardClick,
  onCardLike,
  onCardDelete,
  text,
  owner,
  likesData,
  cardId,
}) {
  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card, text);
  }

  function handleLikeClick() {
    onCardLike(cardId, likesData);
  }

  function handleDeleteClick() {
    onCardDelete(cardId);
  }

  const isOwn = owner === currentUser._id;
  const cardDeleteButtonClassName = `button elements__delete-icon ${
    isOwn ? "elements__delete-icon_visible" : "elements__delete-icon_hidden"
  }`;

  const isLiked = likesData.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = `button elements__like-btn ${
    isLiked ? "elements__svg-heart_liked" : ""
  }`;

  return (
    <li className="elements__element">
      <img
        src={card}
        alt=" "
        className="elements__image"
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="elements__rectangle">
        <h2 className="elements__text">{text}</h2>
        <div className="elements__likesContainer">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
            aria-label=""
          />
          <p className="elements__likesNumber">{likesCount}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
