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
  			{"_id":11,"prova":"valore_di_prova1"},
  			{"_id":22,"prova":"valore_di_prova2"},
  			{"_id":33,"prova":"valore_di_prova3"},
  			{"_id":44,"prova":"valore_di_prova4"},
  			{"_id":55,"prova":"valore_di_prova5"}
  		] ) + "</p>" + ""
  
  
  
  
  );
	//--------------------------------------------------------------------------------------

});


app.listen(process.env.PORT || 3000)
console.log("Server is listening you!");