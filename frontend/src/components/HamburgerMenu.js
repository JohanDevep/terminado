import React, { useState } from "react";
import Hamburger from ".././assets/images/Hamburger.svg";
import Gear from ".././assets/images/Gear.png";
import ".././styles/HamburgerMenu.css";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGenerarModal, setShowGenerarModal] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleCloseGenerarModal = () => {
    // Lógica para eliminar todo del localStorage
    localStorage.clear();
    // Cerrar el modal
    setShowGenerarModal(false);
  };
  const handleShowGenerarModal = () => setShowGenerarModal(true);

  const role = localStorage.getItem("role");
  
  return (
    <div className="hamburger-menu">
      <Modal show={showGenerarModal} onHide={handleCloseGenerarModal} centered>
        <Modal.Body className="mesas-admin__modal__cuerpo">
          <p className="mesas-admin__modal__mensaje">
            ¿ESTÁS SEGURO QUE DESEA DESVINCULARSE DE ESTE ESTABLECIMIENTO?
          </p>
          <div className="mesas-admin__modal__grupo-botones">
            <Link
              style={{ textDecoration: "none", width: "100%" }}
              to="/
            "
            >
              <Button
                variant="light"
                className="mesas-admin__modal__modal-btn"
                onClick={handleCloseGenerarModal}
              >
                SÍ
              </Button>
            </Link>
            <Button
              variant="secondary"
              className="mesas-admin__modal__modal-btn"
              onClick={handleCloseGenerarModal}
            >
              NO
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <img
        src={Hamburger}
        alt="hamburger"
        className="hamburger"
        onClick={toggleMenu}
      />
      <nav className={`menu-navegacion ${isMenuOpen && "spread"}`}>
        <img src={Gear} alt="gear" className="hamburger-menu__gear-img"></img>
        {role !== "cliente" && role === "Establecimiento" && (
          <p className="hamburger-menu__titulo">
            CONFIGURACI&Oacute;N CUENTA ESTABLECIMIENTO
          </p>
        )}
      {role !== "cliente" && role === "Establecimiento" && (
          <Button
            className="hamburger-menu__opcion"
            onClick={handleShowGenerarModal}
          >
            CERRAR SESI&Oacute;N
          </Button>
        )}
        {role !== "cliente" && role === "Establecimiento" && (
          <Link to="/ListaDeReproduccionCliente">
            <Button className="hamburger-menu__opcion">
              LISTA DE REPRODUCI&Oacute;N
            </Button>
          </Link>
        )}
        {role !== "cliente" && role === "Establecimiento" && (
          <Link to="/MesasAdmin">
            <Button className="hamburger-menu__opcion">
              MESAS DEL ESTABLECIMIENTO
            </Button>
          </Link>
        )}
       {role === "cliente" && (
          <>
            <p className="hamburger-menu__titulo">
              CONFIGURACIÓN CUENTA CLIENTE
            </p>
            <Button
              className="hamburger-menu__opcion"
              onClick={handleShowGenerarModal}
            >
              DESVINCULARSE DEL ESTABLECIMIENTO
            </Button>
          </>
        )}
        <a
          className="btn btn-light"
          style={{ padding: "0 40px" }}
          onClick={toggleMenu}
        >
          X
        </a>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
