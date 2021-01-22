const express = require('express')
const app = express()
const port = 3000
var path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})
app.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname + '/map.html'));
})
app.get('/hello', (req, res) => {
  res.send('Hello Worasasasld!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
// AIzaSyDYHtxBgcRBh1ZPuGe4MigNQax30a5b6OM