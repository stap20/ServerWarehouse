const pg = require('pg')
const url ="postgres://postgres:123@localhost:5432/products";
// pools will use environment variables
// for connection information
var client = new pg.Client(url);
client.connect();


client.query('SELECT * from login', (err, res) => {
  //console.log(err, res)
  console.log(res.rows[0].userid);
  client.end()
})


//exports
//module.exports ={ }5432ssss