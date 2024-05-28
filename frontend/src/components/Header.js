import React from "react";
import ".././styles/Header.css";
import AnimatedRedJukeboxAppIcon from ".././assets/images/AnimatedRedJukeboxAppIcon.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-sitio">
      <div className="header-sitio__logo-container">
        <Link to="/">
          <img
            src={AnimatedRedJukeboxAppIcon}
            alt="Logo"
            className="header-sitio__logo"
          />
        </Link>
      </div>
      <div className="header-sitio__title-container">
        <h1 className="header-sitio__title">JUKEBOX</h1>
      </div>
    </header>
  );
};

export default Header;
