const { Schema, model } = require("mongoose");
// TODO poner un campo "TIPO" para identificar si es una ruta de produccion o desarrollo
const RutasSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  valor: {
    type: String,
    require: true,
  },
});

module.exports = model("Ruta", RutasSchema);
