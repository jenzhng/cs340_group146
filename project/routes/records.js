/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

records.js
    This file is the route for the records page.
    It sets up the routes for the records page.
    CRUD operations for the Records table are defined here.

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
router.get('/records', (req, res) => {
  let query1 = 'SELECT * FROM Records'

  db.pool.query(query1, function (err, rows, fields) {
    if (err) {
      console.log('Error: ' + err)
      res.send('Error')
    } else {
      res.render('records', { data: rows })
    }
  })
})

module.exports = router