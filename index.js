"use strict";

const express = require('express'),
	request = require('request');

let app = express();
let port = process.env.PORT || 8080;

app.listen(port, function(){
	console.log("Port listenning " + port);
})
app.disable('x-powered-by');
app.get('/', (req, res)=>{
	res.writeHeader(200, {"Content-Type": "text/html"});  
	res.write('<img src="/image.jpg"></img>');
	res.end();
})
app.get('/image.jpg', (req, res)=>{
  request('http://lorempixel.com/400/200/').pipe(res);
})
