/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

orders.js
    This file is the route for the orders page.
    It sets up the routes for the orders page.
    CRUD operations for the Orders table are defined here.

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
router.get('/orders', (req, res) => {
  let query1 = `SELECT Orders.orderID, Customers.email, Orders.orderDate
  FROM Orders
  INNER JOIN Customers ON Orders.customerID = Customers.customerID`

  db.pool.query(query1, function (err, rows, fields) {
    if (err) {
      console.log('Error: ' + err)
      res.send('Error')
    } else {
      res.render('orders', { data: rows })
    }
  })
})

router.post('/add-order', (req, res) => {
  let data = req.body;

  query = `INSERT INTO Orders (customerID, orderDate)
  VALUES ('${data.customerID}', ${data.orderDate})`

  db.pool.query(query, function (err, result) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      db.pool.query(
        `SELECT * FROM Orders WHERE orderID = ${result.insertId}`,
        function (err, rows, fields) {
          if (err) {
            console.log('Error: ' + err)
          } else {
            res.send(rows[0])
          }
        }
      )
    }
  })
})

module.exports = router
