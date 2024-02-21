/* CS340 Project Step 2 Draft
Group 146 
Jenny Zhong and Arberim Ame
*/

-- Disabling foreign key checks
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Create Customers Table

CREATE OR REPLACE TABLE Customers (
    customerID int NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    phoneNumber varchar(10) NOT NULL,
    PRIMARY KEY (customerID)
);

-- Create Orders Table
CREATE OR REPLACE TABLE Orders (
    orderID int NOT NULL AUTO_INCREMENT,
    cid int,
    date datetime,
    FOREIGN KEY (cid) REFERENCES Customers (customerID),
    PRIMARY KEY (orderID)
);

-- Create Records Table
CREATE OR REPLACE TABLE Records (
    recordID int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    artist varchar(255) NOT NULL,
    quantity int NOT NULL,
    price float(10, 2) NOT NULL,
    PRIMARY KEY (recordID)
);

-- Create Genres Table
CREATE OR REPLACE TABLE Genres (
    genreID int NOT NULL AUTO_INCREMENT, 
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    PRIMARY KEY (genreID)
);

-- Create RecordOrders table
CREATE OR REPLACE TABLE RecordOrders (
    orderID int,
    recordID int,
    FOREIGN KEY (orderID) REFERENCES Orders (orderID),
    FOREIGN KEY (recordID) REFERENCES Records (recordID),
    PRIMARY KEY (orderID, recordID)
);

-- Create GenreRecords Table
CREATE OR REPLACE TABLE GenreRecords (
    recordID int,
    genreID int,
    FOREIGN KEY (recordID) REFERENCES Records (recordID),
    FOREIGN KEY (genreID) REFERENCES Genres (genreID),
    PRIMARY KEY (recordID, genreID)
);


-- Insert sample data
INSERT INTO Customers(name, email)
VALUES(
	"Jane Smith",
	"jsmith@gmail.com"
),
(
	"Michael Jones",
	"mjones@gmail.com"
),
(
	"Corey Rodriguez",
	"crodriguez@gmail.com"
);

INSERT INTO Orders (cid, date)
VALUES ((SELECT customerID FROM Customers WHERE name = 'Jane Smith'), '20240208'),
((SELECT customerID FROM Customers WHERE name = 'Corey Rodriguez'), '20240206'),
((SELECT customerID FROM Customers WHERE name = 'Michael Jones'), '20240207');

INSERT INTO Records (title, artist, quantity, price)
VALUES('Be the Cowboy', 'Mitski', 3, 30.00),
('Rumors', 'Fleetwod Mac', 5, 50.00),
("Over The Garden Wall Original Soundtrack LP", "Sam Wolfe Connelly", 1, 100.00);

INSERT INTO Genres (name, description)
VALUES ('Indie', 'Alternative Music'), ('Soundtrack', 'Original Soundtrack for TV/Film'),
('Classic Rock', 'Rock music from the 1960s - 1990s');

INSERT INTO RecordOrders (orderID, recordID)
VALUES ((SELECT orderID from Orders WHERE cid = (SELECT customerID FROM Customers WHERE email = 'crodriguez@gmail.com')), 
(SELECT recordID FROM Records WHERE title = 'Be the Cowboy')), 
((SELECT orderID FROM Orders WHERE cid = (SELECT customerID FROM Customers WHERE email = 'mjones@gmail.com')), 
(SELECT recordID FROM Records WHERE title = 'Over The Garden Wall Original Soundtrack LP')),
((SELECT orderID FROM Orders WHERE cid = (SELECT customerID FROM Customers WHERE email = 'jsmith@gmail.com')),
(SELECT recordID FROM Records WHERE title = 'Rumors'));

INSERT INTO GenreRecords (recordID, genreID)
VALUES ((SELECT recordID FROM Records WHERE title = 'Be the Cowboy'), (SELECT genreID FROM Genres WHERE name = 'Indie')),
((SELECT recordID FROM Records WHERE title = 'Rumors'), (SELECT genreID FROM Genres WHERE name = 'Classic Rock')),
((SELECT recordID FROM Records WHERE title = 'Over The Garden Wall Original Soundtrack LP'), 
(SELECT genreID FROM Genres WHERE name = 'Soundtrack'));

-- Enabling foreign key checks
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
