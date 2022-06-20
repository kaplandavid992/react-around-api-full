import Footer from "./Footer.js";
import Card from "./Card.js";
import editImagePen from "../images/editImagePen.png";
import React from "react";
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
  const name = currentUser.name;
  const about = currentUser.about;
  const avatar = currentUser.avatar;

  return (
    <>
      <section className="profile">
        <div className="profile__imageContainer">
          <img
            className="profile__image"
            src={avatar}
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
            <h1 className="profile__name">{name}</h1>
            <button
              onClick={onEditProfileClick}
              className="button profile__edit-btn"
              type="button"
              aria-label=""
            />
          </div>
          <p className="profile__role">{about}</p>
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
              onAddPlace={onAddPlace}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
              onCardClick={onCardClick}
              key={card._id}
              cardId={card._id}
              text={card.name}
              likesCount={card.likes.length}
              card={card.link}
              owner={card.owner._id}
              likesData={card.likes}
            />
          ))}
        </ul>
      </section>
      <Footer />
    </>
  );
}

export default Main;
