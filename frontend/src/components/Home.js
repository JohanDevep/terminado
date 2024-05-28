import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Modal, Button,Form, Card} from "react-bootstrap";
import axios from "axios";
import PalabrasGroseras from "./BadWords";
import NavbarHome from "./NavbarHome";
import BloqueImgHome from "./BloqueImgHome";
import QRCodeScanner from "./QRCodeScanner";
import ".././styles/home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showQRCodeModal, setQRCodeModal] = useState(false);
  const [apodo, setApodo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [mode, setMode] = useState("");
  const [roleCliente] = useState("cliente");
  const [establecimientos, setEstablecimientos] = useState([]);
  const [selectedEstablecimiento, setSelectedEstablecimiento] = useState("");
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [mesasDisponibles, setMesasDisponibles] = useState([]);
  
  const handleIngreso1 = async () => {
    try {
      const response = await fetch(
        "http://localhost:3099/api/v1/usuario/LoginUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usuario }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { role, token } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("usuario", usuario); // Guardar el usuario en localStorage
        alert(`Inicio de sesión exitoso como ${role}`);
        setQRCodeModal(true);
      } else {
        console.error("Error al iniciar sesión:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if (/^[a-zA-ZñÑ]+$/.test(newValue) || newValue === "") {
      setApodo(newValue);
    } else {
      alert("¡El apodo solo puede contener letras del idioma español!");
    }
  };
  
  const handleIngreso = async () => {
    const BadWords = PalabrasGroseras;
    const lowerCaseApodo = apodo.toLowerCase();
    for (let i = 0; i < BadWords.length; i++) {
      if (lowerCaseApodo.includes(BadWords[i])) {
        alert("Por favor no ingrese palabras groseras");
        window.location.reload();
        return;
      }
    }
    const apodoLength = apodo.trim().length;
    if (apodoLength >= 3 && apodoLength <= 20) {
      try {
        const response = await axios.post(
          "http://localhost:3099/api/v1/usuario/postUsers",
          { usuario: apodo, role: roleCliente }
        );

        alert("¡Registrado exitosamente! Ahora inicia sesión con tu apodo");

        localStorage.setItem("role", roleCliente);
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      alert("¡El apodo debe tener entre 3 y 20 caracteres!");
    }
  };
  const navigate = useNavigate();
  const [showOtroModal, setOtroModal] = useState(false);
  const handleSeleccionEstablecimiento = async () => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario || !selectedEstablecimiento) {
      alert(
        "Por favor asegúrate de haber iniciado sesión y seleccionado un establecimiento."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3099/api/v1/establecimiento/seleccionar",
        { establecimientoId: selectedEstablecimiento, usuario },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        const { establecimientoId } = response.data; // Obtener el ID del establecimiento de la respuesta
        alert("Establecimiento seleccionado correctamente");
        setQRCodeModal(false);
         navigate("/ListaDeReproduccionCliente");

        // Guardar el ID del establecimiento seleccionado en localStorage
        localStorage.setItem("establishmentId", establecimientoId); // Ensure "establishmentId" is used consistently
      } else {
        console.error(
          "Error al seleccionar establecimiento:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    const fetchEstablecimientos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3099/api/v1/establecimiento/getEstablecimientolistar"
        );
        setEstablecimientos(response.data.adms);
      } catch (error) {
        console.error("Error al obtener establecimientos:", error);
      }
    };
    fetchEstablecimientos();
  }, []);
  useEffect(() => {
    const fetchMesasDisponibles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3099/api/v1/establecimiento/${localStorage.getItem(
            "establishmentId"
          )}/mesas`
        );
        setMesasDisponibles(response.data.mesas);
      } catch (error) {
        console.error("Error al obtener las mesas disponibles:", error);
      }
    };
    fetchMesasDisponibles();
  }, []);

  useEffect(() => {
    const fetchMesasDisponibles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3099/api/v1/establecimiento/${localStorage.getItem(
            "establishmentId"
          )}/mesas`
        );
        setMesasDisponibles(response.data.mesas);
      } catch (error) {
        console.error("Error al obtener las mesas disponibles:", error);
      }
    };
    fetchMesasDisponibles();
  }, []);
  return (
    <div className="home">
      <Helmet>
        <title>Jukebox</title>
      </Helmet>
      <Modal show={showOtroModal} onHide={() => setOtroModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Otro Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {mesasDisponibles.map((mesa) => (
              <Card key={mesa._id} style={{ marginBottom: "10px" }}>
                <Card.Body>
                  <Form.Check
                    type="radio"
                    id={`mesa-${mesa._id}`}
                    label={`Mesa ${mesa.numero}`}
                    checked={mesaSeleccionada === mesa._id}
                    onChange={() => setMesaSeleccionada(mesa._id)}
                  />
                </Card.Body>
              </Card>
            ))}
          </ul>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOtroModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="home__moda-qr"
        show={showQRCodeModal}
        onHide={() => setQRCodeModal(false)}
      >
        <Modal.Header className="home_moda-qr_header">
          <Modal.Title className="home_moda-qr_titulo">
            ¡ESCANEA EL CÓDIGO QR DE TU MESA AQUÍ!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ backgroundColor: "black" }}
          className="home_moda-qr_cuerpo"
        >
          <select
            value={selectedEstablecimiento}
            onChange={(e) => setSelectedEstablecimiento(e.target.value)}
            className="form-control"
          >
            <option value="">Selecciona un establecimiento</option>
            {establecimientos.map((establecimiento) => (
              <option key={establecimiento._id} value={establecimiento._id}>
                {establecimiento.nombre} - {establecimiento.tipo}
              </option>
            ))}
          </select>
          <Button
            variant="primary"
            onClick={handleSeleccionEstablecimiento}
            className="mt-3"
          >
            Guardar
          </Button>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "black" }}>
          <Button variant="secondary" onClick={() => setQRCodeModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <NavbarHome />
      <h2 className="home__titulo-neon">
        ¡CREA EL AMBIENTE PERFECTO <br></br>CON JUKEBOX!
      </h2>

      {!mode ? (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            onClick={() => setMode("register")}
            className="home__seleccion-boton12"
            style={{ marginRight: "10px" }}
          >
            ¿Quieres registrarte?
          </button>
          <button
            onClick={() => setMode("login")}
            className="home__seleccion-boton12"
          >
            ¿Quieres ingresar?
          </button>
        </div>
      ) : (
        <>
          {mode === "register" ? (
            <>
              <p
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                REGÍSTRATE:
              </p>
              <form className="home__formulario_apodo">
                <input
                  type="text"
                  className="home_formulario_input-apodo"
                  placeholder="¿Qué apodo quieres?"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={apodo}
                  onChange={handleInputChange}
                  maxLength="20"
                />
                <input type="hidden" name="roleCliente" value={roleCliente} />
                <button
                  type="button"
                  className="home_formulario_boton-ingresar"
                  disabled={!apodo || apodo.trim().length > 20}
                  onClick={handleIngreso}
                >
                  ¡Regístrate!
                </button>
              </form>
            </>
          ) : (
            <>
              <p
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                INICIAR SESIÓN:
              </p>
              <form className="home__formulario_apodo">
                <input
                  type="text"
                  className="home_formulario_input-apodo"
                  placeholder="¿Qué apodo tienes?"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  maxLength="20"
                />
                <button
                  type="button"
                  className="home_formulario_boton-ingresar"
                  onClick={handleIngreso1}
                >
                  ¡LogIn!
                </button>
              </form>
            </>
          )}
          <button
            onClick={() => setMode("")}
            className="home__seleccion-boton"
            style={{ marginTop: "10px" }}
          >
            Cambiar opción
          </button>
        </>
      )}
      <BloqueImgHome />
    </div>
  );
};

export default Home;
