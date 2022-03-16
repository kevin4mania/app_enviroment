const mongoose = require("mongoose");

const dbConnection = async () => {
  console.log(process.env.DB_KR);
  // process.env.DB_CNN
  try {
    await mongoose.connect(process.env.DB_KR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
    });
    console.log("DB Online...");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos - Hable con el admin");
  }
};

module.exports = {
  dbConnection,
};
