const { response } = require("express");

const Ruta = require("../models/rutas");
const App = require("../models/app");
const App_Ruta = require("../models/app-ruta");
const app = require("../models/app");

/**
 * AGREGAR NUEVAS
 */
//Nueva env (nombre-valor)
const nuevaENV = async (req, res = response) => {
  console.log("REQUEST: ", req.body);
  try {
    const ruta = new Ruta(req.body);

    await ruta.save((errBD) => {
      if (errBD) {
        return res.status(400).json({
          ok: false,
          msg: "Error en la BD (Mongo) no se pudo guardar la ruta",
        });
      }
    });

    res.json({
      ok: true,
      ruta,
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

//agregar app (nombre)
const nuevaAPP = async (req, res = response) => {
  console.log("REQUEST: ", req.body);
  try {
    const app = new App(req.body);
    await app.save((errBD) => {
      if (errBD) {
        return res.status(400).json({
          ok: false,
          msg: "Error en la BD (Mongo) no se pudo guardar la app",
        });
      }
    });
    res.json({
      ok: true,
      app,
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

//agregar relacion app con ruta (id_app-array[id_rutas])
const nuevaApp_Ruta = async (req, res = response) => {
  console.log("REQUEST: ", req.body);
  try {
    const app_ruta = new App_Ruta(req.body);
    await app_ruta.save((errBD) => {
      if (errBD) {
        return res.status(400).json({
          ok: false,
          msg: "Error en la BD (Mongo) no se pudo guardar la app_ruta",
        });
      }
    });
    res.json({
      ok: true,
      app_ruta,
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

/**
 * BUSCAR RUTAS
 */
//desplegar todas las app
const consultaAPPs = async (req, res = response) => {
  console.log("REQUEST: ", req.body);
  try {
    const apps = await App.find();
    if (!apps) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron App guardadas",
      });
    }
    res.json({
      ok: true,
      apps,
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

const consultaRutas = async (req, res = response) => {
  console.log("REQUEST: ", req.body);
  try {
    const rutas = await Ruta.find();
    if (!rutas) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron Rutas guardadas",
      });
    }
    res.json({
      ok: true,
      rutas,
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
  nuevaENV,
  nuevaAPP,
  nuevaApp_Ruta,
  consultaAPPs,
  consultaRutas,
};
