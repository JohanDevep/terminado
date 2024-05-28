import React, { useState, useEffect } from "react";
import { Modal, Card, Form } from "react-bootstrap";
import axios from "axios";
import Buscador from "./Buscador";
import Reproductor from "./Reproductor";
import HamburgerMenu from "./HamburgerMenu";
import ".././styles/ListaDeReproduccionCliente.css";

const API_KEY = "AIzaSyDXj1dT44UAnnaqQCK1VQ8AArWBMP1YrjM";

function ListaDeReproducciónCliente() {
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [cancionesAgregadas, setCancionesAgregadas] = useState([]);
  const [ultimaCancionAgregada, setUltimaCancionAgregada] = useState(null);
  const [mensajeAviso, setMensajeAviso] = useState("");
  const [mesasDisponibles, setMesasDisponibles] = useState([]);
  const [indiceReproduccion, setIndiceReproduccion] = useState(-1);

  const handleAgregarCancion = (cancion) => {
    const ahoraCancion = new Date();
    const cancionExistente = cancionesAgregadas.find(
      (c) => c.id === cancion.id.videoId
    );
    if (cancionExistente) {
      if (
        cancionExistente.tiempo &&
        ahoraCancion - cancionExistente.tiempo >= 7200000
      ) {
        setMensajeAviso(
          "La canción está en la lista de reproducción pero ha pasado el tiempo de espera"
        );
      } else {
        setMensajeAviso("La canción ya está en la lista de reproducción");
        return;
      }
    }

    const nuevaCancion = {
      id: cancion.id.videoId,
      title: cancion.snippet.title,
      channelTitle: cancion.snippet.channelTitle,
      thumbnail: cancion.snippet.thumbnails.default.url,
      tiempo: ahoraCancion,
    };

    setCancionesAgregadas([...cancionesAgregadas, nuevaCancion]);

    if (indiceReproduccion === -1) {
      setIndiceReproduccion(0);
    }
    setUltimaCancionAgregada(ahoraCancion);
  };
  useEffect(() => {
    const fetchMesasDisponibles = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3099/api/v1/establecimiento/${localStorage.getItem("establishmentId")}/mesas`
            );
            setMesasDisponibles(response.data.mesas);
        } catch (error) {
            console.error("Error al obtener las mesas disponibles:", error);
        }
    };
    fetchMesasDisponibles();
}, []);
  const handleEliminarCancion = (index) => {
    const nuevasCanciones = cancionesAgregadas.filter((_, i) => i !== index);
    setCancionesAgregadas(nuevasCanciones);
    if (indiceReproduccion === index) {
      if (nuevasCanciones.length === 0) {
        setIndiceReproduccion(-1);
      } else {
        setIndiceReproduccion(0);
      }
    }
  };

  return (
    <div className="Lista-Reproduccion-Cliente">
            {showModal && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Selecciona las mesas disponibles:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                        {mesasDisponibles.map((mesa) => (
  <Card key={mesa._id} style={{ marginBottom: '10px' }}>
    <Card.Body>
      <Form.Check
        type="radio"
        id={`mesa-${mesa._id}`}
        label={mesa.numero}
        checked={mesaSeleccionada === mesa._id}
        onChange={() => setMesaSeleccionada(mesa._id)}
      />
    </Card.Body>
  </Card>
))}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => setShowModal(false)}>Guardar</button>
                    </Modal.Footer>
                </Modal>
            )}
            <HamburgerMenu />
            <div className="Lista-Reproduccion-Cliente__left-container">
                <p style={{ color: "white", textAlign: "center" }}>{mensajeAviso}</p>
                <div className="Lista-Reproduccion-Cliente_left-container_square-container">
                    {indiceReproduccion !== -1 && (
                        <Reproductor
                            videoId={cancionesAgregadas[indiceReproduccion].id}
                            apiKey={API_KEY}
                        />
                    )}
                </div>
                <div className="Lista-Reproduccion-Cliente_left-container_rectangle-container">
                    <h2 style={{ color: "white" }}>Lista de Canciones</h2>
                    <ul style={{ listStyle: "none" }}>
                        {cancionesAgregadas.map((cancion, index) => (
                            <li key={cancion.id}>
                                <img src={cancion.thumbnail} alt="" />
                                <span style={{ paddingRight: "5px" }}>
                                    {cancion.title} - {cancion.channelTitle}
                                </span>
                                {localStorage.getItem("role") !== "cliente" && (
                                    <button onClick={() => handleEliminarCancion(index)}>
                                        Eliminar
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="Lista-Reproduccion-Cliente__right-container">
                <Buscador
                    apiKey={API_KEY}
                    resultados={resultados}
                    setResultados={setResultados}
                    agregarCancion={handleAgregarCancion}
                />
            </div>
        </div>
  );
}

export default ListaDeReproducciónCliente;
