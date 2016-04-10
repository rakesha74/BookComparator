/**
 * New node file
 */

function flipkart_parse(body){
	
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
		
	
		
		
		
		console.log(books);
		return books;
		
		  }
	

	 


module.exports.flipkart_module=flipkart_parse;



