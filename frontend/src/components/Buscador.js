import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const Buscador = ({ resultados, setResultados, agregarCancion, apiKey }) => {
  const [texto, setTexto] = useState("");
  const [botonAction, setBotonAction] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cancionToAdd, setCancionToAdd] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [cancionesAgregadas, setCancionesAgregadas] = useState([]);

  useEffect(() => {
    if (texto.length > 0) {
      const params = {
        part: "snippet",
        q: texto,
        type: "video",
        videoCategoryId: 10,
        maxResults: 10,
        key: apiKey,
      };

      axios
        .get("https://www.googleapis.com/youtube/v3/search", { params })
        .then((response) => {
          const videoIds = response.data.items
            .map((item) => item.id.videoId)
            .join(",");

          axios
            .get("https://www.googleapis.com/youtube/v3/videos", {
              params: {
                part: "contentDetails",
                id: videoIds,
                key: apiKey,
              },
            })
            .then((videoResponse) => {
              const filteredResults = response.data.items.filter(
                (item, index) => {
                  const duration =
                    videoResponse.data.items[index].contentDetails.duration;
                  const durationInSeconds = parseDuration(duration);
                  return durationInSeconds <= 600;
                }
              );
              setResultados(filteredResults);
            });
        });
    }
  }, [texto]);

  const parseDuration = (duration) => {
    const matches = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (matches) {
      const hours = parseInt(matches[1]) || 0;
      const minutes = parseInt(matches[2]) || 0;
      const seconds = parseInt(matches[3]) || 0;
      return hours * 3600 + minutes * 60 + seconds;
    }
    return 0;
  };

  const handleInputChange = (e) => {
    setTexto(e.target.value);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const handleAgregarCancion = (cancion) => {
    const cancionAgregadaRecientemente = cancionesAgregadas.find(
      (c) => c.id === cancion.id
    );

    if (cancionAgregadaRecientemente) {
      const tiempoTranscurrido =
        Date.now() - cancionAgregadaRecientemente.timestamp;
      const tiempoRestante = Math.max(7200000 - tiempoTranscurrido, 0);

      const tiempoRestanteSegundos = Math.ceil(tiempoRestante / 1000);
      const tiempoRestanteFormateado = formatTime(tiempoRestanteSegundos);

      alert(
        `Esta canción ya fue agregada. Por favor espera ${tiempoRestanteFormateado}.`
      );
      return;
    }

    setShowConfirmation(true);
    setCancionToAdd(cancion);
  };

  const confirmAddSong = () => {
    agregarCancion(cancionToAdd);
    setCancionesAgregadas([
      ...cancionesAgregadas,
      { id: cancionToAdd.id, timestamp: Date.now() },
    ]);
    setTexto("");
    setShowConfirmation(false);
    setBotonAction(false);
    setTiempoRestante(300);

    const timer = setInterval(() => {
      setTiempoRestante((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setBotonAction(true);
      setTiempoRestante(0);
    }, 300000);
  };

  const cancelAddSong = () => {
    setShowConfirmation(false);
    setCancionToAdd(null);
  };

  return (
    <div className="Buscador-canciones">
      <div className="search-input">
        <input
          className="Buscador-canciones__input"
          placeholder="Ingrese el nombre de la canción aquí..."
          type="text"
          value={texto}
          onChange={handleInputChange}
          disabled={!botonAction}
        />
        <FaMagnifyingGlass className="Buscador-canciones__lupa-input" />
      </div>
      <div className="Buscador-canciones__scroll">
        {tiempoRestante > 0 && (
          <p style={{ color: "white" }}>
            No puedes agregar más canciones. Por favor espera{" "}
            {formatTime(tiempoRestante)}!
          </p>
        )}
        {botonAction && (
          <ul style={{ listStyle: "none" }}>
            {resultados.map((cancion) => (
              <li key={cancion.id}>
                {cancion.snippet &&
                  cancion.snippet.thumbnails &&
                  cancion.snippet.thumbnails.default && (
                    <img src={cancion.snippet.thumbnails.default.url} alt="" />
                  )}
                <span className="Buscador-canciones__titulos">
                  {cancion.snippet && cancion.snippet.title} -{" "}
                  {cancion.snippet && cancion.snippet.channelTitle}
                </span>
                <div>
                  <a
                    onClick={() => handleAgregarCancion(cancion)}
                    className="btn-modal12  "
                    href="#demo-modal4"
                  >
                    Agregar
                  </a>
                </div>
                <div>
                  {showConfirmation && (
                    <div id="demo-modal4" className="modal3">
                      <div className="modal__content">
                        <div className="title-modal">
                          <h1>Confirmar</h1>
                        </div>
                        <a href="#" className="modal__close">
                          &times;
                        </a>
                        <div className="modal__footer">
                          <div style={{ height: "400px", width: "100%" }}>
                            <p>
                              ¿Deseas agregar la canción {cancion.snippet.title}
                              ?
                            </p>
                            <div>
                              <button onClick={confirmAddSong}>Sí</button>
                              <button onClick={cancelAddSong}>Cancelar</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Buscador;
