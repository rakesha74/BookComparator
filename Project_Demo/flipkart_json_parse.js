/**
 * New node file
 */
//----------------------------------This file is for parsing the json data from flipkart site------------------------ 

var request = require('request');
var fs = require("fs");
var path = "flipkart_data.txt";

var options = {
  url: 'https://affiliate-api.flipkart.net/affiliate/search/json?query=shiva+trilogy&resultCount=5',
  headers: {
    'Fk-Affiliate-Id': 'rakesha74',
    'Fk-Affiliate-Token': 'd8a4d752f8fe44b2906308106d0d64d8'
  }
};

function process(key,value) {
	var data = key+":"+value+"\n";
	// console.log(data);
	fs.appendFile(path, data, function(error) {
		if (error) {
		console.error("write error: " + error.message);
		} else {
		//console.log("Successfully wrote " + path);
		}
		});
	
    //console.log(key + " : "+value);
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

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
//    var info = JSON.parse(body);
var aa=[];
	//  var profiles=JSON.stringify(body);
	 var profile=JSON.parse(body);
	// console.log(profile_new.productInfoList.productBaseInfo);
	 console.log(profile["productInfoList"][1]["productBaseInfo"]["productAttributes"]["title"]);
	 var new_1=profile;
	// aa=new_1.productBaseInfo;
	// traverse(new_1,process);
	console.log(new_1.productInfoList[1].productBaseInfo.productAttributes.title);
	  
  }
 // console.log(error);
}

request(options, callback);