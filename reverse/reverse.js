'use strict';

const express = require('express');
const app = express();
let bodyParser = require('body-parser')

// create application/json parser
let jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

function reverseString(str) {
    let splitString = str.split("");
    let reverseArray = splitString.reverse(); 
    let joinArray = reverseArray.join(""); 
    return joinArray;
}

app.post('/reverse', jsonParser, (req, res) => {
    let reversedMsg = reverseString(req.body.message);
    return res.send({ message: reversedMsg});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);