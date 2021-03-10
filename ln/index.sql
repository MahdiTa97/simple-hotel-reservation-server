-- Serction 1
USE my_db_name;

-- SELECT column1, column2, column3

SELECT *
FROM table1
WHERE column1 = 1
ORDER BY column2 ASC

-- Serction 2

SELECT column1, column2
FROM table1

SELECT column2, column1
FROM table1

SELECT column1, column2, column3 + 10
FROM table1

SELECT column1, column2, column3 + 10 AS columnNew
FROM table1

-- Serction 3

SELECT *
FROM table1
WHERE column1 > 300

SELECT *
FROM table1
WHERE dateIn >= '2019-01-01' AND dateOut < '2020-01-01'

SELECT *
FROM table1
WHERE NOT (dateIn >= '2019-01-01' AND dateOut < '2020-01-01')


-- Serction 4
SELECT *
FROM table1
WHERE city = 'VA' OR city = "GA" OR city = 'FL'


SELECT *
FROM table1
WHERE city IN ('VA', 'GA', 'FL')

SELECT *
FROM table1
WHERE city NOT IN ('VA', 'GA', 'FL')

---- BETWEEN OPERATOR
SELECT *
FROM table1
WHERE points >= 1000 AND points <= 3000


SELECT *
FROM table1
WHERE points BETWEEN 1000 AND 3000


SELECT *
FROM table1
WHERE birth_date BETWEEN '1990-01-01' AND '2000-01-01'

---- LIKE OPERATOR

SELECT *
FROM customers
WHERE first_name LIKE 'b%'

SELECT *
FROM customers
WHERE first_name LIKE '%b%'

SELECT *
FROM customers
WHERE first_name LIKE '%b'

SELECT *
FROM customers
WHERE first_name LIKE '_b'

-- % any number of characters
-- _ single character

---- REGEX OPERATOR

SELECT *
FROM customers
WHERE first_name REGEXP '^field'

-- ^ beginning
-- $ end
-- | logical or
-- [abcd]
-- [a-f]

---- NULL OPERATOR
SELECT *
FROM customers
WHERE phone IS NULL

SELECT *
FROM customers
WHERE phone IS NOT NULL

---- ORDER BY Clause
SELECT first_name, last_name
FROM customers
ORDER BY city DESC, first_name ASC

SELECT first_name, last_name, 10 AS points
FROM customers
ORDER BY 1, 2

SELECT *
FROM order_items
ORDER BY quantity * unit_price DESC

SELECT *, quantity * unit_price AS total_price
FROM order_items
ORDER BY total_price DESC

---- Limit Clause
SELECT *
FROM customers
LIMIT 3

SELECT *
FROM customers
LIMIT 6, 3

---- inner Joins
SELECT *
FROM orders
JOIN customers
  ON orders.customer_id = customers.customer_id

SELECT order_id, orders.customer_id, first_name, last_name
FROM orders
JOIN customers
  ON orders.customer_id = customers.customer_id

SELECT order_id, o.customer_id, first_name, last_name
FROM orders o
JOIN customers c
  ON o.customer_id = c.customer_id

---- Self Joins
SELECT *
FROM employees e
JOIN employees m
  ON e.reports_to = m.employee_id

---- Joining Multiple Tables
SELECT *
FROM orders o
JOIN customers c
  ON o.customer_id = c.customer_id
JOIN order_statuses os
  ON o.status = os.order_status_id

---- Compound Join Conditions
SELECT *
FROM order_items oi
JOIN order_item_notes oin
  ON oi.order_id = oin.order_id
  AND oi.product_id = oin.product_id

---- Implicit Join Syntax
SELECT *
FROM orders o
JOIN customers c
  ON o.customer_id = c.customer_id

SELECT *
FROM orders o, customers c
Where o.customer_id = c.customer_id

---- Outer Join
SELECT
  c.customer_id,
  c.first_name,
  o.order_id
FROM customers c
LEFT/RIGHT JOIN orders o
  ON o.customer_id = c.customer_id
ORDER BY c.customer_id

---- Outer Joins Between Multiple Tables
SELECT
  c.customer_id,
  c.first_name,
  o.order_id
FROM customers c
LEFT JOIN orders o
  ON o.customer_id = c.customer_id
LEFT JOIN shippers sh
  ON o.shipper_id = sh.shipper_id
ORDER BY c.customer_id

---- The USING Clause
SELECT *
FROM orders o
JOIN customers c
  -- ON o.customer_id = c.customer_id
  USING (customer_id)
JOIN shippers sh
  USING (shipper_id)

SELECT *
FROM orders o
JOIN customers c
  -- ON o.customer_id = c.customer_id AND o.shipper_id = c.shipper_id
  USING(customer_id, shipper_id)

---- Insertin In a Row
INSERT INTO customers
VALUES (DEFAULT)

INSERT INTO customers(first_name)
VALUES ('mahdi')

INSERT INTO customers(first_name)
VALUES ('mahdi'),('hasan'),('ali')

---- Create Table
CREATE TABLE test AS
SELECT *
....

---- Updating Single Row
UPDATE invoices
SET first_name = 'ali'
WHERE ssn = "00204429345"

---- Updating Multi Row
UPDATE invoices
SET first_name = 'ali'
WHERE ssn IN ("00204429345","0020452934")

---- Conditional Update
UPDATE invoices
SET
  payment_total = invoice_total * 0.5,
  payment_date = due_date
WHERE client_id =
  (SELECT client_id
  FROM clients
  WHERE name = 'MyWorks')

UPDATE invoices
SET
  payment_total = invoice_total * 0.5,
  payment_date = due_date
WHERE client_id IN
  (SELECT client_id
  FROM clients
  WHERE city IN ('VA', 'GA', 'FL'))

---- Delete
DELETE FROM invoices

DELETE FROM invoices
WHERE invoice_id = 3

SELECT htel FROM
(SELECT hTel
FROM hotel h
JOIN hotelTel ht ON h.hotelNo=ht.hotelNo) a
JOIN
(SELECT guestSsn
FROM guest g
JOIN Booking b ON g.guestSsn=b.guestSsn) b
ON a.hotelNo = b.hotelNo

// tedade otagh haye har hotel
SELECT COUNT(h.hotelName),h.hotelName
FROM room r
JOIN hotel h ON r.hotelNo = h.hotelNo
GROUP BY h.hotelName
ORDER BY COUNT(h.hotelName) DESC;

// bishtarin otagh too kodoom shahre
SELECT COUNT(h.hotelNo), h.city
FROM room r
JOIN hotel h ON r.hotelNo = h.hotelNo
GROUP BY h.city
ORDER BY COUNT(h.hotelName) DESC;

// har shahr chand ta hotel dare
SELECT COUNT(h.hotelNo), h.city
FROM hotel h
GROUP BY h.city
ORDER BY COUNT(h.hotelName) DESC;

// bishtarin reserve ha marboot be che sharie
SELECT COUNT(h.city), h.city
FROM hotel h
JOIN booking b ON h.hotelNo = b.hotelNo
GROUP BY h.city
ORDER BY COUNT(h.hotelName) DESC;

//pirtarin guest
SELECT AGE(NOW(),g.guestBirthdate) age, g.guestFname
FROM guest g
ORDER BY age DESC
LIMIT 1

//javantarin guest
SELECT AGE(NOW(),g.guestBirthdate) age, g.guestFname
FROM guest g
ORDER BY age ASC
LIMIT 1