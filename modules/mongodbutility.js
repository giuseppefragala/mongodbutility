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
 //Use connect method to connect to the server
  MongoClient.connect(url, exports.checkConnection = function(err, db) {
    if (err) return err;
    return "Connected successfully for method: CONNECTION TEST, to server"  + server + ", db: " + database;
    db.close();
  });
// ---------- CONNECTION TEST ---------------------------------------------------------------------------------------------------


// --------- FIND ALL COLLECTION - RETURN AN OBJECT WITH KEY-VALUE PAIRS ('NAME':'NAMEVALUE')-------------------------------------
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
// --------- FIND ALL COLLECTION - RETURN AN OBJECT WITH KEY-VALUE PAIRS ('NAME':'NAMEVALUE')-------------------------------------


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
    db.close();
  });
});
// --------- FIND ALL COLLECTION - RETURN AN OBJECT WITH THE NAME of the collections---------------------------------------------


// --------- INSERT A SINGLE DOCUMENT OR AN ARRAY OF DOCUMENT INTO A COLLECTION -------------------------------------------------
MongoClient.connect(url,function (err, db) {
  if(err) return err;
  exports.insertDocuments = function(collectionName, document) {
    // Get the documents collection
    var collection = db.collection(collectionName);
    // Insert the documents
    collection.insert(document, function (err, result) {
        db.close();
    });
    return "Inserted the documents: " + JSON.stringify(document) + " into the collection: " + collectionName;
  };  

});
// --------- INSERT A SINGLE DOCUMENT OR AN ARRAY OF DOCUMENT INTO A COLLECTION --------------------------------------------------

// --------- REMOVE ALL DOCUMENTS INTO A COLLECTION ------------------------------------------------------------------------------
MongoClient.connect(url,function (err, db) {
  if(err) return err;
  exports.removeAllDocuments = function(collectionName) {
    // Fetch a collection to insert document into
    var collection = db.collection(collectionName);
    // Remove all the document
    collection.removeMany();
    db.close();
    return "Removed all the documents into the collection: " + collectionName;
  };
});
// --------- INSERT ONE DOCUMENT INTO A COLLECTION ------------------------------------------------------------------------------

// --------- FIND ALL DOCUMENTS OF A COLLECTION ---------------------------------------------------------------------------------
MongoClient.connect(url,function (err, db) {
  if(err) return err;
  exports.findAllDocuments = function(collectionName, res) {
    // Get the documents collection
    var collection = db.collection(collectionName);
    var res;
    // Perform a simple find and return all the documents
    collection.find().toArray(function(err, docs) {      
        res = JSON.stringify(docs);
        db.close();
    });
    return res;
  };  
});
// --------- FIND ALL DOCUMENTS OF A COLLECTION ----------------------------------------------------------------------------------

