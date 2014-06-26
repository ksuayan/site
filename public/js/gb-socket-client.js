gb.Namespace(gb,"gb.ws.SocketClient");
gb.ws.SocketClient = new gb.Class();

gb.ws.SocketClient.include({

    init: function() {
        var that = this;
        if (io) {
            console.log("Init gb.ws.SocketClient.");
            this.socket = io.connect(socketHost);

            this.socket.on('connect', function(){
                console.log("Client connected.");
                that.onConnect();
            });

            this.socket.on('updatesystem', function(source, message) {
                that.onUpdateSystem(source, message);
            });

            this.socket.on('broadcast', function(source,message) {
                console.log("broadcast", source, message);
            });
        }
    },

    appendMessage: function(timestamp, username, message) {
        var obj = {
            ts: moment(timestamp).fromNow(),
            username: username,
            message: message
        };
    },

    onConnect: function() {
        var that = this;
        $.ajax({
            url: "/api/logs",
            dataType: "json",
            success: function(data) {
            }
        });
    },

    onUpdateSystem: function (source, message) {
        console.log("updatesystem", source, message);
    },

    emit: function(channel, message) {
        this.socket.emit(channel, message);
    }
});


$(function(){
    var chatClient = new gb.ws.SocketClient();
});