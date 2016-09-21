/**
 * New node file
 */
var crypto = require("crypto");

var data ={
		key: 'gtKFFx', 
		txnid:'234569',
		//txnid:req.body.txnid,
		amount:'1000',
		productinfo:'X',
		firstname:'Rakesh',
		email:'rakesha74@gmail.com',
		phone:'9660027375',
		surl: 'www.google.com',
		furl: 'foo.html',
		hash: '64e4ae1c2cf02d956a7b42dfb776bb04ffd46ef1454bbc76b6e247dd6fdcc7be34a75d5143332a3dc4756dfe4a2ba8365b9dd7d338f135ccb1020d71b5f9374d',
		service_provider:''
	};
console.log(data.key);
var hashkey=data.key+'|'+data.txnid+'|'+data.amount+'|'+data.productinfo+'|'+data.firstname+'|'+data.email+'|||||||||||'+'eCwWELxi';
console.log(hashkey);
var hash=crypto.createHash('sha512');

var hash=hash.update(hashkey).digest("hex");


//var signature=encodeURIComponent(hash);
console.log(hash);


//hash: '64e4ae1c2cf02d956a7b42dfb776bb04ffd46ef1454bbc76b6e247dd6fdcc7be34a75d5143332a3dc4756dfe4a2ba8365b9dd7d338f135ccb1020d71b5f9374d'