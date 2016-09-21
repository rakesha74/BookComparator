/**
 * New node file
 */
var Crawler = require("simplecrawler");
var fs = require("fs");

//var data = "My Name is Rakesh Agarwal";
//fs.writeFile(path, data, function(error) {
//if (error) {
//console.error("write error: " + error.message);
//} else {
//console.log("Successfully wrote " + path);
//}
//});

//
//Crawler.crawl("http://www.flipkart.com/books")
//    .on("fetchcomplete", function(queueItem) {
//        console.log("Completed fetching resource:", queueItem.url);
//    });

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

var crawler = Crawler.crawl("http://www.flipkart.com");
var path = "index_new.html";
crawler.maxDepth=1;

crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
    console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
    var textChunk = responseBuffer.toString('utf8');
    console.log("It was a resource of type %s", response.headers['content-type']);
   console.log(textChunk);
    
    fs.writeFile(path, textChunk, function(error) {
    	if (error) {
    		console.error("write error: " + error.message);
    		} else {
    			console.log("Successfully wrote " + path);
    		}
    });
    	
    // Do something with the data in responseBuffer
});

