/**
 * New node file
 */
//----------------------------------This file is for parsing the json data from flipkart site------------------------ 

var request = require('request');
var fs = require("fs");
//var path = "flipkart_data.txt";

var options = {
  url: 'https://affiliate-api.flipkart.net/affiliate/1.0/search.json?query=2+states&resultCount=5',
  headers: {
    'Fk-Affiliate-Id': 'rakesha74',
    'Fk-Affiliate-Token': 'd8a4d752f8fe44b2906308106d0d64d8'
  }
};

/*
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
*/
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {

	  var books = {
			    title: [],
			    author:[],
			    images:[],
			    price:[],
			    link:[],
			    inStock:[]
			};
	
	 var profile=JSON.parse(body);
	
	for(i=0;i<5;i++)
		{
		books.title.push(profile["productInfoList"][i]["productBaseInfoV1"]["title"])
		if(profile["productInfoList"][0]["categorySpecificInfoV1"]["booksInfo"])
			{
			books.author.push(profile["productInfoList"][i]["categorySpecificInfoV1"]["booksInfo"]["authors"][0])
			}else
				{
				books.author.push("");
				}
		books.images.push(profile["productInfoList"][i]["productBaseInfoV1"]["imageUrls"]["400x400"])
		books.price.push(profile["productInfoList"][i]["productBaseInfoV1"]["flipkartSellingPrice"]["amount"])
		books.link.push(profile["productInfoList"][i]["productBaseInfoV1"]["productUrl"])
		books.inStock.push(profile["productInfoList"][i]["productBaseInfoV1"]["inStock"])
		}
	
	// console.log(profile["productInfoList"][0]["productBaseInfoV1"]["title"]);
	// console.log(profile["productInfoList"][0]["categorySpecificInfoV1"]["booksInfo"]["authors"][0])
	//  console.log(profile["productInfoList"][0]["productBaseInfoV1"]["flipkartSellingPrice"]["amount"]);
	// console.log(profile["productInfoList"][0]["productBaseInfoV1"]["imageUrls"]["400x400"]);
	// console.log(profile["productInfoList"][0]["productBaseInfoV1"]["productUrl"]);
	// console.log(profile["productInfoList"][0]["productBaseInfoV1"]["inStock"]);
	// var new_1=profile;
	
	if(profile["productInfoList"][0]["categorySpecificInfoV1"]["booksInfo1"])
		console.log("rakesh");
	else
		console.log("not exist");
	
	//console.log(new_1.productInfoList[1].productBaseInfo.productAttributes.title);
	
	console.log(books);
	  
  }
 
}

request(options, callback);