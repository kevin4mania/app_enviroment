const { response } = require("express");

const Ruta = require("../models/rutas");
const App = require("../models/app");
const App_Ruta = require("../models/app-ruta");
const Perfil_ruta = require("../models/perfil-ruta");

const { Types } = require("mongoose");
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
      res.status(500).json({
        ok: false,
        msg: "Hable con el administrador",
      });
    }
  }
};

//agregar nuevo perfil de ruta
const nuevoPerfil_ruta = async (req, res = response) => {
  console.log("REQUEST: ", req.body);
  try {
    const perfil_ruta = new Perfil_ruta(req.body);
    await perfil_ruta.save((errBD) => {
      if (errBD) {
        return res.status(400).json({
          ok: false,
          msg: "Error en la BD (Mongo) no se pudo guardar el perfil ruta",
        });
      }
    });
    res.json({
      ok: true,
      perfil_ruta,
    });
  } catch (error) {
    if (error) {
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
  // console.log("REQUEST: ", req.body);
  try {
    const apps = await App.find();
    if (!apps || apps.length == 0) {
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
      res.status(500).json({
        ok: false,
        msg: "Hable con el administrador",
      });
    }
  }
};
//desplegar todas las rutas
const consultaRutas = async (req, res = response) => {
  console.log("REQUEST: ", req.body);
  try {
    const rutas = await Ruta.find();
    if (!rutas || rutas.length == 0) {
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
      res.status(500).json({
        ok: false,
        msg: "Hable con el administrador",
      });
    }
  }
};
//desplegar todos los perfiles de rutas
const consultaPerfil_rutas = async (req, res = response) => {
  console.log("REQUEST: ", req.body);
  try {
    const perfil_rutas = await Perfil_ruta.find();
    if (!perfil_rutas || perfil_rutas.length == 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron perfiles rutas guardadas",
      });
    }
    res.json({
      ok: true,
      perfil_rutas,
    });
  } catch (error) {
    if (error) {
      res.status(500).json({
        ok: false,
        msg: "Hable con el administrador",
      });
    }
  }
};

//desplegar rutas por tipo
const consultaRuta = async (req, res = response) => {
  try {
    const rutas = await Ruta.find({ tipo: Types.ObjectId(req.params.id) });
    console.log(rutas);
    console.log(rutas == []);

    if (!rutas || rutas.length == 0) {
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
      res.status(500).json({
        ok: false,
        msg: "Hable con el administrador",
      });
    }
  }
};

//desplegar aplicaciones-ruta
//TODO arreglar para que responda con todo el objeto no solo con los idss
/**
 * 1.posible solucion cambiar el (forEach) por el (for of)
 * 2.Probar como lo de app-ruta por idApp y idTipo con el (if continue)
 * 
 */
const consultaApp_rutas = async (req, res = response) => {
  try {
    const app_ruta = await App_Ruta.find();
    if (!app_ruta || app_ruta.length == 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron aplicaciones con rutas",
      });
    }

    await app_ruta.forEach(async (resApp) => {
      await resApp.id_urls.forEach(async (resENV) => {
        const rrr3 = await resultadosConsulta(Ruta, resENV.id);
        console.log("ENVIROMENT--> ", rrr3[0].nombre);
      });
      const rrr = await resultadosConsulta(App, resApp.id_APP.valueOf());
      console.log("APLICACIONES: ", rrr[0].nombre);
    });

    await res.json({
      ok: true,
      app_ruta,
    });
  } catch (error) {
    if (error) {
      res.status(500).json({
        ok: false,
        msg: "Hable con el administrador",
      });
    }
  }
};

let resultadosConsulta = async (esquema, id) => {
  return (aplicaciones = await esquema.find({
    _id: Types.ObjectId(id),
  }));
};

const consultaApp_rutaID = async (req, res = response) => {
  //console.log(req.params.id);
  try {
    const app_ruta = await App_Ruta.find({
      id_APP: Types.ObjectId(req.params.id),
    });
    //console.log("RESPUESTA RUTA-> ", app_ruta);
    if (!app_ruta || app_ruta.length == 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron Rutas guardadas",
      });
    }
    let urls = [];
    //console.log("IDAPP->", app_ruta[0].id_APP.valueOf());
    const nombreApp = await App.find({
      _id: Types.ObjectId(app_ruta[0].id_APP.valueOf()),
    });
    //console.log(nombreApp[0].nombre);
    for (let item of app_ruta[0].id_urls) {
      const url = await Ruta.find({ _id: Types.ObjectId(item.id) });
      urls.push({
        nombre: url[0].nombre,
        valor: url[0].valor,
      });
    }
    res.json({
      ok: true,
      nombreAPP: nombreApp[0].nombre,
      urls,
    });
  } catch (error) {
    if (error) {
      res.status(500).json({
        ok: false,
        msg: "Hable con el administrador",
        error,
      });
    }
  }
};
/**
 * Busqueda de apliacion filtrnado la app con id y que tipos de env (igual con id)
 */
/*
const obtener_ruta_tipo = async (vecRutas, tipo) => {
  let urls = [];
  for (let item of vecRutas) {
    console.log(`Buscar RUTA id:${item.id} tipo:${tipo} -->${typeof tipo}`);
    const url = await Ruta.find({
      _id: Types.ObjectId(item.id),
      tipo: Types.ObjectId(tipo),
    });
    console.log("****___>", url);
    if (!url || url.length == 0) {
      console.log(`no se encontro`);
      continue;
    }
    //console.log(`RESPUESTA CONSULTA->${url}`);
    console.log(`Nombre: ${url[0].nombre} valor: ${url[0].valor}`);
    urls.push({
      nombre: url[0].nombre,
      valor: url[0].valor,
    });
  }
  return urls;
};
*/
const consultaApp_rutaID_TIPO = async (req, res = response) => {
  const { id, tipo } = req.params;
  // console.log("ID-> ", id);
  // console.log("TIPO-> ", tipo);
  try {
    const app_ruta = await App_Ruta.find({
      id_APP: Types.ObjectId(id),
    });
    if (!app_ruta || app_ruta.length == 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron Rutas guardadas",
      });
    }
    const nombreApp = await App.find({
      _id: Types.ObjectId(app_ruta[0].id_APP.valueOf()),
    });
    //console.log(nombreApp[0].nombre);
    let urls = [];
    for (let item of app_ruta[0].id_urls) {
      //console.log(`Buscar RUTA id:${item.id} tipo:${tipo} -->${typeof tipo}`);
      const url = await Ruta.find({
        _id: Types.ObjectId(item.id),
        tipo: Types.ObjectId(tipo),
      });
      if (!url || url.length == 0) {
        continue;
      }
      urls.push({
        nombre: url[0].nombre,
        valor: url[0].valor,
      });
    }
    res.json({
      ok: true,
      nombreAPP: nombreApp[0].nombre,
      urls,
    });
  } catch (error) {
    if (error) {
      res.status(500).json({
        ok: false,
        msg: "Hable con el administrador",
        error,
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
  nuevoPerfil_ruta,
  consultaPerfil_rutas,
  consultaRuta,
  consultaApp_rutas,
  consultaApp_rutaID,
  consultaApp_rutaID_TIPO,
};
