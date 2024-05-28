import ".././styles/Footer.css";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-sitio">
      <div className="container">
        <div className="row">
          <h3 className="footer-sitio__titulo">CONT&Aacute;CTANOS</h3>

          <div className="columnas">
            <div>
              <h4>Servicios</h4>
              <ul>
                <li>Personalizaci&oacute;n del ambiente musical.</li>
                <li>Retroalimentación del usuario.</li>
              </ul>
            </div>

            <div>
              <h4>S&iacute;guenos</h4>

              <div className="row">
                <div className="social-media">
                  <a
                    style={{
                      color: "white",
                    }}
                    href="https://www.instagram.com/"
                  >
                    <FaInstagram />
                  </a>

                  <a
                    style={{
                      color: "white",
                    }}
                    href="https://www.whatsapp.com/"
                  >
                    <FaWhatsapp />
                  </a>

                  <a
                    style={{
                      color: "white",
                    }}
                    href="https://www.facebook.com/"
                  >
                    <FaFacebookF />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4>Nosotros</h4>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p className="textCenter textWhite">
            &copy;2024 Jukebox Music Company. Reservados todos los derechos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
