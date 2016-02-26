/**
 * New node file
 */
//-------------------------------------This file is for getting xml response from amazon website----------------------
var crypto = require("crypto");
var request = require('request');
//var utils = require('./utils');
var encoding=require("encoding");

var aa = [];

var key="So8x6mqlUXdZ8T9babRjrfdfygvxXNg2JoCCtU+C";
// these are part of the array's body/contents
var date=encodeURIComponent(new Date().toISOString());

aa[0] = "GET\n" +
		"webservices.amazon.in\n" +
		"/onca/xml\n" +
		"AWSAccessKeyId=AKIAIEMV6LX5RSO7JDTA&AssociateTag=comaprebook09" +
		"-21&Keywords=Shiva%20Trilogy&Operation=ItemSearch&ResponseGroup=Images%2CItemAttributes%2COffers&SearchIndex=Books&Service=AWSEComme" +
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



var str="http://webservices.amazon.in/onca/xml?AWSAccessKeyId=AKIAIEMV6LX5RSO7JDTA&AssociateTag=comaprebook09-21&Keywords=Shiva%20Trilogy&Operation=ItemSearch&ResponseGroup=Images%2CItemAttributes%2COffers&SearchIndex=Books&Service=AWSECommerceService&Timestamp="+date+"&Version=2011-08-01&Signature="+signature;
console.log(str);
request(str, function (error, response, body) {
  if (!error && response.statusCode == 200) {
	  console.log("rakesh");
    console.log(body) // Show the HTML for the Google homepage.
  }
  console.log(error);
})