"use strict";

var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
    const indexFilePath = path.resolve(`${__dirname}/../ui/main.html`)
    console.log(`main.html at ${indexFilePath}`);
    res.sendFile(indexFilePath);
})

app.get('/docs', function (req, res) {
   // Prepare output in JSON format
   var response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.use(express.static(`${__dirname}/../ui`));

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log(`app running at ${host}: ${port}`)
})