/**
 * New node file
 */
//-----------------------------------------This file is for parsing the xml data from amazon website------------------

var crypto = require("crypto");
var request = require('request');
//var utils = require('./utils');
var encoding=require("encoding");
var fs = require("fs");
var path = "amazon_data.xml";
var path_new = "amazon_new_data.txt";
var parseString = require('xml2js').parseString;

var aa = [];

function process(key,value) {
	
	var data = key+":"+value+"\n";
	
	console.log(data);
	fs.appendFile(path_new, data, function(error) {
		if (error) {
		console.error("write error: " + error.message);
		} else {
		console.log("Successfully wrote " + path);
		}
		
		

    //console.log(key + " : "+value);
});
}

function traverse(o,func) {
    for (var i in o) {
        func.apply(this,[i,o[i]]);  
        if (o[i] !== null && typeof(o[i])=="object") {
            //going on step down in the object tree!!
            traverse(o[i],func);
        }
    }
}


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
    
  //  var data = key+":"+value+"\n";
	//console.log(data);
//    fs.writeFile(path, body, function(error) {
//		if (error) {
//		console.error("write error: " + error.message);
//		} else {
//		//console.log("Successfully wrote " + path);
//		}
//		});
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
   console.log(str);
   console.log(obj);
    
	
    
    
  }
 // console.log(error);
})