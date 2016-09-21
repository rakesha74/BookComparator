/**
 * New node file
 */
var http = require('https'); 
var querystring = require('querystring'); 
var request = require('request');
var utf8 = require('utf8');
var express = require('express');
var servertrial = express();
var server = require('https').createServer(servertrial);
var formurlencoded = require('form-urlencoded');

var data ={
	key: 'gtKFFx', 
	txnid:'234567',
	amount:'1000',
	productinfo: 'X',
	firstname: 'Rakesh',
	email: 'rakesha74@gmail.com',
	phone: '9660027375',
	surl: 'www.google.com',
	furl: 'foo.html',
	hash: '48f40629e4bfd2d47167e5fb681c8006dfe71b3cc05f1a8cefe0e3961287574495d6bc3f4abbf894c7e433b3a44f180d801da5449c62128d4a68a4a0aa136bc3',
	service_provider:''
};
/*
var formData = querystring.stringify(form);
var contentLength = form.length;
var data=formurlencoded(formData);
console.log("url encoded data"+data);
/*
request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'wkKiD9CSq5GtKP3U+tGhwy40UaOyf2XeRabHFfZKbSY='
    },
    uri: 'https://test.payu.in/_payment',
    body: utf8.encode(form),
    method: 'POST'
  }, function (err, res, body) {
    //it works!
	  console.log("body: " + body);
  });
*/
/*
var options = { 
	    hostname: 'test.payu.in', 
	    port: 443, 
	    path: '/_payment', 
	    method: 'POST', 
	    headers: { 
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'Authorization': 'wkKiD9CSq5GtKP3U+tGhwy40UaOyf2XeRabHFfZKbSY=',
	        //'accept':'*/
	        /*
	        'Content-Length': Buffer.byteLength(formData)
	    },
	    body:data
*/
/*
		data:{
			key: 'gtKFFx', 
			txnid:'234567',
			amount: '1000',
			productinfo: 'X',
			firstname: 'Rakesh',
			email: 'rakesha74@gmail.com',
			phone: '9660027375',
			surl: 'index.html',
			furl: 'foo.html',
			hash: '48f40629e4bfd2d47167e5fb681c8006dfe71b3cc05f1a8cefe0e3961287574495d6bc3f4abbf894c7e433b3a44f180d801da5449c62128d4a68a4a0aa136bc3',
			service_provider:''
		}
		*/
/*
	}; 


	var req = http.request(options, function(res) { 
	    res.setEncoding('utf8'); 
	    res.on('data', function(chunk) {    // data will be available in callback 
	        console.log("body: " + chunk); 
	    }); 
	}); 
	req.on('error',function(e){ 
	  console.log('Error'+ e.message); 
	}); 
	//req.write(formData); 
	req.end();
*/

request.post('https://test.payu.in/_payment', {form:data }, function(err,httpResponse,body){
	
	console.log(httpResponse["caseless"]["dict"]["location"]);
	
	
})