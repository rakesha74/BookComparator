var aws = require("aws-lib");

prodAdv = aws.createProdAdvClient("AKIAI5NFUHV6OPHUMW4Q", "aY2AjjAPJm2VbjTCyZijc4A5A+7qaGId3T15efWp", "comaprebooks-21");

prodAdv.call("ItemSearch", {SearchIndex: "Books", Keywords: "Shiva Trilogy"}, function(err, result) {
  console.log(JSON.stringify(result));
})