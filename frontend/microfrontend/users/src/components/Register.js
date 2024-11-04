import React from 'react';
import {Link, Route} from 'react-router-dom';
import api from "../utils/api";
import {useHistory} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import Login from "./Login";
import { Suspense } from "react";

function Register() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        const userData = {
            email,
            password
        }
        onRegister(userData);
    }

    function onRegister({email, password}) {
        api.register(email, password)
            .then((res) =>
                dispatchEvent(new CustomEvent("jwt-added", {
                    detail: res
                }))
            )
            .catch((err) =>
                dispatchEvent(new CustomEvent("jwt-added-failed", {
                    detail: err
                }))
            );
    };

    return (
        <div className="auth-form">
            <form className="auth-form__form" onSubmit={handleSubmit}>
                <div className="auth-form__wrapper">
                    <h3 className="auth-form__title">Регистрация</h3>
                    <label className="auth-form__input">
                        <input type="text" name="email" id="email"
                               className="auth-form__textfield" placeholder="Email"
                               onChange={e => setEmail(e.target.value)} required/>
                    </label>
                    <label className="auth-form__input">
                        <input type="password" name="password" id="password"
                               className="auth-form__textfield" placeholder="Пароль"
                               onChange={e => setPassword(e.target.value)} required/>
                    </label>
                </div>
                <div className="auth-form__wrapper">
                    <button className="auth-form__button" type="submit">Зарегистрироваться</button>
                    <p className="auth-form__text">Уже зарегистрированы?
                        <BrowserRouter history={history}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Route  component={Login} >
                                <Link className="auth-form__link" to="/signin" >Войти</Link>
                                </Route>
                            </Suspense>
                        </BrowserRouter>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register;
