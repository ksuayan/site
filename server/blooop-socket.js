/**
 * A socket.io server.
 * @constructor
 */

var SocketServer = function() {
    console.log("Init SocketServer ...");
};

SocketServer.prototype.listen = function(server) {
    var that = this;

    var onConnection = function(socket) {
        console.log("SocketServer connected.");

        var onSendChat = function(data) {
            // we tell the client to execute 'updatechat' with 2 parameters
            that.io.sockets.emit('updatechat', socket.username, data);
        };

        var onDisconnect = function() {
            // update list of users in chat, client-side
            that.io.sockets.emit('updateusers', that.usernames);
            // echo globally that this client has left
            socket.broadcast.emit('updatesystem', 'FireTree', socket.username + ' left.');
            console.log("SocketServer disconnected.");
        };

        // when the client emits 'sendchat', this listens and executes
        socket.on('sendchat', onSendChat);

        // when the user disconnects.. perform this
        socket.on('disconnect', onDisconnect);

        socket.broadcast.emit('updatesystem', 'Blooop!', "You're connected to Blooop!");

    };
    this.io = require('socket.io').listen(server);
    this.io.sockets.on('connection', onConnection);
};


SocketServer.prototype.broadcast = function(messageObj) {
    // console.log("broadcast", messageObj);
    this.io.sockets.emit(messageObj.channel, messageObj.source, messageObj.message);
};

module.exports = new SocketServer();