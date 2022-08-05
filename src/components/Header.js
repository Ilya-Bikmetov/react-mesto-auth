import { Link, useHistory, useLocation } from "react-router-dom";

function Header({ loggedIn, userInfo: { email }, onSignout }) {
  const location = useLocation();

  return (
    // <header className="header">
    //   <div className="header__logo"></div>
    <div>
      {
        !loggedIn &&
        <header className="header">
          <div className="header__logo"></div>
          <nav className="header__links">
            {location.pathname === "/sign-in" && <Link className="header__link" to={"./sign-up"}>Регистрация</Link>}
            {location.pathname === "/sign-up" && <Link className="header__link" to={"./sign-in"}>Войти</Link>}
          </nav>
        </header>
      }

      {
        loggedIn &&
        <header className="header header_transform">
          <div className="header__logo"></div>
          {location.pathname === "/" &&
            <nav className="header__links">
              <p className="header__link header__link_text">{email}</p>
              <Link onClick={onSignout} className="header__link" to={"./sign-in"}>Выйти</Link>
            </nav>}
        </header>
      }
    </div>

  );
}

export default Header;
