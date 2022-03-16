const { Schema, model } = require("mongoose");
// let PerfilRuta = model("PerfilRuta");

const RutasSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  valor: {
    type: String,
    require: true,
  },
  tipo: {
    type: Schema.ObjectId,
    ref: "PerfilRuta",
    require: true,
  },
});

module.exports = model("Ruta", RutasSchema);
