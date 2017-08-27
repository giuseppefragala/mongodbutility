var express = require('express');
var app = express();
var path = require('path');



app.set('views', __dirname + '/');


app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/index.htm'));
});

app.get('/list', function(req, res) {

	//--------------------------------------------------------------------------------------
	res.send("Hallo");
	//--------------------------------------------------------------------------------------

});


app.listen(process.env.PORT || 3000)
console.log("Server is listening you!");