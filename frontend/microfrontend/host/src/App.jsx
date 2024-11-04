import React, {lazy} from "react";
import {Route, useHistory, Switch} from "react-router-dom";
import ReactDOM from "react-dom/client";
import {CurrentUserContext} from "./contexts/CurrentUserContext";
import {BrowserRouter} from "react-router-dom";
import Footer from "./components/Footer";
import PopupWithForm from "./components/PopupWithForm";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import {Suspense} from "react";

import api from "./utils/api";

import "./index.css";

const EditAvatarPopup = lazy(() => import('users/EditAvatarPopup').catch(() => {
        return {default: () => <div className='error'>Component is not available EditAvatarPopup!</div>};
    })
);

const EditProfilePopup = lazy(() => import('users/EditProfilePopup').catch(() => {
        return {default: () => <div className='error'>Component is not available EditProfilePopup!</div>};
    })
);

const Login = lazy(() => import('users/Login').catch(() => {
        return {default: () => <div className='error'>Component is not available Login!</div>};
    })
);

const Register = lazy(() => import('users/Register').catch(() => {
        return {default: () => <div className='error'>Component is not available Register!</div>};
    })
);

const AddPlacePopup = lazy(() => import('gallery/AddPlacePopup').catch(() => {
        return {default: () => <div className='error'>Component is not available AddPlacePopup!</div>};
    })
);

const App = () => {
    // const history = useHistory();

    // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
    const [currentUser, setCurrentUser] = React.useState({});
    //В компоненты добавлены новые стейт-переменные: email — в компонент App
    const [email, setEmail] = React.useState("");
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);
    const history = useHistory();
    const [tooltipStatus, setTooltipStatus] = React.useState("");
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        React.useState(false);

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
    }

    const handleJwtChange = event => { // Эта функция получает нотификации о событиях изменения jwt
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
    }

    const handleJwtChangeFailed = event => { // Эта функция получает нотификации о событиях изменения jwt
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
    }

    const handleJwtAdded = event => {
        setTooltipStatus("success");
        setIsInfoToolTipOpen(true);
        history.push("/signin");
    }

    const handleJwtAddedFailed = event => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
    }

    const handleUpdateUser = evetn => {
        setCurrentUser(evetn);
        closeAllPopups();
    }

    const handleUpdateAvatar = evetn => {
        setCurrentUser(evetn);
        closeAllPopups();
    }

    const handleAddPlace = evetn => {
        setCards([evetn, ...cards]);
        closeAllPopups();
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        // setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoToolTipOpen(false);
        // setSelectedCard(null);
    }

    function onSignOut() {
        // при вызове обработчика onSignOut происходит удаление jwt
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        // После успешного вызова обработчика onSignOut происходит редирект на /signin
        history.push("/signin");
    }

    React.useEffect(() => {
        addEventListener("jwt-change", handleJwtChange); // Этот код добавляет подписку на нотификации о событиях изменения localStorage
        return () => removeEventListener("jwt-change", handleJwtChange) // Этот код удаляет подписку на нотификации о событиях изменения localStorage, когда в ней пропадает необходимость
    }, []);
    React.useEffect(() => {
        addEventListener("jwt-change-failed", handleJwtChangeFailed); // Этот код добавляет подписку на нотификации о событиях изменения localStorage
        return () => removeEventListener("jwt-change", handleJwtChangeFailed) // Этот код удаляет подписку на нотификации о событиях изменения localStorage, когда в ней пропадает необходимость
    }, []);
//
    React.useEffect(() => {
        addEventListener("jwt-added", handleJwtAdded); // Этот код добавляет подписку на нотификации о событиях изменения localStorage
        return () => removeEventListener("jwt-added", handleJwtAdded) // Этот код удаляет подписку на нотификации о событиях изменения localStorage, когда в ней пропадает необходимость
    }, []);

    React.useEffect(() => {
        addEventListener("jwt-added", handleJwtAddedFailed); // Этот код добавляет подписку на нотификации о событиях изменения localStorage
        return () => removeEventListener("jwt-added", handleJwtAddedFailed) // Этот код удаляет подписку на нотификации о событиях изменения localStorage, когда в ней пропадает необходимость
    }, []);
    //
    React.useEffect(() => {
        addEventListener("user-updated", handleUpdateUser); // Этот код добавляет подписку на нотификации о событиях изменения localStorage
        return () => removeEventListener("user-updated", handleUpdateUser) // Этот код удаляет подписку на нотификации о событиях изменения localStorage, когда в ней пропадает необходимость
    }, []);
    //
    React.useEffect(() => {
        addEventListener("avatar-updated", handleUpdateAvatar); // Этот код добавляет подписку на нотификации о событиях изменения localStorage
        return () => removeEventListener("avatar-updated", handleUpdateAvatar) // Этот код удаляет подписку на нотификации о событиях изменения localStorage, когда в ней пропадает необходимость
    }, []);
    //
    React.useEffect(() => {
        addEventListener("place-added", handleAddPlace); // Этот код добавляет подписку на нотификации о событиях изменения localStorage
        return () => removeEventListener("place-added", handleAddPlace) // Этот код удаляет подписку на нотификации о событиях изменения localStorage, когда в ней пропадает необходимость
    }, []);
    //
    // // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
    // React.useEffect(() => {
    //     api
    //         .getAppInfo()
    //         .then(([cardData, userData]) => {
    //             setCurrentUser(userData);
    //             setCards(cardData);
    //         })
    //         .catch((err) => console.log(err));
    // }, []);

    // при монтировании App описан эффект, проверяющий наличие токена и его валидности
    React.useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            api
                .checkToken(token)
                .then((res) => {
                    setEmail(res.data.email);
                    setIsLoggedIn(true);
                    history.push("/");
                })
                .catch((err) => {
                    localStorage.removeItem("jwt");
                    console.log(err);
                });
        }
    }, [history]);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    return (
        // В компонент App внедрён контекст через CurrentUserContext.Provider
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
                <Header email={email} onSignOut={onSignOut}/>
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        //cards={cards}
                        onEditProfile={handleEditProfileClick}
                        // onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        // onCardClick={handleCardClick}
                        // onCardLike={handleCardLike}
                        // onCardDelete={handleCardDelete}
                        loggedIn={isLoggedIn}
                    />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Route path="/signup" component={Register}>
                            <Register/>
                        </Route>
                        <Route path="/signin" component={Login}>
                            <Login/>
                        </Route>
                    </Suspense>
                </Switch>
                <Footer/>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                />
                <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да"/>
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={tooltipStatus}
        />
            </div>
        </CurrentUserContext.Provider>
    );
}

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
)