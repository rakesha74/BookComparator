var request = require('request');

var options = {
  url: 'https://affiliate-api.flipkart.net/affiliate/search/json?query=shiva+trilogy&resultCount=5',
  headers: {
    'Fk-Affiliate-Id': 'rakesha74',
    'Fk-Affiliate-Token': 'd8a4d752f8fe44b2906308106d0d64d8'
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
//    var info = JSON.parse(body);

	//  var profiles=JSON.stringify(body);
	 var profile=JSON.parse(body);
	// console.log(profile_new.productInfoList.productBaseInfo);
	 var new_1=profile.productInfoList;
	 console.log(new_1);
	  
  }
  console.log(error);
}

request(options, callback);