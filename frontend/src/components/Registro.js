import ".././styles/Registro.css";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import MapGoogle from "./MapGoogle";
import axios from "axios";

const Registro = () => {
  // Permite que se pueda redireccionar con el boton a la siguiente vista, tambien agregando la importacion de useNavigate
  const navigate = useNavigate();

  // Llave de mapa de google
  const apiKey = "AIzaSyBxhu0OoilM7sG4-6cE6oTp1D0ErDwmX48";

  // Iniciando las variables de los inputs del formulario
  const initialValues = {
    email: "",
    emailC: "",
    contraseña: "",
    contraseñaC: "",
    nombre: "",
    tipo: "",
    descripcion: "",
    nit: "",
    ubicacion: "",
  };

  // Estados de las variables, errores y submits
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    // Si todas las validaciones han pasado y el formulario ha sido enviado, redirige a la nueva vista
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      navigate("/MesasAdmin");
    }
  }, [formErrors, isSubmit, navigate]);

  // Función y estado de cambio del formulario de las variables de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Función y estado para los errores por medio de validaciones.
  //Se utilizó Axios para enviar los datos del formulario de registro desde frontend React.js al backend Node.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    try {
      // Verifica si hay errores de validación antes de enviar los datos al backend
      if (Object.keys(formErrors).length === 0) {
        // Enviar los datos al backend
        const response = await axios.post(
          "http://localhost:3099/api/v1/establecimiento/postEstablecimiento",
          formValues
        );
        console.log(response.data); // Aquí puedes manejar la respuesta del backend si es necesario
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  // Estado de efecto cuando los inputs esten en proceso
  // Comprueba y valida los inputs
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  // Funciones de validaciones por medio de Expresiones Regulares
  // Uso de las expresiones regulares para validar (Nuevo)
  const validate = (values) => {
    const errors = {};
    const spacerrors = /^\S*$/;
    const inispacerrors = /^[^\s][\w\sñÑ]*$/;
    const numberrors = /^[0-9]+$/;
    const texterrors = /^[a-zA-Z0-9\sñÑ]*$/;
    const simbolerrors = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passtexterrors = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]+$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //
    if (!values.email) {
      errors.email = "¡El correo es requerido!";
    } else if (!spacerrors.test(values.email)) {
      errors.email = "!No debe contener espacios!";
    } else if (!simbolerrors.test(values.email)) {
      errors.email = "¡El correo es erroneo!";
    } else if (!regex.test(values.email)) {
      errors.email = "¡Formato no valido!";
    } else if (values.email !== values.emailC) {
      errors.email = "¡Los correos no coinciden!";
    }
    //
    if (!values.emailC) {
      errors.emailC = "¡El correo es requerido!";
    } else if (!spacerrors.test(values.emailC)) {
      errors.emailC = "No debe contener espacios!";
    } else if (!simbolerrors.test(values.emailC)) {
      errors.emailC = "¡El correo es erroneo!";
    } else if (!regex.test(values.emailC)) {
      errors.emailC = "¡Formato no valido!";
    } else if (values.email !== values.emailC) {
      errors.emailC = "¡Los correos no coinciden!";
    }
    //
    if (!values.contraseña) {
      errors.contraseña = "¡La contraseña es requerida!";
    } else if (values.contraseña.length <= 8) {
      errors.contraseña =
        "¡La contraseña debe ser mayor o igual a 8 caracteres!";
    } else if (values.contraseña.length >= 20) {
      errors.contraseña =
        "¡La contraseña debe ser menor o igual a 20 caracteres!";
    } else if (!passtexterrors.test(values.contraseña)) {
      errors.contraseña =
        "Debe contener una mayúscula, un número y un carácter especial";
    } else if (!spacerrors.test(values.contraseña)) {
      errors.contraseña = "Los espacios en blanco, no son válidos";
    } else if (values.contraseña !== values.contraseñaC) {
      errors.contraseña = "¡Las contraseñas no coinciden!";
    }
    //
    if (!values.contraseñaC) {
      errors.contraseñaC = "¡La contraseña es requerida!";
    } else if (values.contraseñaC.length <= 8) {
      errors.contraseñaC =
        "¡La contraseña debe ser mayor o igual a 8 caracteres!";
    } else if (values.contraseñaC.length >= 20) {
      errors.contraseñaC =
        "¡La contraseña debe ser menor o igual a 20 caracteres!";
    } else if (!passtexterrors.test(values.contraseñaC)) {
      errors.contraseñaC =
        "Debe contener una mayúscula, un número y un carácter especial";
    } else if (!spacerrors.test(values.contraseñaC)) {
      errors.contraseñaC = "Los espacios en blanco, no son válidos";
    } else if (values.contraseña !== values.contraseñaC) {
      errors.contraseñaC = "¡Las contraseñas no coinciden!";
    }
    //
    if (!values.nombre) {
      errors.nombre = "¡El nombre del establecimiento es requerido!";
    } else if (!texterrors.test(values.nombre)) {
      errors.nombre = "¡No debe contener caracteres especiales!";
    } else if (!inispacerrors.test(values.nombre)) {
      errors.nombre = "¡El primer caracter no puede ser espacio!";
    }
    //   Aqui va la condicion para el tipo de establecimiento
    if (values.tipo === "") {
      errors.tipo = "¡Debes seleccionar un establecimiento";
    }
    //
    if (!values.descripcion) {
      errors.descripcion = "¡La descripción es requerida! ";
    } else if (values.descripcion.length <= 20) {
      errors.descripcion = "La descripcrión debe tener al menos 20 caracteres.";
    } else if (values.descripcion.length >= 500) {
      errors.descripcion = "Has superado la cantidad de caracteres.";
    }
    //
    if (!values.nit) {
      errors.nit = "¡El nit es requerido! ";
    } else if (!numberrors.test(values.nit)) {
      errors.nit = "¡Solo números!";
    } else if (values.nit.length < 9 || values.nit.length > 9) {
      errors.nit = "¡El nit de la empresa debe contener 9 digitos";
    }
    //
    if (!values.ubicacion) {
      errors.ubicacion = "¡La ubicación es requerida! ";
    } else if (!spacerrors.test(values.ubicacion)) {
      errors.ubicacion = "¡No debe contener espacios!";
    }
    return errors;
  };

  const [receivedDataLinkMap, setReceivedDataLinkMap] = useState(null);

  const linkUbicacionFromChild = (data) => {
    setReceivedDataLinkMap(data);
  };

  //Input ubicación:
  const inputRef = useRef(null); // Referencia al input

  useEffect(() => {
    // Efecto para el brillo naranja
    if (receivedDataLinkMap !== null) {
      inputRef.current.classList.add("map-google__highlight-input-map-link");
      setTimeout(
        () =>
          inputRef.current.classList.remove(
            "map-google__highlight-input-map-link"
          ),
        500
      ); // 500 ms
    }
  }, [receivedDataLinkMap]); // Se ejecuta cuando cambia 'location'

  return (
    <div className="bgregistro">
      <Helmet>
        <title>Registro Establecimiento | Jukebox</title>
      </Helmet>
      <div className="registro-vista">
        <div className="registro-vista__imagen-fondo"></div>

        <div className="registro-vista__formulario">
          <h2 className="registro-vista__formulario__titulo">¡BIENVENIDO!</h2>
          <p className="registro-vista__formulario__texto-general">
            Cree una cuenta para desbloquear una experiencia musical
            personalizada para su establecimiento
          </p>
          <form onSubmit={handleSubmit}>
            <div className="registro-vista__formulario__contenedor-inputs">
              <p className="registro-vista__formulario__mensaje_error">
                {formErrors.email}
              </p>
              <input
                type="email"
                placeholder="Escriba su correo electr&oacute;nico"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                onBlur={handleChange}
              />
              <p className="registro-vista__formulario__mensaje_error">
                {formErrors.emailC}
              </p>
              <input
                type="email"
                placeholder="Confirme su correo electr&oacute;nico"
                name="emailC"
                value={formValues.emailC}
                onChange={handleChange}
                onBlur={handleChange}
              />
              <p className="registro-vista__formulario__mensaje_error">
                {formErrors.contraseña}
              </p>
              <input
                type="password"
                placeholder="Escriba su contrase&ntilde;a"
                name="contraseña"
                value={formValues.contraseña}
                onChange={handleChange}
                onBlur={handleChange}
              />
              <p className="registro-vista__formulario__mensaje_error">
                {formErrors.contraseñaC}
              </p>
              <input
                type="password"
                placeholder="Confirme su contrase&ntilde;a"
                name="contraseñaC"
                value={formValues.contraseñaC}
                onChange={handleChange}
                onBlur={handleChange}
              />
              <p className="registro-vista__formulario__mensaje_error">
                {formErrors.nombre}
              </p>
              <input
                type="text"
                placeholder="Nombre del establecimiento"
                name="nombre"
                value={formValues.nombre}
                onChange={handleChange}
                onBlur={handleChange}
              />
              <p className="registro-vista__formulario__mensaje_error">
                {formErrors.tipo}
              </p>
              <select
                className="registro-vista__formulario__tipo"
                id="tipo"
                name="tipo"
                value={formValues.tipo}
                onChange={handleChange}
                onBlur={handleChange}
              >
                <option value="">
                  Seleccione un tipo de establecimiento &#8595;
                </option>
                <option value="restaurante">Gastrobar</option>
                <option value="tienda">Bar</option>
                <option value="hotel">Club</option>
                <option value="museo">Restaurante</option>
                <option value="otro">Otro</option>
              </select>
              <p className="registro-vista__formulario__mensaje_error">
                {formErrors.descripcion}
              </p>
              <textarea
                className="registro-vista__formulario__textarea"
                id="descripcion-establecimiento"
                name="descripcion"
                rows="10"
                cols="50"
                placeholder="Descripci&oacute;n de tu establecimiento"
                maxlength="500"
                value={formValues.descripcion}
                onChange={handleChange}
                onBlur={handleChange}
                onKeyUp={(event) => contarCaracteres(event.target)}
              ></textarea>

              <p id="registro-vista__formulario__textarea__caracteres-restantes">
                500 caracteres restantes
              </p>
              <p className="registro-vista__formulario__mensaje_error">
                {formErrors.nit}
              </p>
              <input
                type="text"
                placeholder="Escriba el NIT del establecimiento"
                name="nit"
                value={formValues.nit}
                onChange={handleChange}
                onBlur={handleChange}
              />
              <p className="registro-vista__formulario__mensaje_error">
                {formErrors.ubicacion}
              </p>
              <input
                style={{ display: "none" }}
                type="text"
                placeholder="Escriba la ubicaci&oacute;n del establecimiento"
                name="ubicacion"
                value={(formValues.ubicacion = receivedDataLinkMap)}
                onChange={handleChange}
                onBlur={handleChange}
              />
              <input
                type="text"
                ref={inputRef}
                value={
                  receivedDataLinkMap === ""
                    ? "Selecciona la ubicación en el mapa de Google abajo."
                    : "Ubicación seleccionada. Seleccionar otra vez si desea."
                }
                readOnly // El usuario no puede escribir
              />
              <MapGoogle
                apiKey={apiKey}
                linkUbicacionParaRegistro={linkUbicacionFromChild}
              />

              {/* 
                  to="/MesasAdmin"
                 */}
              <button
                className="registro-vista__formulario__btn-registrarse"
                type="submit"
                // permite que se pueda redireccionar con el boton a la siguiente vista
              >
                REG&Iacute;STRATE
              </button>
            </div>
          </form>
          <Link to="/IniciarSesionEstablecimiento">
            <a className="registro-vista__formulario__enlace-login">
              ¿Ya tiene cuenta? Clic aquí
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

function contarCaracteres(textarea) {
  const maxCaracteres = 500;
  const caracteresRestantes = maxCaracteres - textarea.value.length;
  const mensajeRestantes = document.getElementById(
    "registro-vista__formulario__textarea__caracteres-restantes"
  );

  if (caracteresRestantes < 0) {
    mensajeRestantes.classList.add("error");
    textarea.value = textarea.value.substring(0, maxCaracteres);
  } else {
    mensajeRestantes.classList.remove("error");
  }

  mensajeRestantes.textContent = `${caracteresRestantes} caracteres restantes`;
}

export default Registro;
