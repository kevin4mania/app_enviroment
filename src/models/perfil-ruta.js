const { Schema, model } = require("mongoose");

const perfil_rutaSchema = new Schema({
  nombre: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = model("PerfilRuta", perfil_rutaSchema);
