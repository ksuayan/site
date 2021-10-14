'use strict';

var conf = require('./conf'),
  mongodb = require('mongodb'),
  mongoose = require('mongoose');

var mongoClient = mongodb.MongoClient,
  server = mongodb.Server;

var MongoConnection = function () {
  var that = this,
    mongoOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };

  this.mongoose = mongoose;
  this.mongoClient = mongoClient;
  this.server = server;

  console.log('mongoURL', conf.mongoURL);

  this.mongoClient.connect(conf.mongoURL, mongoOptions, function (err, client) {
    if (err) {
      console.log('MongoDB error', err);
      return;
    }
    that.db = client.db('site');
    console.log('Initialized MongoDB Connection.');
    that.mongooseConnection = mongoose.connection;
    that.mongooseConnection.on(
      'error',
      console.error.bind(console, 'Connection error.')
    );
    that.mongooseConnection.once('open', function () {
      console.log('Mongoose Connected.');
    });
    that.mongooseConnection.once('close', function () {
      console.log('Closing Mongoose.');
    });
    mongoose.connect(conf.mongoURL, mongoOptions);
  });
};

var mongodb = new MongoConnection();
module.exports = mongodb;
