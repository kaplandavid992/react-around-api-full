import Footer from "./Footer.js";
import Card from "./Card.js";
import editImagePen from "../images/editImagePen.png";
import React, { useEffect } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onAddPlace,
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {

  const currentUser = useContext(CurrentUserContext);
  
 return (
    <>
      <section className="profile">
        <div className="profile__imageContainer">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="face of person matching profile"
          />

          <img
            className="profile__editImage"
            src={editImagePen}
            alt="edit pen icon"
            onClick={onEditAvatarClick}
          />
        </div>

        <div className="profile__text-container">
          <div className="profile__name-edit-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfileClick}
              className="button profile__edit-btn"
              type="button"
              aria-label=""
            />
          </div>
          <p className="profile__role">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlaceClick}
          className="button profile__add-btn"
          type="button"
          aria-label=""
        />
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              onAddPlace={onAddPlace}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
              onCardClick={onCardClick}
              cardId={card._id}
              text={card.name}
              card={card.link}
              owner={card.owner}
              likes={card.likes}
            />
          ))}
        </ul>
      </section>
      <Footer />
    </>
  );
}

export default Main;
