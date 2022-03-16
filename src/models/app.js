const { Schema, model } = require("mongoose");

const AppSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
});

module.exports = model("App", AppSchema);
