"use strict";

const express = require('express'),
	request = require('request');

let app = express();
let port = process.env.PORT || 8080;

app.listen(port, function(){
	console.log("Port listenning " + port);
})

app.get('/', function (req, res) {
  request('http://lorempixel.com/400/200/').pipe(res);
})
