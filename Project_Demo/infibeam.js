/**
 * New node file
 */
var htmlToJson = require('html-to-json');
var request = require('request');

var str="http://www.infibeam.com/Books/search?q=shiva%20trilogy";

request(str, function (error, response, body) {
	htmlToJson.parse(body, function() {
		
		var books = {
			    title: [],
			    author:[],
			    images:[],
			    price:[],
			    link:[],
			    inStock:[]
			};

		//var i=0;
		this.map('.title', function ($item) {
			
			books.title.push( 
		        
					$item.text()
					
		        
		    );
		});
		 
		//i=0;
		this.map('.author', function ($item) {
			
			books.author.push(
		        
				 
		        $item.text()
		    );
			
		  });
		
		this.map('.img-responsive', function ($item) {
			if($item.attr('border')=='0')
			{	
				
				books.images.push(	
					$item.attr('src')
								);
			}
			
		  });
		var i=0;
		this.map('.final-price', function ($item) {
			
			if(i%2==0){
			books.price.push(
		        
				 
		        $item.text()
		    );
			}
			i++;
		  });
		
		
		this.map('.see-detail', function ($item) {
			
			
			//console.log('rakesh');
			books.link.push(
		        "www.infibeam.com"+$item.parent()["0"].attribs.href
		    );
			
		  });
		
			this.map('.see-detail', function ($item) {
				if($item.parent().parent()["0"]["children"][3]["children"][0]["next"]){
			books.inStock.push( 
		        
					
				    $item.parent().parent()["0"]["children"][3]["children"][0]["next"]["next"]["data"]
				    	
							);
				}else
					books.inStock.push("\nOut of Stock\n");
		    
				
				
		});
			/*
			this.map('.see-detail', function ($item) {
				
				
			    if($item.parent().parent()["0"]["children"][3]["children"][0]["next"])
			    	{
			    	console.log($item.parent().parent()["0"]["children"][3]["children"][0]["next"]["next"]["data"]);
			    	}
			    else
			    	console.log("out of Stock");
			    	
					
			});
			*/
	
	console.log(books);
	
	console.log(books.title.length);
	console.log(books.author.length);
	console.log(books.images.length);
	console.log(books.price.length);
	console.log(books.link.length);
	console.log(books.inStock.length);
	//console.log(books["title"][0]);
	
	});
});
	  