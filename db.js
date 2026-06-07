const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Avk@5353",
  database: "store_rating"
});

connection.connect((err) => {
  if (err) {
    console.log("Database Connection Failed");
    return;
  }
  console.log("Database Connected");
});

module.exports = connection;