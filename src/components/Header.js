import { Link, useLocation } from "react-router-dom";

function Header({ loggedIn }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__logo"></div>
      {
        !loggedIn &&
        <nav className="header__links">
          {location.pathname === "/sign-in" && <Link className="header__link" to={"./sign-up"}>Регистрация</Link>}
          {location.pathname === "/sign-up" && <Link className="header__link" to={"./sign-in"}>Войти</Link>}
        </nav>

      }
      {
        loggedIn &&
        <div>
          {
            location.pathname === "/" &&
            <nav className="header__links">
              <Link className="header__link" to={"./sign-up"}>email@mail.com</Link>
              <Link className="header__link" to={"./sign-in"}>Выйти</Link>
            </nav>
          }
        </div>
      }

    </header>
  );
}

export default Header;
