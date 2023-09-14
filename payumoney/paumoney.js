/**
 * New node file
 */
var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var http = require('https'); 
var querystring = require('querystring'); 
var request = require('request');
var utf8 = require('utf8');
var express = require('express');
var servertrial = express();
var server = require('https').createServer(servertrial);
var formurlencoded = require('form-urlencoded');
var ejs = require('ejs');
var path = require('path');
var crypto = require("crypto");

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());
app.engine('html', ejs.renderFile);
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.post('/myaction', function(req, res) {
	console.log("Inside app Post");
	
	console.log(req.body.txnid);
	
	var key='gtKFFx'+'|'+req.body.txnid+'|'+req.body.amount+'|'+req.body.product+'|'+req.body.name+'|'+req.body.email+'|||||||||||'+'eCwWELxi';
	console.log(key);
	
	var hash=crypto.createHash('sha512');

	var keyhash=hash.update(key).digest("hex");


	//var signature=encodeURIComponent(hash);
	console.log(keyhash);
	
	var data ={
			key: 'gtKFFx', 
			//txnid:'234569',
			txnid:req.body.txnid,
			amount:req.body.amount,
			productinfo:req.body.product,
			firstname:req.body.name,
			email:req.body.email,
			phone:req.body.phone,
			surl: 'www.google.com',
			furl: 'http://localhost:8080/index.html',
			//hash: '64e4ae1c2cf02d956a7b42dfb776bb04ffd46ef1454bbc76b6e247dd6fdcc7be34a75d5143332a3dc4756dfe4a2ba8365b9dd7d338f135ccb1020d71b5f9374d',
			hash:keyhash,
			service_provider:''
		};
	
	//var key=data.key+'|'+data.txnid+'|'+data.amount+'|'+data.productinfo+'|'+data.firstname+'|'+data.email+'|||||||||||'+'eCwWELxi';
	//console.log(key);
	
	

	//var signature=encodeURIComponent(hash);
	//console.log(hash);
	
	request.post('https://test.payu.in/_payment', {form:data }, function(err,httpResponse,body){
		
		console.log(httpResponse);
		console.log(httpResponse["caseless"]["dict"]["location"]);
		
		//res.send('You sent the name "' + req.body.name + '".');
		//res.render(httpResponse["caseless"]["dict"]["location"]);
		
		res.writeHead(301,
				  {Location: httpResponse["caseless"]["dict"]["location"] }
				);
				res.end();
	})
  
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});

