/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

recordorders.js
    This file is the route for the recordorders page.
    It sets up the routes for the recordorders page.
    CRUD operations for the RecordOrders table are defined here.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

const express = require('express')
const router = express.Router()
var db = require('../database/db-connector')


// Middleware
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})


// ROUTES
router.get('/recordorders', (req, res) => {
  let query = `SELECT Customers.customerID, Customers.firstName,
  Customers.lastName, SUM(Records.price) AS totalSpent
  FROM Customers
  JOIN Orders ON Customers.customerID = Orders.customerID
  JOIN RecordOrders ON Orders.orderID = RecordOrders.orderID
  JOIN Records ON RecordOrders.recordID = Records.recordID
  GROUP BY Customers.customerID
  ORDER BY totalSpent DESC;`

  db.pool.query(query, function (err, rows, fields) {
    if (err) {
      console.log('Error: ' + err)
      res.send('Error')
    } else {
      res.render('recordorders', { data: rows })
    }
  })
})

module.exports = router