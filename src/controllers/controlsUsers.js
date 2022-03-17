const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuarios");
const { generarJWT } = require("../helpers/jwt");


const saludo = (req = response, res = response) => {
  res.json({
    ok: true,
    msg: "Hola ...",
  });
};

const nuevoUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    console.log("REQUEST: ", req.body);
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }
    const salt = bcrypt.genSaltSync();
    const usuario = new Usuario(req.body);
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save((errBD) => {
      if (errBD) {
        return res.status(400).json({
          ok: false,
          msg: "Error en la BD (Mongo) no se pudo guardar el usuario",
        });
      }
    });

    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña no es valida",
      });
    }

    const token = await generarJWT(usuarioDB.id);
    res.json({
      ok: true,
      usuario: usuarioDB,
      token,
    });
  } catch (error) {
    if (error) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: "Hable con el administrador",
      });
    }
  }
};

module.exports = {
  saludo,
  nuevoUsuario,
  loginUsuario,
};
