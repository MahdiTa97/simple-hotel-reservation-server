const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const { createTableText, dropTable } = require("./DB/index");
const { magicGen } = require("./utils/magicGen");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const connectionString =
  "postgres://xepmtxkk:fxCG378qO0qSmIP4KhGbMeM3w3crc1Iz@ziggy.db.elephantsql.com:5432/xepmtxkk";
const client = new Client({
  connectionString: connectionString,
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set("port", PORT);
app.listen(PORT, function () {
  console.log(`server started on port ${PORT}`);
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
  client
    .query(
      `INSERT INTO hotel(hotelNo, hotelName, city, hotelAddress) VALUES ('${hotelNo}', '${hotelName}', '${city}', '${hotelAddress}')`
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};
// --------------------
const getHotels = async function (req, res, next) {
  const { rows } = await client.query(
    `SELECT * FROM hotel ${magicGen("WHERE", req.query, "AND")}`
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
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};
// --------------------
const deleteHotel = (req, res, next) => {
  client
    .query(
      `${magicGen(
        "DELETE FROM hotel WHERE",
        { hotelNo: req.body.hotelNo },
        "AND"
      )}`
    )
    .then((response) => res.status(200).send(response))
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
      `INSERT INTO room(roomNo, hotelNo, roomType, roomPrice, roomStatus)	VALUES (${roomNo}, '${hotelNo}', '${roomType}', ${roomPrice}, '${roomStatus}')`
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};
// --------------------
const getRooms = async function (req, res, next) {
  const { rows } = await client.query(
    `SELECT * FROM room ${magicGen("WHERE", req.query, "AND")}`
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
        roomNo = ${roomNo}`
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};
// --------------------
const deleteRoom = (req, res, next) => {
  client
    .query(
      `${magicGen(
        "DELETE FROM room WHERE",
        {
          roomNo: req.body.roomNo,
          hotelNo: req.body.hotelNo,
        },
        "AND"
      )}`
    )
    .then((response) => res.status(200).send(response))
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
      `INSERT INTO guest(guestSsn, guestFname, guestLname, guestAddress, guestBirthdate)	VALUES ('${guestSsn}', '${guestFname}', '${guestLname}', '${guestAddress}', '${guestBirthdate}')`
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};
// --------------------
const getGuests = async function (req, res, next) {
  const { rows } = await client.query(
    `SELECT * FROM guest ${magicGen("WHERE", req.query, "AND")}`
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
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};
// --------------------
const deleteGuest = (req, res, next) => {
  client
    .query(
      `${magicGen(
        "DELETE FROM guest WHERE",
        { guestSsn: req.body.guestSsn },
        "AND"
      )}`
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};
// --------------------
app.get("/getguests", getGuests);
app.post("/createguest", createGuest);
app.post("/updateguest", updateGuest);
app.post("/deleteguest", deleteGuest);
// ==============================
// ========>>✔ CRUD PAYMENT<<========
// ==============================
const createPayment = (req, res, next) => {
  const { paymentPrice, paymentType, paymentDate } = req.body;
  client
    .query(
      `INSERT INTO payment(paymentNo, paymentPrice, paymentType, paymentDate)	VALUES (uuid_generate_v4(), '${paymentPrice}', '${paymentType}', '${paymentDate}')`
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};
// --------------------
const getPayments = async function (req, res, next) {
  const { rows } = await client.query(
    `SELECT * FROM payment ${magicGen("WHERE", req.query, "AND")}`
  );
  res.status(200).send(rows);
};
// --------------------
const updatePayment = (req, res, next) => {
  const { paymentNo, ...resProps } = req.body;
  client
    .query(
      `UPDATE payment
        ${magicGen("SET", resProps)}
        WHERE
        paymentNo = '${paymentNo}'`
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};
// --------------------
const deletePayment = (req, res, next) => {
  client
    .query(
      `${magicGen(
        "DELETE FROM payment WHERE",
        {
          paymentNo: req.body.paymentNo,
        },
        "AND"
      )}`
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};
// --------------------
app.get("/getpayments", getPayments);
app.post("/createpayment", createPayment);
app.post("/updatepayment", updatePayment);
app.post("/deletepayment", deletePayment);
// ==============================
// ========>>CRUD BOOKING<<========
// ==============================
const createBooking = (req, res, next) => {
  const {
    hotelNo,
    guestSsn,
    dateIn,
    dateOut,
    roomNo,
    paymentNo = null,
    bookingStatus = 0,
  } = req.body;
  client
    .query(
      `
      INSERT INTO booking (hotelNo, guestSsn, dateIn, dateOut, roomNo, paymentNo, bookingStatus)
      SELECT '${hotelNo}', '${guestSsn}', '${dateIn}', '${dateOut}', ${roomNo}, ${paymentNo}, ${bookingStatus}
      WHERE NOT EXISTS (
          SELECT dateIn, dateOut, hotelNo, roomNo  FROM booking
          WHERE dateIn BETWEEN '${dateIn}' AND '${dateOut}'
          AND dateOut BETWEEN '${dateIn}' AND '${dateOut}'
          AND hotelNo = '${hotelNo}'
          AND roomNo = ${roomNo}
      )
      AND '${dateIn}'::date < '${dateOut}'::date
      `
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};
// --------------------
const getBookings = async function (req, res, next) {
  const { rows } = await client.query(
    `SELECT * FROM booking  ${magicGen("WHERE", req.query, "AND")}`
  );
  res.status(200).send(rows);
};
// --------------------
const updateBooking = (req, res, next) => {
  const { hotelNo, guestSsn, dateIn, ...resProps } = req.body;
  client
    .query(
      `UPDATE booking
        ${magicGen("SET", { dateIn: dateIn, ...resProps })}
        ${magicGen("WHERE", {
          hotelNo: hotelNo,
          guestSsn: guestSsn,
          dateIn: dateIn,
        })}`
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};
// --------------------
const deleteBooking = (req, res, next) => {
  client
    .query(
      `${magicGen(
        "DELETE FROM booking WHERE",
        {
          hotelNo: req.body.hotelNo,
          guestSsn: req.body.guestSsn,
          dateIn: req.body.dateIn,
        },
        "AND"
      )}`
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};
// --------------------
app.post("/createbooking", createBooking);
app.get("/getbookings", getBookings);
app.post("/updatebooking", updateBooking);
app.post("/deletebooking", deleteBooking);
// ==============================
// ========>>CRUD PERSONNEL<<========
// ==============================
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
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
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
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};

const createHotelTel = (req, res, next) => {
  const { hTel, hName } = req.body;
  client
    .query(
      `INSERT INTO hoteltel("hTel", "hName")	VALUES ('${hTel}', '${hName}')`
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};

const createPersonnelTel = (req, res, next) => {
  const { pCode, pTel } = req.body;
  client
    .query(
      `INSERT INTO personneltel("pCode", "pTel")	VALUES ('${pCode}', '${pTel}')`
    )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};

const createGuestTel = (req, res, next) => {
  const { gSsn, gTel } = req.body;
  client
    .query(`INSERT INTO guesttel("gSsn", "gTel")	VALUES ('${gSsn}', '${gTel}')`)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
};

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

const hotelRoomCount = async function (req, res, next) {
  const { rows } = await client.query(
    `SELECT COUNT(h.hotelName),h.hotelName
    FROM room r
    JOIN hotel h ON r.hotelNo = h.hotelNo
    GROUP BY h.hotelName
    ORDER BY COUNT(h.hotelName) DESC;`
  );
  res.status(200).send(rows);
};
app.get("/hotelroomcount", hotelRoomCount);

const cityRoomCount = async function (req, res, next) {
  const { rows } = await client.query(
    `SELECT COUNT(h.hotelNo), h.city
    FROM room r
    JOIN hotel h ON r.hotelNo = h.hotelNo
    GROUP BY h.city
    ORDER BY COUNT(h.hotelName) DESC;`
  );
  res.status(200).send(rows);
};
app.get("/cityroomcount", cityRoomCount);

const cityHotelCount = async function (req, res, next) {
  const { rows } = await client.query(
    `SELECT COUNT(h.hotelNo), h.city
    FROM hotel h
    GROUP BY h.city
    ORDER BY COUNT(h.hotelName) DESC;`
  );
  res.status(200).send(rows);
};
app.get("/cityHotelcount", cityHotelCount);

const mostCityBooking = async function (req, res, next) {
  const { rows } = await client.query(
    `SELECT COUNT(h.city), h.city
    FROM hotel h
    JOIN booking b ON h.hotelNo = b.hotelNo
    GROUP BY h.city
    ORDER BY COUNT(h.hotelName) DESC;`
  );
  res.status(200).send(rows);
};
app.get("/mostcitybooking", mostCityBooking);

const maxAgeGuest = async function (req, res, next) {
  const { rows } = await client.query(
    `SELECT AGE(NOW(),g.guestBirthdate) age, g.guestFname
    FROM guest g
    ORDER BY age DESC
    LIMIT 1`
  );
  res.status(200).send(rows);
};
app.get("/maxageguest", maxAgeGuest);

const minAgeGuest = async function (req, res, next) {
  const { rows } = await client.query(
    `SELECT AGE(NOW(),g.guestBirthdate) age, g.guestFname
    FROM guest g
    ORDER BY age ASC
    LIMIT 1`
  );
  res.status(200).send(rows);
};
app.get("/minageguest", minAgeGuest);
