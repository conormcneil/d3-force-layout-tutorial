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

app.post('/', (req, res) => {
    
    let ns = req.body.id;
    
    fs.readFile(`./json/${ns}.json`, 'utf8', function(err,data) {
        res.json(data);
    });
    
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})