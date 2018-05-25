let express = require('express')
let app = express()
let mysql = require('mysql')

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/index', function (req, res) {
  res.render('index', {
    title: 'Hey',
    message: 'Hello there!'
  })
})

app.get('/', function (req, res) {
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
    res.send(JSON.stringify(results))
  })

  connection.end()
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
