const passport = require("passport");
const establecimiento_controller = require("../controllers/establecimiento_controller");
const VerifyEstablecimiento = require("../../middlewares/VerifyEstablecimiento");
const { body } = require("express-validator");
module.exports = (app) => {
  app.get(
    "/api/v1/establecimiento/getEstablecimientolistar",
    establecimiento_controller.getEstablecimientolistar
  );
  app.get(
    "/api/v1/establecimiento/:id/clientes",
    establecimiento_controller.getClientesByEstablecimiento
  );
  app.post(
    "/api/v1/establecimiento/seleccionar",
    establecimiento_controller.EstablecimientoSele
  );
  app.delete(
    "/api/v1/establecimiento/clientes/:id",
    establecimiento_controller.eliminarcliente
  );

  app.get(
    "/api/v1/establecimiento/getEstablecimiento",
    establecimiento_controller.getEstablecimiento
  );

  app.get(
    "/api/v1/establecimiento/:id/mesas",
    establecimiento_controller.getMesasEstablecimiento
  );

  app.put(
    "/api/v1/establecimiento/putEstablecimientomesa/:id",
    establecimiento_controller.putEstablecimientomesa
  );

  app.get(
    "/api/v1/establecimiento/getEstablecimientoQR/:_id",
    establecimiento_controller.getEstablecimientoById
  );

  app.post(
    "/api/v1/establecimiento/postEstablecimiento",
    [
      body("email", "Ingrese un email valido")
        .trim()
        .isEmail()
        .normalizeEmail(),
    ],
    establecimiento_controller.postEstablecimiento
  );
  app.put(
    "/api/v1establecimiento/putEstablecimiento",
    establecimiento_controller.putEstablecimiento
  );
  app.delete(
    "/api/v1/establecimiento/delete/:nombre",
    establecimiento_controller.deleteEstablecimiento
  );
  app.post(
    "/api/v1/establecimiento/LoginEstablecimiento",
    establecimiento_controller.LoginEstablecimiento
  );
};
