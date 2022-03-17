require("dotenv").config();

const express = require("express");
// const path = require('path');
const cors = require("cors");
const morgan = require("morgan"); //dev

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); //dev

require("./config/config").dbConnection();

app.use("/api/env", require("./routes/routes"));

app.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);
  console.log("Servidor corriendo en puerto", process.env.PORT);
});


//TODO: LISTA DE OBSERVACIONES A MEJORAR EN ESTA APP

//**1.si ya esta agregado una app con sus rutas y se quiere agregar mas rutas HACER UN METODO PARA QUE ACTUALIZAR (por que se agrega un nuevo)*/

//**2.si ya esta guardado una app y con su ruta (cualquier tipo) validar que ya no se agrege denuevo la misma ruta*/

//**3. para lña segunda app en que se va a utilizar arreglar lo de mostrar todas las app con sus rutas (ya esta pero solo se muestra ids) hacer que se muestren los nombres  */

//**4.(Referente al punto 3) que se muestre todo pero de igual manera que se pueda filtrar (app1/2/3/... y sus url solo de produccion/desarrollo,etc) */