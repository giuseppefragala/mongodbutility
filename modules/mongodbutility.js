const util = require('util');
exports.myDateTime = function () {
    return Date();
};


var MongoClient = require('mongodb').MongoClient, assert = require('assert');

// Connection URL
var url = process.env.MONGODB_URI;
var server = url.split('@')[1].split('/')[0];
var database = url.split('@')[1].split('/')[1];


// ---------- CONNECTION TEST --------------------------------------------------------------------------------------------------
// Use connect method to connect to the server
  MongoClient.connect(url, exports.checkConnection = function(err, db ) {
    assert.equal(null, err);
    if(err) return err;
    return "Connected successfully for method: CONNECTION TEST to server ";// + server + ", db: " + database;
    db.close();
  });
// ---------- CONNECTION TEST ---------------------------------------------------------------------------------------------------


// --------- FIND ALL COLLECTION - RETURN ANOBJECT WITH KEY-VALUE PAIRS ('NAME':'NAMEVALUE')-------------------------------------
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  if(err) return err;
  var colls = [];
  db.collections(function (err, getcollections){
    getcollections.forEach(function(getcollection) {
      var coll = {};
      coll['name'] = getcollection.s['name'];
      colls.push(coll);
    });
    exports.findAllCollections = JSON.stringify(colls);
  });
  db.close();
});
// --------- FIND ALL COLLECTION - RETURN ANOBJECT WITH KEY-VALUE PAIRS ('NAME':'NAMEVALUE')-------------------------------------


// --------- FIND ALL COLLECTION - RETURN AN OBJECT WITH THE NAME of the collections---------------------------------------------
MongoClient.connect(url,function (err, db) {
  assert.equal(null, err);
  if(err) return err;
  db.listCollections().toArray(function(err, items){
    var collectionsName = [];
    items.forEach(function(collection) {
      collectionsName.push(collection.name);
    });
    exports.findAllConnectionsName = JSON.stringify(collectionsName);
    db.close() ;
  });
});
// --------- FIND ALL COLLECTION - RETURN AN OBJECT WITH THE NAME of the collections---------------------------------------------


// --------- INSERT ONE DOCUMENT INTO A COLLECTION ------------------------------------------------------------------------------
MongoClient.connect(url,function (err, db) {
  if(err) return err;
  exports.insertDocuments = function(collectionName, document) {
    var the_result;
    // Get the documents collection
    var collection = db.collection("firstDamnCollection");
    // Insert the documents
      collection.insertMany(document, function (err, result) {
      db.close() ;
    })
    return "Inserted the documents: " + JSON.stringify(document) + " into the collection: " + collectionName;
  };  

});
// --------- INSERT ONE DOCUMENT INTO A COLLECTION ------------------------------------------------------------------------------