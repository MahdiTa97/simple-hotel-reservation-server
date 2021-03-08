exports.createTableText = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- https://www.javaguicodexample.com/mysqldatabasequerynetbeansex.html
-- -------------HOTEL-------------
CREATE TABLE IF NOT EXISTS hotel
(
    hotelNo character varying(10) NOT NULL,
    hotelName character varying(20) NOT NULL,
    city character varying(20),
    hotelAddress character varying(50),
    PRIMARY KEY (hotelNo)
)
WITH (
    OIDS = FALSE
);

-- INSERT
INSERT INTO hotel(hotelNo, hotelName, city, hotelAddress)
VALUES('fb01','Grosvenor', 'London', '1914  Bird Spring Lane'),
('fb02','Watergate', 'Paris', '1775  Sheila Lane'),
('ch01','Omni Shoreham', 'London', '4728  Sunny Glen Lane'),
('ch02','Phoenix Park', 'London', '4713  Thompson Drive'),
('dc01','Latham', 'Berlin', '4286  Bird Street');

-- -------------ROOM-------------
CREATE TABLE IF NOT EXISTS room
(
    roomNo numeric(3) NOT NULL,
    hotelNo character varying(20) NOT NULL,
    roomType character varying(10) NOT NULL,
    roomPrice decimal(5,2),
    roomStatus character varying(10) NOT NULL DEFAULT 'free',
    PRIMARY KEY (roomNo, hotelNo),
    FOREIGN KEY (hotelNo)
        REFERENCES hotel (hotelNo) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)
WITH (
    OIDS = FALSE
);

-- INSERT
INSERT INTO room(roomNo, hotelNo, roomType, roomPrice, roomStatus)
VALUES(501, 'fb01', 'single', 19, 'free'),
(601, 'fb01', 'double', 29, 'free'),
(701, 'fb01', 'family', 39, 'free'),
(101, 'fb02', 'single', 58, 'free'),
(111, 'fb02', 'double', 86, 'free'),
(101, 'ch01', 'single', 29.99, 'free'),
(112, 'ch01', 'family', 59.99, 'free'),
(701, 'ch02', 'single', 10, 'free'),
(801, 'ch02', 'double', 15, 'free'),
(901, 'dc01', 'single', 18, 'free'),
(101, 'dc01', 'double', 30, 'free'),
(111, 'dc01', 'family', 35, 'free');

-- -------------GUEST-------------
CREATE TABLE IF NOT EXISTS guest
(
    guestSsn character(10),
    guestFname character varying(20) NOT NULL,
    guestLname character varying(20) NOT NULL,
    guestAddress character varying(50),
    guestBirthdate date,
    PRIMARY KEY (guestSsn)
)
WITH (
    OIDS = FALSE
);

-- INSERT
INSERT into guest(guestSsn, guestFname, guestLname, guestAddress, guestBirthdate)
VALUES('0525551433', 'John' ,'Kay', '56 High St, London', '2001-10-05'),
('0046525637', 'Mike' ,'Ritchie', '18 Tain St, London', '2001-10-05'),
('0189973935', 'Mary' ,'Tregear', '5 Tarbot Rd, Aberdeen', '2001-10-05'),
('0998525227', 'Joe' ,'Keogh', '2 Fergus Dr, Aberdeen', '2001-10-05'),
('0799624934', 'Carol' ,'Farrel', '6 Achray St, Glasgow', '2001-10-05'),
('0020452934', 'Tina' ,'Murphy', '63 Well St, Glasgow', '2001-10-05'),
('0020452935', 'Tony' ,'Shaw', '12 Park Pl, Glasgow', '2001-10-05');

-- -------------PAYMENT-------------
CREATE TABLE IF NOT EXISTS payment
(
    paymentNo uuid NOT NULL DEFAULT uuid_generate_v4(),
    paymentPrice decimal(5,2),
    paymentType character varying(10) NOT NULL,
    paymentDate date,
    PRIMARY KEY (paymentNo)
)
WITH (
    OIDS = FALSE
);

-- INSERT
INSERT into payment(paymentNo, paymentPrice, paymentType, paymentDate)
VALUES(uuid_generate_v4() ,55, 'cash', '2001-10-05'),
(uuid_generate_v4() ,123, 'cash', '2001-10-05'),
(uuid_generate_v4() ,12, 'cash', '2001-10-05'),
(uuid_generate_v4() ,343, 'cash', '2001-10-05'),
(uuid_generate_v4() ,23, 'cash', '2001-10-05'),
(uuid_generate_v4() ,46, 'cash', '2001-10-05'),
(uuid_generate_v4() ,57, 'cash', '2001-10-05');

-- -------------BOOKING-------------
CREATE TABLE IF NOT EXISTS booking
(
    hotelNo character varying(20) NOT NULL,
    guestSsn character varying(10) NOT NULL,
    dateIn date NOT NULL,
    dateOut date NOT NULL,
    roomNo numeric(3),
    paymentNo uuid,
    bookingStatus integer NOT NULL DEFAULT 0,
    -- 0 iactive, 1 reserved but not paid, 2 reserved and paid
    PRIMARY KEY (hotelNo, guestSsn, dateIn),
    FOREIGN KEY (roomNo, hotelNo)
        REFERENCES room (roomNo, hotelNo) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    FOREIGN KEY (guestSsn)
        REFERENCES guest (guestSsn) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
    -- FOREIGN KEY (paymentNo)
    --     REFERENCES payment (paymentNo) MATCH SIMPLE
    --     ON UPDATE CASCADE
    --     ON DELETE CASCADE
    --     NOT VALID
)
WITH (
    OIDS = FALSE
);

-- INSERT
INSERT into booking(hotelNo, guestSsn, dateIn, dateOut, roomNo, paymentNo, bookingStatus)
VALUES('fb01', '0525551433' ,'2001-10-05', '2001-10-07', 501, null, '0'),
('fb01', '0046525637' ,'2001-10-05', '2001-10-08', 601, null, '0'),
('fb02', '0189973935' ,'2001-10-05', '2001-10-09', 111, null, '0'),
('fb02', '0998525227' ,'2001-10-05', '2001-10-10', 101, null, '0'),
('ch02', '0799624934' ,'2001-10-05', '2001-10-11', 701, null, '0'),
('dc01', '0020452934' ,'2001-10-05', '2001-10-12', 901, null, '0'),
('dc01', '0020452935' ,'2001-10-05', '2001-10-13', 111, null, '0');

`;

exports.dropTable = `
DROP TABLE IF EXISTS hotel CASCADE;
DROP TABLE IF EXISTS room CASCADE;
DROP TABLE IF EXISTS guest CASCADE;
DROP TABLE IF EXISTS booking CASCADE;
DROP TABLE IF EXISTS payment CASCADE;
-- DELETE FROM personnel;
-- DELETE FROM cleaning;
-- DROP SCHEMA IF EXISTS hotel CASCADE;
`;
