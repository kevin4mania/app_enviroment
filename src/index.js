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
