const User = require("../models/User");
const { validationResult, body } = require("express-validator");
// const { nanoid } = require("nanoid")
const cookieParser = require("cookie-parser");
const { signToken } = require("./Authentication");
const jwt = require("jsonwebtoken");
const { Mongoose, default: mongoose } = require("mongoose");

module.exports = {
  //funcion de listar usuario
  GetUser(req, res) {
    let query = User.find()
      .then((users) => res.status(200).json({ users }))
      .catch((err) =>
        res.status(500).json({ msg: "Hubo un error al consultar" })
      );
  },
  //funcion asincrona para registrar un usuario
  // Función asincrónica para registrar un usuario
  async postUser(req, res) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    const { usuario, role } = req.body;
    try {
      let user = await User.findOne({ usuario: usuario });
      if (user)
        return res.status(400).json({
          status: "error",
          message: "Usuario ya existe",
        });
      user = new User({ usuario, role });
      await user.save();
      return res.status(201).send({
        status: "success",
        message: "Usuario registrado",
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  //funcion para editar el usuario
  putUser(req, res) {
    const { usuario } = req.body;
    const { id } = req.params;

    const user = {
      usuario,
    };

    User.findOneAndUpdate({ _id: id }, user)
      .then(() => res.status(200).json({ msg: "Usuario modificado" }))
      .catch((err) => res.status(500).json({ msg: err }));
  },
  //funcion para eliminar el usuario registrado
  deleteUser(req, res) {
    const { id } = req.params;

    User.findByIdAndDelete(id)
      .then(() => res.status(200).json({ msg: "Usuario eliminado" }))
      .catch((err) =>
        res.status(500).json({ msg: "Error al eliminar el usuario" })
      );
  },
  //funcion para que el usuario se loguee y cree una sesion
  
  async loginUser(req, res) {
    const { usuario } = req.body;
    try {
      const user = await User.findOne({ usuario });
      if (!user) throw new Error("Este usuario no existe");
      const token = jwt.sign(
        { id: user.id, usuario: user.usuario },
        "jwt_token",
        { expiresIn: "1h" }
      );
      res.status(200).json({usuario: user.usuario, role: user.role, token });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  SetCookie(req, res) {
    let query = User.findOne(usuario);
    res.cookieParser(usuario, "user cookie", {
      httpOnly: true,
      sameSite: "strict",
    });
  },
};
