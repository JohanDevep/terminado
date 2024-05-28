const user_controller = require("../controllers/user_controller");
const { body } = require("express-validator");
module.exports = (app) => {
  app.get("/api/v1/usuario/geUsers", user_controller.GetUser);
  app.post(
    "/api/v1/usuario/postUsers",
    [
      body("usuario", "Ingrese un nombre de usuario valido")
        .trim()
        .notEmpty()
        .escape(),
    ],
    user_controller.postUser,
    user_controller.SetCookie
  );
  app.put("/api/v1/usuario/EditUsers", user_controller.putUser);
  app.delete("/api/v1/usuario/delete/:user", user_controller.deleteUser);
  app.post("/api/v1/usuario/LoginUser", user_controller.loginUser);
};
