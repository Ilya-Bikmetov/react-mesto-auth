import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ loggedIn, userInfo: { email }, onSignout }) {
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);

  const handleOpenProfile = () => setIsClicked(true);
  const handleCloseProfile = () => setIsClicked(false);

  return (
    <>
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
        <header className="header header_mobile">
          <div className="header__container">
            <div className="header__logo header__logo_mobile" />
            <div onClick={handleOpenProfile} className={`header__btn ${isClicked && 'header__btn_off'} header__btn_open`}>
              <div className="header__btn__element" />
              <div className="header__btn__element" />
              <div className="header__btn__element" />
            </div>
            <button onClick={handleCloseProfile} className={`header__btn ${!isClicked && 'header__btn_off'} header__btn_close`} />
          </div>
          {location.pathname === "/" &&
            <nav className={`header__links ${!isClicked && 'header__links_off'} header__links_mobile`}>
              <p className="header__link header__link_text">{email}</p>
              <Link onClick={onSignout} className="header__link" to={"./sign-in"}>Выйти</Link>
            </nav>}
        </header>
      }
    </>

  );
}

export default Header;
