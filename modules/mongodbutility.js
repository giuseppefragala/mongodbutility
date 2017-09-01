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
var checkMessageToReturn;
exports.checkConnection = function (){	
	checkConnectionInternalFunction(function(error, checkMessageFromCallBack){
		if(error) return error;
		checkMessageToReturn = checkMessageFromCallBack;
	})
	return checkMessageToReturn;
}

function checkConnectionInternalFunction(callback){
	MongoClient.connect(url, function(err, db) {
	if(err)
	{
		callback(err,null);
	}
	if(db)
	{      
		callback(null, "Connected successfully for method: CONNECTION TEST, to server"  + server + ", db: " + database);
		db.close();
	}
	});
}
// ---------- CONNECTION TEST ---------------------------------------------------------------------------------------------------

// --------- FIND ALL COLLECTION - RETURN AN OBJECT WITH KEY-VALUE PAIRS ('NAME':'NAMEVALUE')-------------------------------------
var collectionsToReturn;
exports.findAllCollections = function (){	
	findAllCollectionsInternalFunction(function(error, collectionsFromCallBack){
		if(error) return error;
		collectionsToReturn = collectionsFromCallBack;
	})
	return collectionsToReturn;
}

function findAllCollectionsInternalFunction(callback){
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
		if(err) return err;
		if(db){
			var collectionsArray = [];
			db.collections(function (err, getCollections){
			    getCollections.forEach(function(getCollection) {
				    var collectionsObject = {};
				    collectionsObject['name'] = getCollection.s['name'];
				    collectionsArray.push(collectionsObject);
			    });
			    callback(null, JSON.stringify(collectionsArray));
			   	db.close();
			})
		}
	  });
}
// --------- FIND ALL COLLECTION - RETURN AN OBJECT WITH KEY-VALUE PAIRS ('NAME':'NAMEVALUE')-------------------------------------


// --------- FIND ALL COLLECTION - RETURN AN ARRAY WITH THE NAME OF THE COLLECTIONS---------------------------------------------
var collectionsNameToReturn;
exports.findAllCollectionsName = function (){	
	findAllCollectionsNameInternalFunction(function(error, collectionsNameFromCallBack){
		if(error) return error;
		collectionsNameToReturn = collectionsNameFromCallBack;
	})
	return collectionsNameToReturn;
}

function findAllCollectionsNameInternalFunction(callback){
	MongoClient.connect(url,function (err, db) {
		assert.equal(null, err);
		if(err) return err;
		db.listCollections().toArray(function(err, collections){
			var collectionsNameArray = [];
			collections.forEach(function(collection) {
				collectionsNameArray.push(collection.name);
			});
			callback(null, JSON.stringify(collectionsNameArray));
			db.close();
		});
	});
}
// --------- FIND ALL COLLECTION - RETURN AN ARRAY WITH THE NAME OF THE COLLECTIONS---------------------------------------------


// --------- INSERT A SINGLE DOCUMENT OR AN ARRAY OF DOCUMENT INTO A COLLECTION -------------------------------------------------
var insertionMessageToReturn;
exports.insertDocuments = function (collectionName, documents){	
	insertDocumentsInternalFunction(collectionName, documents, function(error, insertionMessageFromCallBack){
		if(error) return error;
		insertionMessageToReturn = insertionMessageFromCallBack;
	})
	return insertionMessageToReturn;
}
function insertDocumentsInternalFunction(collectionName, documents, callback){
	MongoClient.connect(url,function (err, db) {
	  if(err) return err;
	    // Get the documents collection
	    var collection = db.collection(collectionName);
	    // Insert the documents
	    collection.insert(documents, function(err, result) {
	    	if(err) return err;
	    	callback(null, "Inserted the documents: " + JSON.stringify(documents) + " into the collection: " + collectionName);	    	
	        db.close();
	    });
	});
}
// --------- INSERT A SINGLE DOCUMENT OR AN ARRAY OF DOCUMENT INTO A COLLECTION --------------------------------------------------

// --------- REMOVE ALL DOCUMENTS INTO A COLLECTION ------------------------------------------------------------------------------
var removeMessageToReturn;
exports.removeAllDocuments = function (collectionName){	
	removeAllDocumentsInternalFunction(collectionName, function(error, removeMessageFromCallBack){
		if(error) return error;
		removeMessageToReturn = removeMessageFromCallBack;
	})
	return removeMessageToReturn;
}

function removeAllDocumentsInternalFunction(collectionName, callback) {
	MongoClient.connect(url, function(err, db) {
		if(err) return err;
		// Fetch a collection to insert document into
		var collection = db.collection(collectionName);
		// Remove all the document
		collection.removeMany();
		callback(null, "Removed all the documents into the collection: " + collectionName);		
		db.close();
	});
}
// --------- INSERT ONE DOCUMENT INTO A COLLECTION ------------------------------------------------------------------------------

// --------- FIND ALL DOCUMENTS OF A COLLECTION ---------------------------------------------------------------------------------
var documentsFoundToReturn;
exports.findAllDocuments = function (collectionName){	
	findAllDocumentsInternalFunction(collectionName, function(error, documentsFoundFromCallBack){
		if(error) return error;
		documentsFoundToReturn = documentsFoundFromCallBack;
	})
	return documentsFoundToReturn;
}

function findAllDocumentsInternalFunction(collectionName, callback) {
	MongoClient.connect(url, function (err, db) {
	  if(err) return err;
	    // Get the documents collection
	    var collection = db.collection(collectionName);
	    // Perform a simple find and return all the documents
	    collection.find({}).toArray(function(err, docsToCallBack) {
	        if(err)
      		{
        		callback(err, null);
      		}
      		if(docsToCallBack)
      			console.log("docsToCallBack" + JSON.stringify(docsToCallBack))
      		{      
	        	callback(null, JSON.stringify(docsToCallBack));
	        	db.close();
	    	}
	    });
	});
};

// --------- FIND ALL DOCUMENTS OF A COLLECTION ----------------------------------------------------------------------------------

