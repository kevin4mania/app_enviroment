const { Schema, model } = require("mongoose");
// let App = model("App");

const app_rutaSchema = new Schema({
  id_APP: {
    type: Schema.ObjectId,
    ref: "App",
    require: true,
  },
  id_urls: {
    type: Array,
    default: [],
    require: true,
  },
});

module.exports = model("App_Ruta", app_rutaSchema);
