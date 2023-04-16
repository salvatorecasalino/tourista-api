const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require('dotenv').config();


var months = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
let today = new Date().toISOString().slice(0, 10);

//Connection to DB
function handleDisconnect() {
  connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    charset: "utf8mb4",
  });

  connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 1000);
    }
  });

  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

app.use(express.static(__dirname + "/public/html"));

const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/html/cover.html"));
});

app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);

module.exports = app;

app.listen(PORT, () => console.log("SERVER RUNNING ON PORT: " + PORT));
