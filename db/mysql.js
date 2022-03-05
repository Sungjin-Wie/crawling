require("dotenv").config();

var mysql = require("mysql2");
var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

const query = async (...args) => await connection.promise().query(...args);

module.exports = query;
