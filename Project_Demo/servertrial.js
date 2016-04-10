/**
 * New node file
 */
var request = require('request');
var express = require('express');
var servertrial = express();
var server = require('http').createServer(servertrial);
var io = require('socket.io')(server);
var crypto = require("crypto");
var encoding=require("encoding");
var parseString = require('xml2js').parseString;
var path=require('path');
var flipkart=require('./flipkart_module');
var amazon=require('./amazon_module');
var infibeam=require('./infibeam_module');
var utf8 = require('utf8');


io.on('connection', function(client) {
	console.log('Client connected...');
	
	client.emit('messages', { hello: 'world' });
	
	///////////////Flipkart//////////////////////////////////////////////////////////////////////////////////
	
	client.on('flipkart',function(message){
		console.log(message);
		message=message.replace(' ','+');
		var req_url="https://affiliate-api.flipkart.net/affiliate/1.0/search.json?query="+message+"&resultCount=5";
		var options = {
				  url: req_url,
				  headers: {
				    'Fk-Affiliate-Id': 'rakesha74',
				    'Fk-Affiliate-Token': 'd8a4d752f8fe44b2906308106d0d64d8'
				  }
				};
		request(options, function(error,response,body){
			if (!error && response.statusCode == 200) {
				
				var tweet=flipkart.flipkart_module(body);
				var data=JSON.stringify(tweet);
				var profile=utf8.encode(data);
				var send=JSON.parse(profile);
				  client.emit('flipkartData',send);
			  }
		});
	});
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	////////////////////////////Amazon////////////////////////////////////////////////////////////////////////////
	client.on('amazon',function(message){
		var key="So8x6mqlUXdZ8T9babRjrfdfygvxXNg2JoCCtU+C";
		
		var date=encodeURIComponent(new Date().toISOString());
		var aa = [];
		message=message.replace(' ','%20');
		aa[0] = "GET\n" +
				"webservices.amazon.in\n" +
				"/onca/xml\n" +
				"AWSAccessKeyId=AKIAIEMV6LX5RSO7JDTA&AssociateTag=comaprebook09" +
				"-21&Keywords="+message+"&Operation=ItemSearch&ResponseGroup=Images%2CItemAttributes%2COffers&SearchIndex=Books&Service=AWSEComme" +
				"rceService&Timestamp="+date+"&Version=2011-08-01";
		var hash = crypto.createHmac("sha256", key);
		var str=aa.toString();
		console.log(str);
		
		var hash=hash.update(str).digest("base64");
		

		var signature=encodeURIComponent(hash);
		console.log(signature);
		
		
		var str="http://webservices.amazon.in/onca/xml?AWSAccessKeyId=AKIAIEMV6LX5RSO7JDTA&AssociateTag=comaprebook09-21&Keywords="+message+"&Operation=ItemSearch&ResponseGroup=Images%2CItemAttributes%2COffers&SearchIndex=Books&Service=AWSECommerceService&Timestamp="+date+"&Version=2011-08-01&Signature="+signature;
		console.log(str);
		request(str, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			  console.log("rakesh");
		    console.log(body) 
		    
		    var tweet=amazon.amazon_module(body);
		   client.emit('amazonData',tweet);
		    
		    
		  }
		 
		});
	
	});
	///////////////////////////////////////Amazon////////////////////////////////////////////////////////////////
	
	//////////////////////////////////////InfiBeam/////////////////////////////////////////////////////////////
	
	client.on('infibeam',function(message){
		console.log(message);
		message=message.replace(' ','%20');
		var req_url="http://www.infibeam.com/Books/search?q="+message;
		
		request(req_url, 'utf-8',function(error,response,body){
			if (!error && response.statusCode == 200) {
				
				var tweet=infibeam.infibeam_module(body);
				//console.log("Infibeam data"+tweet["title"][0] );
				var data=JSON.stringify(tweet);
				var profile=utf8.encode(data);
				var send=JSON.parse(profile);
				//console.log("sending Data"+send);
				  client.emit('infibeamData',send);
			  }
		});
	});
	
	
});

server.listen(8080);