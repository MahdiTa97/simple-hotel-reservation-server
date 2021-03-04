exports.createTableText = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS hotel
(
    "name" character varying(250) NOT NULL,
    "sum" integer,
    "city" character varying(250),
    "street" character varying(250),
    "ave" character varying(250),
    PRIMARY KEY ("name")
)
WITH (
    OIDS = FALSE
);

ALTER TABLE hotel
    OWNER to mahdi;


CREATE TABLE IF NOT EXISTS personnel
(
    "pCode" bigint NOT NULL,
    "fName" character varying(250) NOT NULL,
    "lName" character varying(250) NOT NULL,
    "pass" character varying(250) NOT NULL,
    "salary" bigint NOT NULL,
    "hotelName" character varying(250) NOT NULL,
    "side" character varying(250),
    "shiftWork" character varying(250),
    "type" character varying(250) NOT NULL,
    PRIMARY KEY ("pCode"),
    FOREIGN KEY ("hotelName")
        REFERENCES hotel ("name") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)
WITH (
    OIDS = FALSE
);

ALTER TABLE personnel
OWNER to mahdi;

CREATE TABLE IF NOT EXISTS room
(
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "type" character varying(250),
    "cost" character varying(250),
    "bedNumber" integer,
    "floor" integer,
    "hotelName" character varying(250) NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("hotelName")
        REFERENCES hotel ("name") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)
WITH (
    OIDS = FALSE
);

ALTER TABLE room
    OWNER to mahdi;

CREATE TABLE IF NOT EXISTS guest
(
    "ssn" bigint NOT NULL,
    "email" character varying(250),
    "bDate" timestamp,
    "Fname" character varying(250) NOT NULL,
    "Lname" character varying(250) NOT NULL,
    PRIMARY KEY ("ssn")
)
WITH (
    OIDS = FALSE
);

ALTER TABLE guest
    OWNER to mahdi;


CREATE TABLE IF NOT EXISTS payment
(
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "cost" character varying(250),
    "type" character varying(250),
    "date" timestamp NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("id")
)
WITH (
    OIDS = FALSE
);

ALTER TABLE payment
    OWNER to mahdi;


CREATE TABLE IF NOT EXISTS cleaning
(
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "pCode" bigint NOT NULL,
    "roomId" uuid NOT NULL,
    PRIMARY KEY ("pCode", "roomId", "id"),
    FOREIGN KEY ("pCode")
        REFERENCES personnel ("pCode") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    FOREIGN KEY ("roomId")
        REFERENCES room ("id") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)
WITH (
    OIDS = FALSE
);

ALTER TABLE cleaning
    OWNER to mahdi;


CREATE TABLE IF NOT EXISTS hotelTel
(
    "hTel" character varying(250) NOT NULL,
    "hName" character varying(250) NOT NULL,
    PRIMARY KEY ("hTel", "hName"),
    FOREIGN KEY ("hName")
        REFERENCES hotel ("name") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)
WITH (
    OIDS = FALSE
);

ALTER TABLE hotelTel
    OWNER to mahdi;


CREATE TABLE IF NOT EXISTS personnelTel
(
    "pCode" bigint NOT NULL,
    "pTel" character varying(250) NOT NULL,
    PRIMARY KEY ("pCode", "pTel"),
    FOREIGN KEY ("pCode")
        REFERENCES personnel ("pCode") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)
WITH (
    OIDS = FALSE
);

ALTER TABLE personnelTel
    OWNER to mahdi;


CREATE TABLE IF NOT EXISTS guestTel
(
    "gSsn" bigint NOT NULL,
    "gTel" character varying(250) NOT NULL,
    PRIMARY KEY ("gSsn", "gTel"),
    FOREIGN KEY ("gSsn")
        REFERENCES guest ("ssn") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)
WITH (
    OIDS = FALSE
);

ALTER TABLE guestTel
    OWNER to mahdi;



CREATE TABLE IF NOT EXISTS reserve
(
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "roomId" uuid,
    "gSsn" bigint NOT NULL,
    "payId" uuid NOT NULL,
    "duration" integer NOT NULL,
    "reserveDate" timestamp NOT NULL,
    "gCount" integer NOT NULL,
    "hName" character varying(250) NOT NULL,
    "status" integer NOT NULL DEFAULT 0,
    PRIMARY KEY ("id","gSsn","hName"),
    FOREIGN KEY ("roomId")
        REFERENCES room ("id") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    FOREIGN KEY ("gSsn")
        REFERENCES guest ("ssn") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    FOREIGN KEY ("payId")
        REFERENCES payment ("id") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    FOREIGN KEY ("hName")
        REFERENCES hotel ("name") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)
WITH (
    OIDS = FALSE
);

ALTER TABLE reserve
    OWNER to mahdi;

`;

exports.dropTable = `
  DROP SCHEMA IF EXISTS hotel CASCADE;
`;
