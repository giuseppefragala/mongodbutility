const util = require('util');
exports.myDateTime = function () {
    return Date();
};


var MongoClient = require('mongodb').MongoClient, assert = require('assert');

// Connection URL
var url = process.env.MONGODB_URI;
var server = url.split('@')[1].split('/')[0];
var database = url.split('@')[1].split('/')[1];

// ---------- CONNECTION TEST ----------------------------------------
// Use connect method to connect to the server

exports.checkConnection = function (){
  MongoClient.connect(url, function(err, db ) {
    assert.equal(null, err);
    return "YES";
      console.log("Connected successfully for method: CONNECTION TEST to server ");// + server + ", db: " + database;
    db.close();
  });
};

// ---------- CONNECTION TEST ----------------------------------------


// --------- FIND ALL COLLECTION -------------------------------------

//exports.findAllCollections = function (){return "Stacippa"};



MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  //console.log("Connected successfully for method: FIND ALL COLLECTION to server: "  + server + ", db: " + database);
    //exports.findAllCollections = function (){return "Stacippa"};
  //exports.findAllCollections = JSON.stringify(db.listCollections());
  
  db.collections(function (err, collections){
    collections.forEach(function(collection) {
         exports.findAllCollections = function(){
          console.log("findAllCollections: " + collection.s['name']);
        return "Collections: " + collection.s['name'] ;
      };  
    }); 
  });

  db.close();
});
// --------- FIND ALL COLLECTION -------------------------------------


var risultato = "no";

MongoClient.connect(url,function (err, db) {
  return "Evviva";
  assert.equal(null, err);
  //console.log("Connected successfully for method: LIST ALL COLLECTION to server: "  + server + ", db: " + database);
      // Return the information of a all collections, using the callback format
        db.listCollections().toArray(function(err, items){
        //console.log(JSON.stringify(items));
        exports.findAll = JSON.stringify(items);
        items.forEach(function(collection) {
          console.log("findALL: " +  JSON.stringify(collection.name));
      }); 
        db.close() ;
      });
});
//console.log(risultato());