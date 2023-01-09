// para conectarnos a una base de datos, primero debes crear una instancia
// de Sequelize
const { Sequelize } = require("sequelize");
// en la creación de la instancia pasamos los parámetros de configuración
const db = new Sequelize({
  database: "tasks_db", // nombre de la base de datos en donde realizarás tu conexión 
  username: "postgres", // nombre del usuario propietario de la base de datos
  host: "localhost", // el host donde se encuentra tu base de datos
  port: 5432, // el puerto de conexión a tu base de datos (puede ser igual 5433)
  password: "root", // la contraseña del usuario en postgres
  dialect: "postgres", // el dialecto de la base de datos que estamos usando
});

// finalmente exportamos la instancia hecha en la variable db
module.exports = db;