import { Helmet } from "react-helmet";
import { useState } from "react";
import ".././styles/MesasAdmin.css";
import { Button, Modal, Form } from "react-bootstrap";
import RandomQrCode from ".././assets/images/RandomQrCode.png";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Tilt } from "react-tilt";
import { useEffect } from "react";
import axios from "axios";

const defaultOptions = {
  reverse: false,
  max: 35,
  perspective: 1000,
  scale: 1.1,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

const MesasAdmin = () => {
  const [mesas, setMesas] = useState([]);
  const [cantidadMesas, setCantidadMesas] = useState(0);
  const establecimientoId = localStorage.getItem("establishmentId");

  useEffect(() => {
    fetch(
      `http://localhost:3099/api/v1/establecimiento/${establecimientoId}/mesas`
    )
      .then((response) => response.json())
      .then((data) => {
        setMesas(data.mesas);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3099/api/v1/establecimiento/putEstablecimientomesa/${establecimientoId}`,
        { cantidadMesas: parseInt(cantidadMesas) } 
      );
      setMesas(response.data.establecimiento.mesas);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [minQuantity, setMinQuantity] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDecrement = () => {
    if (quantity > minQuantity) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleConfirm = () => {
    console.log(`Selected quantity: ${quantity}`);
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };
  const [pagina, setPagina] = useState(1);
  const mesasPorPagina = 4;
  const indiceUltimaMesa = pagina * mesasPorPagina;
  const indicePrimeraMesa = indiceUltimaMesa - mesasPorPagina;
  const mesasPaginadas = mesas.slice(indicePrimeraMesa, indiceUltimaMesa);

  const cambiarPagina = (numeroPagina) => {
    setPagina(numeroPagina);
  };

  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [showGenerarModal, setShowGenerarModal] = useState(false);

  const handleCloseEliminarModal = () => setShowEliminarModal(false);
  const handleShowEliminarModal = () => setShowEliminarModal(true);

  const handleCloseGenerarModal = () => setShowGenerarModal(false);
  const handleShowGenerarModal = () => setShowGenerarModal(true);

  const currentUrl = "http://localhost:3099/";

  return (
    <div className="mesas-admin">
      <Helmet>
        <title>Mesas Establecimiento | Jukebox</title>
      </Helmet>
      <h2>MESAS DEL ESTABLECIMIENTO</h2>
      <div className="mesas-admin__contenedor-border-mesas">
        <form onSubmit={handleSubmit}>
          <label htmlFor="cantidadMesas">Cantidad de Mesas:</label>
          <input
            type="number"
            id="cantidadMesas"
            value={cantidadMesas}
            onChange={(e) => setCantidadMesas(e.target.value)}
          />
          <button type="submit">Actualizar</button>
        </form>
        Este formulario permitirá al usuario ingresar la cantidad de mesas y
        luego enviar ese valor utilizando la función handleSubmit cuando se haga
        clic en el botón "Guardar". La función handleSubmit enviará esta
        información al servidor a través de una solicitud PUT a la URL
        especificada.
        <div className="mesas-admin__contenedor-mesas">
          {mesas.map((mesa) => (
            <Tilt options={defaultOptions}>
              <div key={mesa._id} className="mesas-admin__mesa rgb">
                <p className="mesas-admin__numero-mesa">MESA {mesa.numero}</p>
                <p className="mesas-admin__numero-mesa">
                  Capacidad: {mesa.capacidad}
                </p>
                <div className="mesas-admin__botones-mesa">
                  <Button
                    className="btn btn-danger"
                    onClick={handleShowEliminarModal}
                  >
                    ELIMINAR
                  </Button>
                  <Modal
                    className="mesas-admin__modal"
                    show={showEliminarModal}
                    onHide={handleCloseEliminarModal}
                    centered
                  >
                    <Modal.Body className="mesas-admin__modal__cuerpo">
                      <p className="mesas-admin__modal__mensaje">
                        ¿ESTÁS SEGURO QUE DESEAS ELIMINAR EL CÓDIGO QR DE LA
                        MESA {mesa.numero}?
                      </p>
                      <div className="mesas-admin__modal__grupo-botones">
                        <Button
                          className="mesas-admin__modal__modal-btn"
                          variant="danger"
                          onClick={handleCloseEliminarModal}
                        >
                          S&Iacute;
                        </Button>
                        <Button
                          className="mesas-admin__modal__modal-btn"
                          variant="secondary"
                          onClick={handleCloseEliminarModal}
                        >
                          NO
                        </Button>
                      </div>
                    </Modal.Body>
                  </Modal>
                  <Link to="/TablaClientes">
                    <button className="btn btn-success">USUARIOS</button>
                  </Link>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MesasAdmin;
