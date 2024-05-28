import ".././styles/home.css";
import NotasMusicalesQuenas from ".././assets/images/NotasMusicalesQuenas.png";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BloqueImgHome = () => {
  return (
    <div className="bloque-img-home">
      <div
        style={{ maxWidth: "100%", overflow: "hidden" }}
        fluid
        className="bg-dark py-4"
      >
        <Row className="justify-content-center">
          <Col xs={10} md={5} className="text-center mb-4">
            <div className="bloque-img-home__tocar-Guitarra"></div>
          </Col>
          <Col
            xs={10}
            md={5}
            className="mb-4 d-flex"
            style={{
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h2 className="bloque-img-home__titulos">Personaliza la música</h2>
            <img
              src={NotasMusicalesQuenas}
              alt="Notas musicales pequeñas"
              className="bloque-img-home__notas-musicales-pequenas"
            ></img>
            <p className="bloque-img-home__texto-general">
              Agrega tus canciones favoritas a la lista de reproducción y crea
              una experiencia única.
            </p>
          </Col>
        </Row>

        <div className="bloque-img-home__row2-desktop">
          <Row className="justify-content-center">
            <Col
              xs={10}
              md={5}
              className="mb-4 d-flex "
              style={{
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <p className="bloque-img-home__texto-general">
                BARES Y RESTAURANTES
              </p>
              <h2 className="bloque-img-home__titulos">
                Revoluciona tu Experiencia
              </h2>
              <p className="bloque-img-home__texto-general">
                Permite a tus clientes ser DJ's por una noche
              </p>
              <div>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/RegistroEstablecimiento"
                >
                  <button
                    type="button"
                    className="bloque-img-home__btn-descrubrelo"
                  >
                    DESC&Uacute;BRELO
                  </button>
                </Link>
              </div>
            </Col>
            <Col xs={10} md={5} className="text-center">
              <div className="bloque-img-home__home-dj"></div>
            </Col>
          </Row>
        </div>
        <div className="bloque-img-home__row3-mobile">
          <Row className="justify-content-center">
            <Col xs={10} md={5} className="text-center">
              <div className="bloque-img-home__home-dj"></div>
            </Col>
            <Col
              xs={10}
              md={5}
              className="mb-4 d-flex "
              style={{
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <p className="bloque-img-home__texto-general">
                BARES Y RESTAURANTES
              </p>
              <h2 className="bloque-img-home__titulos">
                Revoluciona tu Experiencia
              </h2>
              <p className="bloque-img-home__texto-general">
                Permite a tus clientes ser DJ's por una noche
              </p>
              <div>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/RegistroEstablecimiento"
                >
                  <button
                    type="button"
                    className="bloque-img-home__btn-descrubrelo"
                  >
                    DESC&Uacute;BRELO
                  </button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default BloqueImgHome;
