let express = require('express')
let app = express()
let mysql = require('mysql')

app.set('views', './views')
app.set('view engine', 'pug')

function getAllData (callback) {
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database: 'world'
  })

  connection.connect((error) => {
    if (error) throw error
  })

  connection.query('SELECT * from world.city', (error, results, fields) => {
    if (error) throw error
    callback(results)
  })

  connection.end()
}

app.get('/', function (req, res) {
  getAllData((data) => {
    res.send(JSON.stringify(data))
  })
})

function getTitle (callback) {
  callback('Title')
}

//  callback hell ?
app.get('/indexhell', function (req, res) {
  getTitle((title) => {
    getAllData((data) => {
      res.render('index', {
        title: title,
        message: data
      })
    })
  })
})

app.get('/index', function (req, res) {
  getAllData((data) => {
    res.render('index', {
      title: 'Table',
      data: data
    })
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
