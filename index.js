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
	let random = Math.floor(Math.random()*100+1);
	// GIPHY API WITH PUBLIC TEST APIKEY
	let api = 'http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC&limit=1&offset='+random;
	let imageUrl = 'http://lorempixel.com/400/200/';
	
	let newImage = new Promise((resolve, reject)=>{
		request.get(api, (erro, response, body)=>{
			let obj = JSON.parse(body)
			let gifurl = obj.data[0].images.fixed_height.url;
			imageUrl = gifurl ? gifurl:imageUrl;
			resolve(imageUrl)
		});
	})
	newImage.then((data)=>{
		request(data).pipe(res);
	})
})

