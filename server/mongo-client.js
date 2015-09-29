"use strict";

var conf = require('./conf'),
    mongodb = require('mongodb'),
    mongoClient = mongodb.MongoClient,
    server = mongodb.Server,
    mongoose = require('mongoose');

var MongoConnection = function(){
    var that = this;

    this.mongoose = mongoose;
    this.mongoClient = mongoClient;
    this.server = server;


    this.mongoClient.connect(conf.mongoURL, {}, function(err, db){
        if (err) {
            console.log("MongoDB error", err);
            return;
        }

        that.db = db;
        console.log("Initialized MongoDB Connection.");

        mongoose.connect(conf.mongoURL, {db:{safe:true}});
        that.mongooseConnection = mongoose.connection;
        that.mongooseConnection.on('error', console.error.bind(console, 'Connection error.'));
        that.mongooseConnection.once('open', function(){
            console.log("Mongoose Connected.");
        });
        that.mongooseConnection.once('close', function(){
            console.log("Closing Mongoose.");
        });
    });
};

var mongodb = new MongoConnection();
module.exports = mongodb;