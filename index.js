let express = require('express')
let app = express()
let mysql = require('mysql')
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'nodejs',
  password: 'nodejs',
  database: 'world'
})

app.get('/', function (req, res) {  
  connection.connect()

  connection.query('SELECT * from world.city Limit 10', (error, results, fields) => {
    if (error) throw error
    res.send(results)
  })

  connection.end()
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
