import React, { useState, useEffect, useRef } from "react";
import ".././styles/Registro.css";
import GoogleMapReact from "google-map-react";
import GoogleMapsLogoLetraBlanca from ".././assets/images/GoogleMapsLogoLetraBlanca.png";

function MapGoogle({ apiKey, linkUbicacionParaRegistro }) {
  const [coordenadas, setCoordenadas] = useState({ lat: 0, lng: 0 });
  const [direccion, setDireccion] = useState("");
  const [linkUbicacion, setLinkUbicacion] = useState("");
  linkUbicacionParaRegistro(linkUbicacion);

  //Input ubicación:
  const inputRef = useRef(null); // Referencia al input

  useEffect(() => {
    // Efecto para el brillo naranja
    if (linkUbicacion !== "") {
      inputRef.current.classList.add("map-google__highlight-input-map-link");
      setTimeout(
        () =>
          inputRef.current.classList.remove(
            "map-google__highlight-input-map-link"
          ),
        500
      ); // 500 ms
    }
  }, [linkUbicacion]); // Se ejecuta cuando cambia 'location'

  const handleMapClick = ({ lat, lng }) => {
    setCoordenadas({ lat, lng });
    const link = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    setLinkUbicacion(link);
  };

  useEffect(() => {
    const obtenerDireccion = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordenadas.lat},${coordenadas.lng}&key=${apiKey}`
        );
        const data = await response.json();
        if (data.status === "OK") {
          setDireccion(data.results[0].formatted_address);
        } else {
          console.error("Error al obtener la dirección");
        }
      } catch (error) {
        console.error("Error al obtener la dirección:", error);
      }
    };

    obtenerDireccion();
  }, [coordenadas, apiKey]);

  return (
    <div className="map-google">
      <div className="map-google__contenedor-wrapper">
        <a className="map-google__btn-modal" href="#demo-modal3">
          <img
            src={GoogleMapsLogoLetraBlanca}
            alt="Google Maps"
            height="auto"
            width="150px"
          />
        </a>
      </div>
      <div id="demo-modal3" className="map-google__modal3">
        <div className="map-google__modal-content">
          <div className="map-google__title-modal">
            <h1>¡Ubica tu establecimiento!</h1>
          </div>
          <a href="#" className="map-google__modal-close">
            &times;
          </a>
          <div className="map-google__modal-footer">
            <div style={{ height: "400px", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={{
                  lat: 2.926309369964354,
                  lng: -75.28898623536135,
                }}
                defaultZoom={8}
                onClick={handleMapClick}
              ></GoogleMapReact>
              <input
                style={{ display: "none" }}
                className="map-google__input-modal"
                type="text"
                value={linkUbicacion}
                readOnly
              />

              <input
                className="map-google__input-modal"
                type="text"
                ref={inputRef}
                value={
                  linkUbicacion === ""
                    ? "Selecciona la ubicación en el mapa de Google."
                    : "Ubicación seleccionada. Seleccionar otra vez si desea."
                }
                readOnly // El usuario no puede escribir
              />
              <p className="map-google__p-modal">
                Se&ntilde;ala el lugar de su establecimiento.
              </p>
              <p className="map-google__p-modal">
                Se recomienda hacer m&aacute;s zoom, para tener una
                ubicaci&oacute;n más precisa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapGoogle;
