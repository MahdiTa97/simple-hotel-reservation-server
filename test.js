const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const Knex = require("knex");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.set("port", process.env.PORT || 4000);

app.listen(4000, function () {
  console.log("Server is running.. on Port 4000");
});

const pg = require("knex")({
  client: "pg",
  connection: "postgres://mahdi:1234@localhost:5432/db981",
  searchPath: ["knex", "public"],
}).withSchema("hotel");

app.get("/reset", async function (req, res, next) {
  // pg.select()
  //   .from("hotel")
  //   .then((response) => res.status(200).send(response))
  //   .catch((err) => res.status(500).send(err));
});
