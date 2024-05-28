import React, { useState, useEffect } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import CookieImg from ".././assets/images/Cookie.png";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const Cookies = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setShowModal(true);
    }
  }, []);

  const acceptConditions = () => {
    const userId = uuidv4();
    localStorage.setItem("userId", userId);
    setShowModal(false);
    // Redirigir a la página principal o ejecutar la navegación deseada
  };

  return (
    <div className="cookies-container-modal">
      {showModal && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Image src={CookieImg} alt="Cookie" width="24" />
              &nbsp;Información sobre cookies
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ textAlign: "justify" }}>
              Utilizamos cookies propias y de terceros para mejorar nuestros
              servicios.
              <h5 style={{ color: "black" }}>
                Recolecci&oacute;n y Uso de Informaci&oacute;n
              </h5>
              Al utilizar nuestros servicios, usted acepta y consiente
              expresamente la recopilación y el uso de cierta información
              personal, incluida su direcci&oacute;n IP, con el prop&oacute;sito
              de facilitar la funcionalidad y seguridad de nuestros servicios,
              así como para fines de análisis y mejora de los mismos.
              <h5 style={{ color: "black" }}>Uso de la Direcci&oacute;n IP</h5>
              Entendemos que la ubicaci&oacute;n de nuestros usuarios puede ser
              relevante para proporcionar ciertos servicios personalizados, como
              la selecci&oacute;n de m&uacute;sica y otros servicios ofrecidos
              por nuestra plataforma. Por lo tanto, la dirección IP se puede
              utilizar para determinar la ubicaci&oacute;n aproximada del
              usuario y así facilitar la provisi&oacute;n de estos servicios.
              <h5 style={{ color: "black" }}>
                Eliminaci&oacute;n de la Direcci&oacute;n IP
              </h5>
              Nos comprometemos a eliminar su direcci&oacute;n IP de nuestros
              registros cuando ya no sea necesaria para los fines para los que
              fue recopilada, o cuando usted cierre sesi&oacute;n en nuestros
              servicios. Además, implementamos un proceso autom&aacute;tico para
              borrar los registros de direcci&oacute;n IP a las 8 a.m. del
              siguiente d&iacute;a posterior al uso de nuestros servicios por
              parte del usuario.
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={acceptConditions}>
              Aceptar
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Cookies;
