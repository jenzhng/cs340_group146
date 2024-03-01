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
router.get('/genrerecords', (req, res) => {
  let query = `SELECT Records.recordID, Records.title, Records.artist,
  Records.qtyStock as Stock, Records.qtyStock * Records.price as InventoryValue,
  Genres.name AS genre, Genres.description
  FROM Records
  JOIN GenreRecords ON Records.recordID = GenreRecords.recordID
  JOIN Genres ON GenreRecords.genreID = Genres.genreID`

  db.pool.query(query, function (err, rows, fields) {
    if (err) {
      console.log('Error: ' + err)
      res.send('Error')
    } else {
      res.render('genrerecords', { data: rows })
    }
  })
})

module.exports = router