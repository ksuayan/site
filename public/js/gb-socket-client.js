gb.Namespace(gb,"gb.ws.SocketClient");
gb.ws.SocketClient = new gb.Class();

gb.ws.SocketClient.include({

    init: function() {
        if (io) {
            console.log("Init gb.ws.SocketClient.");
            var that = this;
            this.socket = io.connect(socketHost);

            this.socket.on('connect', function(){
                that.onConnect();
            });

            this.socket.on('updatesystem', function(source, message) {
                that.onUpdateSystem(source, message);
            });
        }
    },

    appendMessage: function(timestamp, username, message) {
        var obj = {
            ts: moment(timestamp).fromNow(),
            username: username,
            message: message
        };
        // this.conversation.append(this.messageTemplate(obj));
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
        console.log("server", source, message);

    },

    emit: function(channel, message) {
        this.socket.emit(channel, message);
    }
});

// on page load
$(function(){

    var chatClient = new gb.ws.SocketClient();

    // clicks on SEND
//    $('#datasend').click( function() {
//        var message = $('#data').val();
//        $('#data').val('');
//        // tell server to execute 'sendchat' and send along one parameter
//        chatClient.emit('sendchat', message);
//    });

    // ENTER key
//    $('#data').keypress(function(e) {
//        if(e.which == 13) {
//            $(this).blur();
//            $('#datasend').focus().click();
//        }
//    });
});