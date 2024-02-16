/* CS340 Project Step 3
Group 146 
Jenny Zhong and Arberim Ame
Data Manipulation Queries
*/

/* SELECT QUERIES */

-- Customers
SELECT * FROM Customers;

-- Orders
SELECT * FROM Orders;

-- Records
SELECT * FROM Records;

-- Genres
SELECT * FROM Genres;

/* INSERT QUERIES */

-- Customers
INSERT INTO Customers (name, email)
VALUES(:name:, :email:);

-- Orders
INSERT INTO Orders (cid, date)
VALUES ((SELECT customerID FROM Customers WHERE name = :desiredCustomerName:), :currentDate:);

-- Records
INSERT INTO Records (title, artist, quantity, price)
VALUES (:titleInput:, :artistInput:, :quantityInput:, :priceInput:);

-- Genres
INSERT INTO Genres (name, description)
VALUES (:genreInput:, :descriptionInput:);

-- RecordOrders
INSERT INTO RecordOrders (orderID, recordID)
VALUES ((SELECT orderID from Orders WHERE cid = (SELECT customerID FROM Customers WHERE email = :emailInput:)), 
(SELECT recordID FROM Records WHERE title = :titleInput));

-- GenreRecords
INSERT INTO GenreRecords (recordID, genreID)
VALUES ((SELECT recordID FROM Records WHERE title = :titleInput:), (SELECT genreID FROM Genres WHERE name = :genreNameInput:)),

-- UPDATE QUERY
UPDATE Records SET title = :titleInput:, artist = :artistInput:, quantity = :quantityInput:, price = :priceInput:
WHERE recordID = :recordId_from_form:;

-- DELETE QUERY
DELETE FROM Genres WHERE id = :genreID_from_form:

-- DELETE (M:M)
DELETE FROM GenreRecords WHERE recordID = :recordID_from_form: AND genreId = :genreID_from_form;