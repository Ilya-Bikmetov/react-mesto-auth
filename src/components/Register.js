import {Link} from "react-router-dom";
import InfoTooltip from "./InfoTooltip.js";
import successImagePath from "../images/reg_success.svg";


function Register({ onClose, isOpen }) {


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
        <Link to={"./sign-in"} className="profile-form__submit-subtitle">Уже зарегистрированы? Войти</Link>
      </form>
      <InfoTooltip
        onClose={onClose}
        isOpen={isOpen}
        title={'Вы успешно зарегистрировались!'}
        urlImg={`${successImagePath}`}
      />
    </>
  );
}

export default Register;
