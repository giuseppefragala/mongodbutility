var express = require('express');
var app = express();
var path = require('path');
var mongo = require('./modules/mongodbutility');

app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/index.htm'));
});

app.get('/list', function(req, res) {
//--------------------------------------------------------------------------------------
res.send(

		"<p>" + "Date: " + mongo.myDateTime() + "</p>" + 
		"<p>" + "Connection test: " + mongo.checkConnection() + "</p>" + 
		"<p>" + "findAllCollections: " + mongo.findAllCollections() + "</p>" +
		"<p>" + "findAllConnectionsName: " + mongo.findAllCollectionsName() + "</p>" +  
		"<p>" + "removeAllDocuments: " + mongo.removeAllDocuments("firstDamnCollection") + "</p>" +		
		"<p>" + "insertDocuments: " + 
		mongo.insertDocuments("firstDamnCollection", [
		{"_id":111,"THE_KEY":"THE_VALUE_111"},
		{"_id":222,"THE_KEY":"THE_VALUE_222"},
		{"_id":333,"THE_KEY":"THE_VALUE_333"},
		{"_id":444,"THE_KEY":"THE_VALUE_444"},
		{"_id":555,"THE_KEY":"THE_VALUE_555"},
		{"_id":666,"THE_KEY":"THE_VALUE_666"}  			
		] ) + "</p>" +
		"<p>" + "findAllDocuments: " + mongo.findAllDocuments("firstDamnCollection") + "</p>" 
	
  
  );
//--------------------------------------------------------------------------------------

});


app.listen(process.env.PORT || 3000);
console.log("Server is listening you!");


