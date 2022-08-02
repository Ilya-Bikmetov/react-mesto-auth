import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import InfoTooltip from "./InfoTooltip.js";
import successImagePath from "../images/reg_success.svg";


function Register({ onClose, isOpen, onSubmit }) {
  const [inputData, setInputData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value
    });

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email: inputData.email, password: inputData.password });
  }

  useEffect(() => {
   isOpen && setInputData({ email: '', password: '' });
  }, [isOpen])

  return (
    <>
      <form onSubmit={handleSubmit} className="profile-form">
        <h1 className="profile-form__title">Регистрация</h1>
        <input
          className="profile-form__input"
          name="email"
          placeholder="Email"
          type="email"
          required
          onChange={handleInputChange}
          value={inputData.email}
        />
        <input
          className="profile-form__input"
          name="password"
          placeholder="Пароль"
          type="password"
          required
          onChange={handleInputChange}
          value={inputData.password}
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
