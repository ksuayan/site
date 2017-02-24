var mongoClient = require('./mongo-client'),
  mongoose = mongoClient.mongoose,
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  conf = require('./conf');

var MessageSchema = new Schema({
  from          : {type: String, default: ""},
  channel       : {type: String, default: ""},
  message       : {type: String, default: ""},
  date          : {type: Date, default: Date.now}
});

var ChatServer = function() {
  this.usernames = {};
  console.log("Initialized ChatServer");
  this.db = mongoose.createConnection(conf.mongoURL);
  this.MessageModel = this.db.model('message', MessageSchema);
};

ChatServer.prototype.listen = function(server) {
  var that = this;

  var onConnection = function(socket) {

    var onSendChat = function(data) {
      that.io.sockets.emit('updatechat', socket.username, data);
      that.saveMessage(socket.username, 'updatechat', data);
    };

    var onAddUser = function(username) {
      // we store the username in the socket session for this client
      socket.username = username;
      // add the client's username to the global list
      that.usernames[username] = username;
      // echo to client they've connected
      socket.emit('updatesystem', 'FireTree', 'You have connected.');
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('updatesystem', 'FireTree', username + ' has connected.');
      // update the list of users in chat, client-side
      that.io.sockets.emit('updateusers', that.usernames);
    };

    var onDisconnect = function() {
      // remove the username from global usernames list
      delete that.usernames[socket.username];
      // update list of users in chat, client-side
      that.io.sockets.emit('updateusers', that.usernames);
      // echo globally that this client has left
      socket.broadcast.emit('updatesystem', 'FireTree', socket.username + ' left.');
    };

    var onReplayMessages = function(replayMessages) {
      for (var i= 0,n=replayMessages.length; i<n; i++) {
        console.log("replay:", replayMessages[i]);
      }
    };

    // when the client emits 'sendchat', this listens and executes
    socket.on('sendchat', onSendChat);
    // when the client emits 'adduser', this listens and executes
    socket.on('adduser', onAddUser);
    // when the user disconnects.. perform this
    socket.on('disconnect', onDisconnect);
  };

  this.io = require('socket.io').listen(server);
  this.io.sockets.on('connection', onConnection);
};

ChatServer.prototype.saveMessage = function(from, channel, message ) {
  var messageObject = new this.MessageModel({
    from  : from,
    channel : channel,
    message : message
  });
  messageObject.save(function(err){
    if (err)
      console.log(err);
  });
};


ChatServer.prototype.getMessagesAPI = function(req, res) {
  this.getMessages(function(replayMessages){
    res.send(replayMessages);
  }, function(error) {
    res.send({error: error});
  });
};

ChatServer.prototype.getMessages = function(onSuccess, onError) {
  var messages = [],
      selectedFields = {date:1,from:1,message:1},
      pagination = {skip:0, pagination:10},
      earlier = (new Date().valueOf()) - (24* 60 * 60 * 1000), // one hour ago.
      stream = this.MessageModel.find({'date': {$gte: earlier}},
        selectedFields,
        pagination)
        .sort({'date':1})
        .stream();

  stream.on('data', function(doc){
    messages.push(doc);
  }).on('error', function(err){
    console.log("error", err);
    if (typeof onError === 'function') {
      onError(err);
    }
  }).on('close', function(){
    if (typeof onSuccess === 'function') {
      onSuccess(messages);
    }
  });
};


var chatServer = new ChatServer();
module.exports = chatServer;
