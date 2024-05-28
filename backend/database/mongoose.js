let mongoose = require("mongoose");

const mongoConnection = () => {
  const username = encodeURIComponent("devmongodb");
  const password = encodeURIComponent("kilo$fet.2024*");

  //Utilizar sólo al trabajar localmente y comentar la de despliegue a prod.
  const uri = `mongodb://${username}:${password}@74.207.225.155:27017/JukeBox_DB?authSource=admin`;

  //Se utiliza para despliegue a prod.
  //const uri = `mongodb://${username}:${password}@mongodb:27017/JukeBox_DB?authSource=admin`;

  mongoose
    .connect(uri)
    .then(() => {
      console.log("se ha conectado a la base del proyecto JUKEBOX");
    })
    .catch((err) => {
      console.log("no se puedeconectar a la base del proyecto", err);
    });
};

module.exports = { mongoConnection };
