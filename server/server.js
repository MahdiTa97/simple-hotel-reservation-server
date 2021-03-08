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
// ==============================
// ========>>✔ CRUD HOTEL<<========
// ==============================
const createHotel = (req, res, next) => {
  const { hotelNo, hotelName, city, hotelAddress } = req.body;
  console.log(
    `INSERT INTO hotel(hotelNo, hotelName, city, hotelAddress) VALUES ('${hotelNo}', '${hotelName}', '${city}, '${hotelAddress}')`
  );
  client
    .query(
      `INSERT INTO hotel(hotelNo, hotelName, city, hotelAddress) VALUES ('${hotelNo}', '${hotelName}', '${city}', '${hotelAddress}')`
    )
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};
// --------------------
const getHotels = async function (req, res, next) {
  const { rows } = await client.query(
    `SELECT * FROM hotel ${magicGen("WHERE", req.query)}`
  );
  res.status(200).send(rows);
};
// --------------------
const searchHotelsByName = async function (req, res, next) {
  const { hotelName } = req.query;
  const { rows } = await client.query(
    `SELECT * FROM hotel WHERE hotelName LIKE '%${hotelName}%'`
  );
  res.status(200).send(rows);
};
// --------------------
const updateHotel = (req, res, next) => {
  const { hotelNo, ...resProps } = req.body;
  client
    .query(
      `UPDATE hotel
        ${magicGen("SET", resProps)}
        WHERE
        hotelNo = '${hotelNo}'`
    )
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};
// --------------------
const deleteHotel = (req, res, next) => {
  client
    .query(
      `${magicGen("DELETE FROM hotel WHERE", { hotelNo: req.body.hotelNo })}`
    )
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};
// --------------------
app.post("/createhotel", createHotel);
app.get("/gethotels", getHotels);
app.get("/searchhotelsbyname", searchHotelsByName);
app.post("/updatehotel", updateHotel);
app.post("/deletehotel", deleteHotel);
// ==============================
// ========>>✔ CRUD ROOM<<========
// ==============================
const createRoom = (req, res, next) => {
  const {
    roomNo,
    hotelNo,
    roomType,
    roomPrice,
    roomStatus = "free",
  } = req.body;
  client
    .query(
      `INSERT INTO room(roomNo, hotelNo, roomType, roomPrice, roomStatus)	VALUES ('${roomNo}', '${hotelNo}, '${roomType}, '${roomPrice}, '${roomStatus}')`
    )
    .then((res) => next())
    .catch((err) => res.status(500).send(err));
};
// --------------------
const getRooms = async function (req, res, next) {
  const { rows } = await client.query(
    `SELECT * FROM room ${magicGen("WHERE", req.query)}`
  );
  res.status(200).send(rows);
};
// --------------------
const updateRoom = (req, res, next) => {
  const { roomNo, ...resProps } = req.body;
  client
    .query(
      `UPDATE room
        ${magicGen("SET", resProps)}
        WHERE
        roomNo = '${roomNo}'`
    )
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};
// --------------------
const deleteRoom = (req, res, next) => {
  client
    .query(`${magicGen("DELETE FROM room WHERE", { roomNo: req.body.roomNo })}`)
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};
// --------------------
app.post("/createroom", createRoom);
app.get("/getrooms", getRooms);
app.post("/updateroom", updateRoom);
app.post("/deleteroom", deleteRoom);
// ==============================
// ========>>✔ CRUD GUEST<<========
// ==============================
const createGuest = (req, res, next) => {
  const {
    guestSsn,
    guestFname,
    guestLname,
    guestAddress,
    guestBirthdate,
  } = req.body;
  client
    .query(
      `INSERT INTO guest(guestSsn, guestFname, guestLname, guestAddress, guestBirthdate)	VALUES ('${guestSsn}', '${guestFname}', '${guestLname}, '${guestAddress}', '${guestBirthdate}')`
    )
    .then((res) => next())
    .catch((err) => res.status(500).send(err));
};
// --------------------
const getGuests = async function (req, res, next) {
  const { rows } = await client.query(
    `SELECT * FROM guest ${magicGen("WHERE", req.query)}`
  );
  res.status(200).send(rows);
};
// --------------------
const updateGuest = (req, res, next) => {
  const { guestSsn, ...resProps } = req.body;
  client
    .query(
      `UPDATE guest
        ${magicGen("SET", resProps)}
        WHERE
        guestSsn = '${guestSsn}'`
    )
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};
// --------------------
const deleteGuest = (req, res, next) => {
  client
    .query(
      `${magicGen("DELETE FROM guest WHERE", { guestSsn: req.body.guestSsn })}`
    )
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};
// --------------------
app.get("/getguests", getGuests);
app.post("/createguest", createGuest);
app.post("/updateguest", updateGuest);
app.post("/deleteguest", deleteGuest);
// ==============================
// ========>>CRUD PAYMENT<<========
// ==============================
const createPayment = (req, res, next) => {
  const { paymentPrice, paymentType, paymentDate } = req.body;
  client
    .query(
      `INSERT INTO payment(paymentNo, paymentPrice, paymentType, paymentDate)	VALUES (uuid_generate_v4(), '${paymentPrice}, '${paymentType}, '${paymentDate})`
    )
    .then((res) => next())
    .catch((err) => res.status(500).send(err));
};
// --------------------
const getPayments = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM payment`);
  res.status(200).send(rows);
};
// --------------------
app.get("/getpayments", getPayments);
app.post("/createpayment", createPayment);

const createBooking = (req, res, next) => {
  const {
    hotelNo,
    guestSsn,
    dateIn,
    dateOut,
    roomNo,
    paymentNo = null,
    bookingStatus = "0",
  } = req.body;

  client
    .query(
      `INSERT INTO booking(hotelNo, guestSsn, dateIn, dateOut, roomNo, paymentNo, bookingStatus)	VALUES ('${hotelNo}', '${guestSsn}, '${dateIn}, '${dateOut}, '${roomNo}, '${paymentNo}, '${bookingStatus})`
    )
    .then((res) => next())
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
      `INSERT INTO personnel("pCode", "fName", "lName", pass, salary, "hotelName", side, "shiftWork", type)	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [pCode, fName, lName, pass, salary, hotelName, side, shiftWork, type]
    )
    .then((res) => next())
    .catch((err) => res.status(500).send(err));
};

