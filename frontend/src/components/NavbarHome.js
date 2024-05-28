import React, { useState } from "react";
import { Link } from "react-router-dom";
import ".././styles/home.css";

const NavbarHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowDimension, setWindowDimension] = useState({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  });

  return (
    <div>
      <div className="navbar-home">
        <Link
          className="navbar-home__establecimiento-link"
          to="/RegistroEstablecimiento"
        >
          <button className="navbar-home__establecimiento-btn" type="submit">
            REGISTRARME COMO<br></br>ESTABLECIMIENTO
          </button>
        </Link>
      </div>
      <div className="navbar-home">
        <Link
          className="navbar-home__establecimiento-link"
          to="/IniciarSesionEstablecimiento"
        >
          <button className="navbar-home__establecimiento-btn" type="submit">
            INGRESA COMO<br></br>ESTABLECIMIENTO
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavbarHome;
