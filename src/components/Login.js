
function Login() {

  return (
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

  );
}

export default Login;
