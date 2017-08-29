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
"<p>" + "Date: " +mongo.myDateTime() + "</p>" + 
"<p>" + "Connection test: " +mongo.checkConnection() + "</p>" + 
"<p>" + "findAllCollections: " + mongo.findAllCollections + "</p>" +
"<p>" + "findAllConnectionsName: " + mongo.findAllConnectionsName + "</p>" +  
"<p>" + "insertDocuments: " + mongo.insertDocuments("firstDamnCollection", [
{"_id":11,"TEST":"TEST_VALUE_1"},
{"_id":22,"TEST":"TEST_VALUE_2"},
{"_id":33,"TEST":"TEST_VALUE_3"},
{"_id":44,"TEST":"TEST_VALUE_4"},
{"_id":55,"TEST":"TEST_VALUE_5"},
{"_id":66,"TEST":"TEST_VALUE_6"}  			
] ) + "</p>" +
"<p>" + "removeAllDocuments: " + mongo.removeAllDocuments("firstDamnCollection") + "</p>" +
"<p>" + "findAllDocuments: " + mongo.findAllDocuments("firstDamnCollection") + "</p>"   	 	 
  
  
  
  
  );
	//--------------------------------------------------------------------------------------

});


app.listen(process.env.PORT || 3000);
console.log("Server is listening you!");