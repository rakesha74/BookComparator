/**
 * New node file
 */

var parseString = require('xml2js').parseString;
function amazon_parse(body){

	var books = {
		    title: [],
		    author:[],
		    images:[],
		    price:[],
		    link:[]
		  
		};
	
	
	var new_1;
    
	   parseString(body, function (err, result) {
		   console.log("XML is converted to js");
	   
	   new_1=result;
	 
	   	});
	   
	
	   for(i=0;i<5;i++)
		{
		books.title.push(new_1.ItemSearchResponse.Items[0].Item[i].ItemAttributes[0].Title)
		
			books.author.push(new_1.ItemSearchResponse.Items[0].Item[i].ItemAttributes[0].Author)
			
		books.images.push(new_1.ItemSearchResponse.Items[0].Item[i].SmallImage[0].URL)
		books.price.push(new_1.ItemSearchResponse.Items[0].Item[i].OfferSummary[0].LowestNewPrice[0].FormattedPrice)
		books.link.push(new_1.ItemSearchResponse.Items[0].Item[i].Offers[0].MoreOffersUrl)
		
		}
	   
	   
	   console.log(books);
	  
	   
	   return books;
	
	
}

module.exports.amazon_module=amazon_parse;