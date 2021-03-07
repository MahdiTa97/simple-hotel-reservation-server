const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

const PORT = process.env.PORT || 5000;

app.set("port", PORT);

app.listen(PORT, function () {
  console.log(`server started on port ${PORT}`);
});

const { Client } = require("pg");
const { createTableText, dropTable } = require("./DB/index");

const connectionString =
  "postgres://xepmtxkk:fxCG378qO0qSmIP4KhGbMeM3w3crc1Iz@ziggy.db.elephantsql.com:5432/xepmtxkk";
const client = new Client({
  connectionString: connectionString,
});

client.connect();

const reset = async function (req, res, next) {
  await client.query(dropTable);
  await client.query(createTableText);
  res.status(200).send();
};

const createHotel = (req, res, next) => {
  const { name, sum, city, street, ave } = req.body;

  client
    .query(
      `INSERT INTO hotel.hotel(name, sum, city, street, ave)	VALUES ($1, $2, $3, $4, $5)`,
      [name, sum, city, street, ave]
    )
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};

const createPersonnel = (req, res, next) => {
  const {
    pCode,
    fName,
    lName,
    pass,
    salary,
    hotelName,
    side,
    shiftWork,
    type,
  } = req.body;

  client
    .query(
      `INSERT INTO hotel.personnel("pCode", "fName", "lName", pass, salary, "hotelName", side, "shiftWork", type)	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [pCode, fName, lName, pass, salary, hotelName, side, shiftWork, type]
    )
    .then((res) => next())
    .catch((err) => res.status(500).send(err));
};

const createRoom = (req, res, next) => {
  const { id, type, cost, bedNumber, floor, hotelName } = req.body;

  client
    .query(
      `INSERT INTO hotel.room(id, type, cost, "bedNumber", floor, "hotelName")	VALUES ($1, $2, $3, $4, $5, $6)`,
      ["uuid_generate_v4()", type, cost, bedNumber, floor, hotelName]
    )
    .then((res) => next())
    .catch((err) => res.status(500).send(err));
};

const createGuest = (req, res, next) => {
  const { ssn, email, bDate, Fname, Lname } = req.body;

  client
    .query(
      `INSERT INTO hotel.guest(ssn, email, "bDate", "Fname", "Lname")	VALUES ($1, $2, $3, $4, $5)`,
      [ssn, email, bDate, Fname, Lname]
    )
    .then((res) => next())
    .catch((err) => res.status(500).send(err));
};

const createPayment = (req, res, next) => {
  const { id, cost, type, date } = req.body;

  client
    .query(
      `INSERT INTO hotel.payment(id, cost, type, date)	VALUES ($1, $2, $3, $4)`,
      ["uuid_generate_v4()", cost, type, date]
    )
    .then((res) => next())
    .catch((err) => res.status(500).send(err));
};

const createReserve = (req, res, next) => {
  const {
    id,
    roomId,
    gSsn,
    payId,
    duration,
    reserveDate,
    gCount,
    hName,
    status = 0,
  } = req.body;

  client
    .query(
      `INSERT INTO hotel.room(id, "roomId", "gSsn", "payId", duration, "reserveDate", "gCount", "hName", status)	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        "uuid_generate_v4()",
        id,
        roomId,
        gSsn,
        payId,
        duration,
        reserveDate,
        gCount,
        hName,
        status,
      ]
    )
    .then((res) => next())
    .catch((err) => res.status(500).send(err));
};

const getHotels = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM hotel.hotel`);
  res.status(200).send(rows);
};

const getServants = async function (req, res, next) {
  const {
    rows,
  } = await client.query(`SELECT "pCode", "fName", "lName" FROM hotel.personnel
  WHERE type = 'servant'`);
  res.status(200).send(rows);
};

const getHotelPersonnel = async function (req, res, next) {
  const { type = "servant", hotelName } = req.query;
  const {
    rows,
  } = await client.query(`SELECT "pCode", "fName", "lName" FROM hotel.personnel
  WHERE type = '${type}'
  AND "hotelName" = (VALUES('${hotelName}'))`);
  res.status(200).send(rows);
};

const getHotelRoom = async function (req, res, next) {
  const { hotelName } = req.query;
  const { rows } = await client.query(`SELECT * FROM hotel.room
  WHERE "hotelName" = (VALUES('${hotelName}'))`);
  res.status(200).send(rows);
};

const getRoom = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM hotel.room`);
  res.status(200).send(rows);
};

const getCleaning = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM hotel.cleaning`);
  res.status(200).send(rows);
};

const getGuest = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM hotel.guest`);
  res.status(200).send(rows);
};

const getGuestTel = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM hotel.guesttel`);
  res.status(200).send(rows);
};

const getHotelTel = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM hotel.hoteltel`);
  res.status(200).send(rows);
};

const getPayment = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM hotel.hoteltel`);
  res.status(200).send(rows);
};

const getPersonnelTel = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM hotel.personneltel`);
  res.status(200).send(rows);
};

const getReserve = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM hotel.reserve`);
  res.status(200).send(rows);
};

const createCleaning = (req, res, next) => {
  const { pCode, roomId } = req.body;
  console.log(pCode, roomId);
  client
    .query(
      `INSERT INTO hotel.cleaning(id, "pCode", "roomId")	VALUES (uuid_generate_v4(), '${pCode}', '${roomId}')`
    )
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};

const createHotelTel = (req, res, next) => {
  const { hTel, hName } = req.body;
  client
    .query(
      `INSERT INTO hotel.hoteltel("hTel", "hName")	VALUES ('${hTel}', '${hName}')`
    )
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};

const createPersonnelTel = (req, res, next) => {
  const { pCode, pTel } = req.body;
  client
    .query(
      `INSERT INTO hotel.personneltel("pCode", "pTel")	VALUES ('${pCode}', '${pTel}')`
    )
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};

const createGuestTel = (req, res, next) => {
  const { gSsn, gTel } = req.body;
  client
    .query(
      `INSERT INTO hotel.guesttel("gSsn", "gTel")	VALUES ('${gSsn}', '${gTel}')`
    )
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};

// === === === CLEANING === === ===
app.get("/getcleaning", getCleaning);
app.post("/createcleaning", createCleaning);

// === === === GUEST === === ===
app.get("/getguest", getGuest);
app.post("/createguest", createGuest);

// === === === GUEST TEL === === ===
app.get("/getguesttel", getGuestTel);
app.post("/createguesttel", createGuestTel);

// === === === HOTEL === === ===
app.get("/gethotels", getHotels);
app.post("/createhotel", createHotel);

// === === === HOTEL TEL === === ===
app.get("/gethoteltel", getHotelTel);
app.post("/createhoteltel", createHotelTel);

// === === === PAYMENT === === ===
app.get("/getpayment", getPayment);
app.post("/createpayment", createPayment);

// === === === PERSONNEL === === ===
app.get("/gethotelpersonnel", getHotelPersonnel);
app.get("/getservants", getServants);
app.post("/createpersonnel", createPersonnel);

// === === === PERSONNEL TEL === === ===
app.get("/getpersonneltel", getPersonnelTel);
app.post("/createpersonneltel", createPersonnelTel);

// === === === RESERVE === === ===
app.get("/getreserve", getReserve);
app.post("/createreserve", createReserve);

// === === === ROOM === === ===
app.get("/getroom", getRoom);
app.get("/gethotelroom", getHotelRoom);
app.post("/createroom", createRoom);

app.get("/reset", reset);

// =======================
// Creates

// CREATE SCHEMA "as"
//     AUTHORIZATION mahdi;
