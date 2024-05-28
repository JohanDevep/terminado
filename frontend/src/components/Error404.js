import { Helmet } from "react-helmet";
import ".././styles/Error404.css";
import { Link } from "react-router-dom";
function Error404() {
  return (
    <div className="Error404-view">
      <Helmet>
        <title>P&aacute;gina No Encontrada | Jukebox</title>
      </Helmet>
      <h2 className="Error404-view__titulo">
        ¡NO PUDIMOS ENCONTRAR LA P&Aacute;GINA!
      </h2>
      <div className="Error404-view__WhiteAnimatedJukeboxOnFire"></div>
      <Link style={{ textDecoration: "none" }} to="/">
        <button class="Error404-view__btn-regresar-pushable" role="button">
          <span class="Error404-view__btn-regresar-shadow"></span>
          <span class="Error404-view__btn-regresar-edge"></span>
          <span class="Error404-view__btn-regresar-front text">
            &#8592; VOLVER A LA P&Aacute;GINA PRINCIPAL
          </span>
        </button>
      </Link>
    </div>
  );
}

export default Error404;
