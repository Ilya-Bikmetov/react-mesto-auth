import InfoTooltip from "./InfoTooltip.js";
import {useState} from 'react';

function Register({onClose, isOpen}) {


  return (
    <>
      <form className="profile-form">
        <h1 className="profile-form__title">Регистрация</h1>
        <input
          className="profile-form__input"
          name="email"
          placeholder="Email"
          type="email"
          required
        />
        <input
          className="profile-form__input"
          name="password"
          placeholder="Пароль"
          type="password"
          required
        />
        <button className="profile-form__btn" type="submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
        <a href="#" className="profile-form__submit-subtitle">Уже зарегистрированы? Войти</a>
      </form>
      <InfoTooltip onClose={onClose} isOpen={isOpen} title ={'Вы успешно зарегистрировались!'}/>
    </>
  );
}

export default Register;