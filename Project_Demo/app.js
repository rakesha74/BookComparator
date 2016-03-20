/**
 * New node file
 */
var request = require('request');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var crypto = require("crypto");
var encoding=require("encoding");
var parseString = require('xml2js').parseString;




io.on('connection', function(client) {
	console.log('Client connected...');
	
	client.emit('messages', { hello: 'world' });
	
	client.on('flipkart',function(message){
		console.log(message);
	message=message.replace(' ','+');
		var req_url="https://affiliate-api.flipkart.net/affiliate/search/json?query="+message+"&resultCount=5";
		var options = {
				  url: req_url,
				  headers: {
				    'Fk-Affiliate-Id': 'rakesha74',
				    'Fk-Affiliate-Token': 'd8a4d752f8fe44b2906308106d0d64d8'
				  }
				};
		request(options, function(error,response,body){
			if (!error && response.statusCode == 200) {
//			    var info = JSON.parse(body);
			var aa=[];
				//  var profiles=JSON.stringify(body);
				 var profile=JSON.parse(body);
				// console.log(profile_new.productInfoList.productBaseInfo);
				 console.log(profile["productInfoList"][1]["productBaseInfo"]["productAttributes"]["title"]);
				 var new_1=profile;
				// aa=new_1.productBaseInfo;
				// traverse(new_1,process);
				 var tweet={title:profile["productInfoList"][1]["productBaseInfo"]["productAttributes"]["title"]};
				console.log(new_1.productInfoList[1].productBaseInfo.productAttributes.title);
				//var flew=JSON.stringify(profile);
				  client.emit('flipkartData',tweet);
			  }
		});
	});
	
	client.on('amazon',function(message){
		var key="So8x6mqlUXdZ8T9babRjrfdfygvxXNg2JoCCtU+C";
		// these are part of the array's body/contents
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
		//hash.update(toSign).digest("base64");
		var hash=hash.update(str).digest("base64");
		//encoding.convert(hash, 'ASCII', 'UTF-8');
		//console.log(hash.toString("utf8"));
		//console.log("\n"+encodeURIComponent(new Date().toISOString()));

		var signature=encodeURIComponent(hash);
		console.log(signature);
		
		
		var str="http://webservices.amazon.in/onca/xml?AWSAccessKeyId=AKIAIEMV6LX5RSO7JDTA&AssociateTag=comaprebook09-21&Keywords="+message+"&Operation=ItemSearch&ResponseGroup=Images%2CItemAttributes%2COffers&SearchIndex=Books&Service=AWSECommerceService&Timestamp="+date+"&Version=2011-08-01&Signature="+signature;
		console.log(str);
		request(str, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			  console.log("rakesh");
		    console.log(body) // Show the HTML for the Google homepage.
		    
		  //  var data = key+":"+value+"\n";
			//console.log(data);
//		    fs.writeFile(path, body, function(error) {
//				if (error) {
//				console.error("write error: " + error.message);
//				} else {
//				//console.log("Successfully wrote " + path);
//				}
//				});
		    var new_1;
		    
		   parseString(body, function (err, result) {
			   console.log("XML is converted to js");
		   // console.log(JSON.stringify(result));
		   // var new_1=JSON.parse(result);
		  //  console.log(result);
		   new_1=result;
		  //  console.log(error);
		   	});
		   
		  // traverse(new_1,process);
		   
		   console.log(new_1.ItemSearchResponse.Items[0].Item[1].SmallImage[0].URL);
		   var str="{"+"\"URL\":"+"\""+new_1.ItemSearchResponse.Items[0].Item[1].SmallImage[0].URL+"\""+"}";
		   var obj=JSON.parse(str);
		   var tweet={url:new_1.ItemSearchResponse.Items[0].Item[1].SmallImage[0].URL};
		   console.log(str);
		   console.log(obj);
		    
		   client.emit('amazonData',tweet);
		    
		    
		  }
		 // console.log(error);
		})
		
	});
	
});

server.listen(8080);