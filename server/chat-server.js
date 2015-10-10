

var ChatServer = function() {
    console.log("Initialized ChatServer");
    this.usernames = {};
};

ChatServer.prototype.listen = function(server) {
    var that = this;

    var onConnection = function(socket) {

        console.log("connection created.");

        // say hello back
        var onHello = function(data) {
            that.io.sockets.emit('hello', {"message": "Today's weather..."});
        };

        var onSendChat = function(data) {
            // we tell the client to execute 'updatechat' with 2 parameters
            that.io.sockets.emit('updatechat', socket.username, data);
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

        socket.on('hello', onHello);

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

ChatServer.prototype.message = function(message) {
    console.log("system", message);
    this.io.sockets.emit('system', {"message": message});
};

var chatServer = new ChatServer();
module.exports = chatServer;