import InfoTooltip from './InfoTooltip.js';
import failLoginPath from '../images/login_issue.svg';

function Login({ isOpen, onClose }) {

  return (
    <>
      <form className="profile-form">
        <h1 className="profile-form__title">Вход</h1>
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
        <button className="profile-form__btn" type="submit" aria-label="Войти">Войти</button>
      </form>
      <InfoTooltip
        onClose={onClose}
        isOpen={isOpen}
        title={'Что-то пошло не так! Попробуйте ещё раз.'}
        urlImg={`${failLoginPath}`}
      />
    </>
  );
}

export default Login;
