const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const rp = require('request-promise');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/', (req, res) => {
    
    let ns = req.body.id;
    
    fs.readFile(`./json/${ns}.json`, 'utf8', function(err,data) {
        res.json(data);
    });
    
});

app.post('/jsontoxml', (req, res) => {
    var options = {
        method: 'POST',
        uri: 'http://localhost:3001/json/to/xml',
        body: {
            body: req.body
        },
        headers: {
            'Content-Type': 'application/json'
        },
        json: true
    };
    
    rp(options)
        .then(resp => {
            res.send(resp);
        })
        .catch(err => {
            res.send('didn\'t get it!');
        });
})

app.listen(port, (err) => {
    if (err) return console.error('something bad happened', err);
    else console.log(`server is listening on ${port}`);
});