// ========>>GET ALLS<<========

const getBookings = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM booking`);
  res.status(200).send(rows);
};

const getServants = async function (req, res, next) {
  const {
    rows,
  } = await client.query(`SELECT "pCode", "fName", "lName" FROM personnel
  WHERE type = 'servant'`);
  res.status(200).send(rows);
};

const getHotelPersonnels = async function (req, res, next) {
  const { type = "servant", hotelName } = req.query;
  const {
    rows,
  } = await client.query(`SELECT "pCode", "fName", "lName" FROM personnel
  WHERE type = '${type}'
  AND "hotelName" = (VALUES('${hotelName}'))`);
  res.status(200).send(rows);
};

const getCleanings = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM cleaning`);
  res.status(200).send(rows);
};

const getGuestTels = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM guesttel`);
  res.status(200).send(rows);
};

const getHotelTels = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM hoteltel`);
  res.status(200).send(rows);
};

const getPersonnelTels = async function (req, res, next) {
  const { rows } = await client.query(`SELECT * FROM personneltel`);
  res.status(200).send(rows);
};

const createCleaning = (req, res, next) => {
  const { pCode, roomId } = req.body;
  console.log(pCode, roomId);
  client
    .query(
      `INSERT INTO cleaning(id, "pCode", "roomId")	VALUES (uuid_generate_v4(), '${pCode}', '${roomId}')`
    )
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};

const createHotelTel = (req, res, next) => {
  const { hTel, hName } = req.body;
  client
    .query(
      `INSERT INTO hoteltel("hTel", "hName")	VALUES ('${hTel}', '${hName}')`
    )
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};

const createPersonnelTel = (req, res, next) => {
  const { pCode, pTel } = req.body;
  client
    .query(
      `INSERT INTO personneltel("pCode", "pTel")	VALUES ('${pCode}', '${pTel}')`
    )
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};

const createGuestTel = (req, res, next) => {
  const { gSsn, gTel } = req.body;
  client
    .query(`INSERT INTO guesttel("gSsn", "gTel")	VALUES ('${gSsn}', '${gTel}')`)
    .then((res) => res.status(200).send(res))
    .catch((err) => res.status(500).send(err));
};

// === === === HOTEL === === ===

// === === === ROOM === === ===

// === === === GUEST === === ===

// === === === PAYMENT === === ===

// === === === RESERVE === === ===
app.get("/getbookings", getBookings);
app.post("/createreserve", createBooking);

// ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----
// ---- ---- ---- ---- ----

// === === === CLEANING === === ===
app.get("/getcleanings", getCleanings);
app.post("/createcleaning", createCleaning);

// === === === GUEST TEL === === ===
app.get("/getguesttels", getGuestTels);
app.post("/createguesttel", createGuestTel);

// === === === HOTEL TEL === === ===
app.get("/gethoteltel", getHotelTels);
app.post("/createhoteltel", createHotelTel);

// === === === PERSONNEL === === ===
app.get("/gethotelpersonnels", getHotelPersonnels);
app.get("/getservants", getServants);
app.post("/createpersonnel", createPersonnel);

// === === === PERSONNEL TEL === === ===
app.get("/getpersonneltel", getPersonnelTels);
app.post("/createpersonneltel", createPersonnelTel);

app.get("/reset", reset);

function existUpdate(key, value, isLast = false) {
  return value ? `${key} = '${value}'${isLast ? "" : ","}` : "";
}

function magicGen(cond, params) {
  let query = Object.keys(params)
    .filter((k) => params[k] !== undefined)
    .map((k) => {
      if (params[k]) return k + "=" + `'${params[k]}'`;
      else return;
    })
    .join(",");
  if (query) return `${cond} ${query}`;
  else return "";
}

// =======================
// Creates

// CREATE SCHEMA "as"
//     AUTHORIZATION mahdi;
