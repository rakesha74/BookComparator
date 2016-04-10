/**
 * New node file
 */

var parseString = require('xml2js').parseString;
function amazon_parse(body){

	
	var new_1;
    
	   parseString(body, function (err, result) {
		   console.log("XML is converted to js");
	   
	   new_1=result;
	 
	   	});
	   
	
	   
	   console.log(new_1.ItemSearchResponse.Items[0].Item[1].SmallImage[0].URL);
	   var str="{"+"\"URL\":"+"\""+new_1.ItemSearchResponse.Items[0].Item[1].SmallImage[0].URL+"\""+"}";
	   var obj=JSON.parse(str);
	   var tweet={url:new_1.ItemSearchResponse.Items[0].Item[1].SmallImage[0].URL};
	   console.log(str);
	   console.log(obj);
	   
	   return tweet;
	
	
}

module.exports.amazon_module=amazon_parse;