import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Login from "./Login.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import InfoTooltip from "./InfoTooltip.js";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/api.js";
import loader from "../images/loader.gif";
import Register from "./Register.js";
import * as auth from "../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [msgData, setMsgData] = useState({ text: "", imgSrc: "" });
  const history = useHistory();

  const handleLogin = (userEmail) => {
    setLoggedIn(true);
    setUserEmail(userEmail);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("token");
    history.push("/signin");
    return true;
  };

  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "Loading Name...",
    about: "Loading Role...",
    avatar: loader,
  });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isPopupMsgOpen, setIsPopupMsgOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsPopupMsgOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(cardId, likesData) {
    const isLiked = likesData.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(cardId, !isLiked).then((newCard) => {
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === cardId ? newCard : currentCard
        )
      );
    });
  }

  function handleCardDelete(cardId) {
    api.confirmDelete(cardId).then(() => {
      setCards(cards.filter((item) => item._id !== cardId));
    });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(cardLink, cardText) {
    setIsImagePopupOpen(true);
    setSelectedCard({ ...selectedCard, link: cardLink, text: cardText });
  }

  function handleAddPlace(inputFields) {
    api
      .postNewCard(inputFields)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleUpdateUser(inputFields) {
    api
      .editUserInfo(inputFields)
      .then((resUser) => {
        setCurrentUser(resUser);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleUpdateAvatar(imageLink) {
    api
      .editAvatarImage(imageLink)
      .then((resUser) => {
        setCurrentUser(resUser);
        closeAllPopups();
      })
      .catch(console.log);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            const userEmail = res.data.email;
            setLoggedIn(true);
            setUserEmail(userEmail);
            setToken(token);
          }
        })
        .catch(console.log);
    }
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token &&
    api
      .getUserInfo()
      .then((resUser) => {
        setCurrentUser(resUser);
      })
      .catch(console.log);
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token &&
    api
      .getInitialCards()
      .then((resCards) => {
        setCards(Array.from(resCards));
      })
      .catch(console.log);
  }, [token]);

  useEffect(() => {
    const exitEsc = (e) => {
      const keyEsc = e.key === "Escape";
      if (keyEsc) {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", exitEsc);
    return () => document.removeEventListener("keydown", exitEsc);
  }, []);

  useEffect(() => {
    const exitClickOutSideModal = (e) => {
      if (e.target.classList.contains("popup_active")) {
        closeAllPopups();
      }
    };
    document.addEventListener("click", exitClickOutSideModal);
    return () => document.removeEventListener("click", exitClickOutSideModal);
  }, []);

  

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlace}
        />
        <PopupWithForm
          onClose={closeAllPopups}
          title="Are you sure?"
          name="confirmDelete__form"
          buttonText="Yes"
        />
        <ImagePopup
          card={selectedCard.link}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          text={selectedCard.text}
        />
        <InfoTooltip
          isOpen={isPopupMsgOpen}
          onClose={closeAllPopups}
          msgData={msgData}
        />
        <Header loggedIn={loggedIn} email={userEmail} logOut={handleLogout} />

        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>
          <Route exact path="/signup">
            <Register
              setIsPopupMsgOpen={setIsPopupMsgOpen}
              setMsgData={setMsgData}
            />
          </Route>
          <Route exact path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
