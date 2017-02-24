gb.Namespace(gb,"gb.ws.ChatClient");
gb.ws.ChatClient = new gb.Class();

gb.ws.ChatClient.include({
    init: function() {
        var that = this;
        this.socket = io.connect(socketHost);
        this.socket.on('connect', function(){
            that.onConnect();
            $("<li class='list-group-item'>Connected.</li>").prependTo("#console");
        });

        this.socket.on('system', function(data) {
            console.log("system", data);
            var jq = $("<li class='list-group-item'>"+ data.message +"</li>");
            jq.prependTo('#console');
        });

        this.socket.on('hello', function(data) {
            var jq = $("<li class='list-group-item'>"+ data.message +"</li>");
            jq.prependTo('#console');
            console.log("hello", data);
        });
    },

    onConnect: function() {
        this.socket.emit('adduser', username);
        this.username = username;
        this.socket.emit('hello');
    },

    onUpdateSystem: function (username, message) {
        var jq = $(this.systemMessageTemplate({message: message}));
        jq.prependTo('#system');
        $(window).trigger("resizeEnd");
    },

    emit: function(channel, message) {
        this.socket.emit(channel, message);
    }
});

// on page load
$(function(){
    var chatClient = new gb.ws.ChatClient();
});