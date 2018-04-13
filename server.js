const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (request, response) => {
  response.send('Hello from Express!')
})

app.post('/', (req, res) => {
    res.send('good post!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})