const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOptions = require("./swagger");
const { SwaggerTheme } = require('swagger-themes');
const theme = new SwaggerTheme('v3');


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

const usersRoutes = require("./routes/users");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/html/cover.html"));
});

app.use("/api/users", usersRoutes);

// Creazione di uno Swagger JSDoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const options = {
  explorer: true,
  customCss: theme.getBuffer('feeling-blue'),
  customSiteTitle: "Tourista API",
  // customfavIcon: "../public/html/logo.png"
};

// Middleware per servire la documentazione Swagger UI
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));

module.exports = app;

app.listen(PORT, () => console.log("SERVER RUNNING ON PORT: " + PORT));
