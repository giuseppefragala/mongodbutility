
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

// Connection URL
var server = 'mongodb://192.168.2.128:27017';
var database = "fccDB";
var url = server + '/' + database;

// ---------- CONNECTION TEST ----------------------------------------
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully for method: CONNECTION TEST to server: " + server + ", db: " + database);
  db.close();
});
// ---------- CONNECTION TEST ----------------------------------------


// --------- FIND ALL COLLECTION -------------------------------------
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully for method: FIND ALL COLLECTION to server: " + server + ", db: " + database);
  db.collections(function (err, collections){
  	collections.forEach(function(collection) {
    	console.log(collection.s['name']);
	}); 
  });

  db.close();
});
// --------- FIND ALL COLLECTION -------------------------------------




MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully for method: LIST ALL COLLECTION to server: " + server + ", db: " + database);
      // Return the information of a all collections, using the callback format
      db.listCollections().toArray(function(err, items) {
      	console.log("Collections:" + JSON.stringify(items));
		  	items.forEach(function(collection) {
		    	console.log(collection.name);
			}); 
        db.close();
      });
});