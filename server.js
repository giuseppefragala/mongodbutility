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
    "<p>" + "findAllConnectionsName: " + mongo.findAllConnectionsName + "</p>" + ""  
  
  
  
  
  
  );
	//--------------------------------------------------------------------------------------

});


app.listen(process.env.PORT || 3000)
console.log("Server is listening you!");