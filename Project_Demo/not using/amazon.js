/**
 * New node file
 */
//-----------------------------------This file is for making request to get data from amazon---------------------------- 
var aa = [];
var crypto = require("crypto");
//var utils = require('./utils');
var encoding=require("encoding");
var key="So8x6mqlUXdZ8T9babRjrfdfygvxXNg2JoCCtU+C";
// these are part of the array's body/contents
aa[0] = "GET\n" +
		"webservices.amazon.in\n" +
		"/onca/xml\n" +
		"AWSAccessKeyId=AKIAIEMV6LX5RSO7JDTA&AssociateTag=comaprebook09" +
		"-21&Keywords=Shiva%20Trilogy&Operation=ItemSearch&ResponseGroup=Images%2CItemAttributes%2COffers&SearchIndex=Books&Service=AWSEComme" +
		"rceService&Timestamp=2015-11-04T16%3A54%3A15.000Z&Version=2011-08-01";
var hash = crypto.createHmac("sha256", key);
var str=aa.toString();
//hash.update(toSign).digest("base64");
var hash=hash.update(str).digest("base64");
//encoding.convert(hash, 'ASCII', 'UTF-8');
//console.log(hash.toString("utf8"));
console.log("\n"+encodeURIComponent(new Date().toISOString()));
console.log(encodeURIComponent(hash));