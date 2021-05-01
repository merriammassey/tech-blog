// import the Sequelize constructor from the library
const Sequelize = require("sequelize");

//import the base Sequelize class and create a new connection to the database
const sequelize = new Sequelize(
  "tech_blog_db",
  "root",
  "mysqlPassword1",
  //process.env.DB_NAME,
  //process.env.DB_USER,
  //process.env.DB_PW,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = sequelize;
