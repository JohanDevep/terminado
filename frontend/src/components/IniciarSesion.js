import ".././styles/IniciarSesion.css";
import { Helmet } from "react-helmet";
import AnimatedRedJukeboxAppIcon from ".././assets/images/AnimatedRedJukeboxAppIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const IniciarSesion = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [establecimientoId, setEstablecimientoId] = useState('');
  const [establecimientoEncontrado, setEstablecimientoEncontrado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'correo') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'http://localhost:3099/api/v1/establecimiento/LoginEstablecimiento',
        {
          email,
          contraseña: password
        }
      );
  
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('establishmentId', response.data.establecimientoId); 
        setToken(response.data.token);
        setEstablecimientoId(response.data.establecimientoId);
        setEstablecimientoEncontrado(response.data.establecimientoEncontrado);
        navigate('/MesasAdmin');
      } else {
        console.error('Error al iniciar sesión: No se recibió un token del servidor');
      }
    } catch (error) {
      setError('Error al enviar los datos: ' + error.message);
    }
  };
  

  return (
    <div className="iniciar-sesion-vista">
      <Helmet>
        <title>Iniciar Sesión Establecimiento | Jukebox</title>
      </Helmet>
      <div className="iniciar-sesion-vista__imagen_fondo"></div>

      <div className="iniciar-sesion-vista__formulario">
        <div className="iniciar-sesion-vista__bordenegro">
          <img
            className="iniciar-sesion-vista__formulario__img-rockola"
            src={AnimatedRedJukeboxAppIcon}
            alt="JUKEBOX LOGO"
            height="auto"
            width="150px"
          />
          <p className="iniciar-sesion-vista__formulario__legend">JUKEBOX</p>
          <h2 className="iniciar-sesion-vista__formulario__title">
            ¡ENTRA A TU CUENTA DE ESTABLECIMIENTO!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="iniciar-sesion-vista__formulario__contenedor_inputs">
              <p className="iniciar-sesion-vista__formulario__mensaje_error">
                {error}
              </p>
              <input
                type="email"
                placeholder="Escriba su correo electr&oacute;nico"
                name="correo"
                value={email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Escriba su contrase&ntilde;a"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <div className="linkmesass">
                <button
                  className="iniciar-sesion-vista__formulario__btn-log-in"
                  type="submit"
                >
                  INICIAR SESI&Oacute;N
                </button>
              </div>
            </div>
          </form>
          <a
            href="facebook.com"
            className="iniciar-sesion-vista__formulario__contrasena-olvidada"
          >
            ¿Ha olvidado su contrase&ntilde;a?
          </a>
          <Link to="/RegistroEstablecimiento">
            <a
              href="facebook.com"
              className="iniciar-sesion-vista__formulario__enlace-registro"
            >
              ¿No tienes cuenta? Clic aqu&iacute;
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;
