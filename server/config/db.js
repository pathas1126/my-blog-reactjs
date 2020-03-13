const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "111111",
  database: "blog"
});

module.exports = db;
