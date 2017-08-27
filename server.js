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
    "<p>" + mongo.myDateTime() + "</p>" + 
    "<p>" + mongo.checkConnection() + "</p>" + 
    "<p>" + mongo.findAllCollections() + "</p>" + 
    "<p>" + mongo.findAll + "</p>" + ""  
  
  
  
  
  
  );
	//--------------------------------------------------------------------------------------

});


app.listen(process.env.PORT || 3000)
console.log("Server is listening you!");