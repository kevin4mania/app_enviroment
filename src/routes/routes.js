const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarCampos,
  validarJWT,
} = require("../middlewares/validarCamposUsuario");
const {
  saludo,
  nuevoUsuario,
  loginUsuario,
} = require("../controllers/controlsUsers");
const {
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
  consultaApp_rutaID_TIPOS,
} = require("../controllers/controlsEnviroments");

const router = Router();

/**
 * USUARIO
 */
router.post(
  "/nuevoUsuario",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    validarCampos,
  ],
  nuevoUsuario
);

router.post(
  "/loginUsuario",
  [
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    validarCampos,
  ],
  loginUsuario
);
/**
 * RUTAS
 */
router.post(
  "/nuevaRuta",
  [
    check("nombre", "el nombre de la ruta es obligatorio").not().isEmpty(),
    check("valor", "La direccion URL es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  nuevaENV
);

router.post(
  "/nuevaApp",
  [
    check("nombre", "el nombre de la aplicacion es obligatorio")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  nuevaAPP
);

router.post(
  "/nuevoPeril_ruta",
  [
    check("nombre", "el nombre del perfil ruta es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  nuevoPerfil_ruta
);

/**
 * RELACION APP-RUTA
 */
router.post(
  "/nuevaApp_Ruta",
  [
    check("id_APP", "el id de la app es obligatorio").not().isEmpty(),
    check("id_urls", "el id de las URLs es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  nuevaApp_Ruta
);

/**
 * Consultas
 */
//router.get("/saludo", saludo);
router.get("/getAPPs", consultaAPPs);
router.get("/getRutas", consultaRutas);
router.get("/getPerfil_Rutas", consultaPerfil_rutas);
router.get("/getRuta/:id", consultaRuta);
router.get("/getApp_rutas", consultaApp_rutas);
router.get("/getApp_rutaID/:id", consultaApp_rutaID);
router.get("/getApp_ruta_ID_TIPO/:id/:tipo", consultaApp_rutaID_TIPO);

router.post(
  "/getApp_ruta_ID_TIPOS",
  [
    check("id_APP", "el id de la app es obligatorio").not().isEmpty(),
    check("id_tipos", "el vector con los tipos de consulta es obligatorio ")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  consultaApp_rutaID_TIPOS
);

module.exports = router;
