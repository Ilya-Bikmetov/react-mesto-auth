import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Footer from "./Footer.js";
import Header from "./Header.js";
import ImagePopup from "./ImagePopup.js";
import Main from "./Main.js";
import { api } from "../utils/Api.js"
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import * as auth from "../utils/Auth.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpenState] = useState(false);
  const [isImageCardPopupOpen, setImageCardPopupOpenState] = useState(false);
  const [isRegSuccess, setRegSuccess] = useState(false);
  const [isLoginIssue, setLoginIssue] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '' });
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(`cards/${card._id}/likes`, isLiked)
      .then((newCard) => setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c)))
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(`cards/${card._id}`)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleTrashClick = (card) => {
    setSelectedCard(card);
    setDeleteCardPopupOpenState(true);
  }


  const handleLoadingBtn = () => {
    isLoading
    ? setIsLoading(false)
    : setIsLoading(true)
  }
  const submitCardDelete = (card) => handleCardDelete(card);
  const handleEditProfileClick = () => setEditProfilePopupState(true);
  const handleAddPlaceClick = () => setAddPlacePopupState(true);
  const handleEditAvatarClick = () => setEditAvatarPopupState(true);
  const handleDeleteCardClick = () => setDeleteCardPopupOpenState(true);
  const handleImageCardClick = () => setImageCardPopupOpenState(true);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    handleImageCardClick();
  }

  const handleSignout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  const handleUpdateUser = ({ name, about }) => {
    api.addUser({ name, about }, 'users/me')
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleUpdateAvatar = (avatarLink) => {
    api.setAvatar('users/me/avatar', avatarLink)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    api.addCard({ name, link, url: 'cards' })
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleSignupSubmit = ({ email, password }) => {
    auth.signup({ email, password })
      .then((res) => {
        res && setRegSuccess(true);
      })
      .catch((err) => console.log(err));
  }

  const handleSigninSubmit = ({ email, password }) => {
    auth.signin({ email, password })
      .then(({ token }) => {
        localStorage.setItem('token', token);
        setLoggedIn(true);
        setUserInfo({ email });
        history.push('./')
      })
      .catch((err) => {
        console.log(err);
        setLoginIssue(true);
      });
  }

  const closeAllPopups = () => {
    isEditProfilePopupOpen && setEditProfilePopupState(false);
    isAddPlacePopupOpen && setAddPlacePopupState(false);
    isEditAvatarPopupOpen && setEditAvatarPopupState(false);
    isDeleteCardPopupOpen && setDeleteCardPopupOpenState(false);
    isImageCardPopupOpen && setImageCardPopupOpenState(false);
    isRegSuccess && setRegSuccess(false);
    isLoginIssue && setLoginIssue(false);
  }

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleMouseClickClose(evt) {
    if (evt.target.classList.contains('popup'))
      closeAllPopups();
  }

  useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isDeleteCardPopupOpen || isImageCardPopupOpen || isRegSuccess || isLoginIssue) {
      document.addEventListener('mousedown', handleMouseClickClose);
      document.addEventListener('keydown', handleEscClose);

      return () => {
        document.removeEventListener('keydown', handleEscClose)
        document.removeEventListener('mousedown', handleMouseClickClose);
      };
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isDeleteCardPopupOpen, isImageCardPopupOpen, isRegSuccess, isLoginIssue]);

  useEffect(() => {
    api.getUser('users/me')
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));

  }, []);

  useEffect(() => {
    api.getInitialCards('cards')
      .then((items) => {
        setCards(items);
      })
      .catch((err) => console.log(err));

  }, []);

  useEffect(() => {
    if (localStorage.getItem('token'))
      auth.getContent(localStorage.getItem('token'))
        .then(({ data: { email } }) => {
          if (email) {
            setLoggedIn(true);
            setUserInfo({ email });
          }
        })
        .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if(loggedIn) history.push('./');
  }, [loggedIn]);

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            loggedIn={loggedIn}
            userInfo={userInfo}
            onSignout={handleSignout}
          />
          <Switch>
            <ProtectedRoute
              exact path="/"
              component={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onDeleteCard={handleDeleteCardClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleTrashClick}
              cards={cards}
            >
              <Footer />
            </ProtectedRoute>
            <Route path="/sign-in">
              <Login
                isOpen={isLoginIssue}
                onClose={closeAllPopups}
                onSubmit={handleSigninSubmit}
              />
            </Route>
            <Route path="/sign-up">
              <Register
                isOpen={isRegSuccess}
                onClose={closeAllPopups}
                onSubmit={handleSignupSubmit}
              />
            </Route>
            <Route path="*">
              <Redirect to={"./sign-in"} />
            </Route>
          </Switch>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImageCardPopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          handleLoadingBtn={handleLoadingBtn}
          buttonSubmitName={isLoading ? 'Cохранение...' : 'Создать'}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />
        <DeleteCardPopup
          card={selectedCard}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={submitCardDelete}
        />
      </div>
    </div>

  );

}

export default App;
