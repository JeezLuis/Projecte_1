var path = require('path');
var express = require('express');
var app = express();

var dir = "./dist";
var publicDir = "./src/media";

app.use(express.static(dir));

app.use(express.static(publicDir));

app.listen(3000, () => console.log('Listening on http://localhost:3000/'));