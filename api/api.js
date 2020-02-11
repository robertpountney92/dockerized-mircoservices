'use strict';

const express = require('express');
let bodyParser = require('body-parser')

// create application/json parser
let jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World 10');
});

function reverseString(str) {
    let splitString = str.split("");
    let reverseArray = splitString.reverse(); 
    let joinArray = reverseArray.join(""); 
    return joinArray;
}

app.post('/api', jsonParser, (req, res) => {
    let reversedMsg = reverseString(req.body.message);
    let randNum = Math.random() * (1 - 0) + 0
    return res.send({ message: reversedMsg, rand: randNum });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);