gb.Namespace(gb,"gb.ws.ChatClient");
gb.ws.ChatClient = new gb.Class();

gb.ws.ChatClient.include({
    init: function() {

        var that = this;
        this.socket = io.connect(socketHost);
        this.conversation = $("#conversation");
        this.chatWindow = $("#chat-window");

        this.messageTemplate       = JST["handlebars/message.hbs"];
        this.systemMessageTemplate = JST["handlebars/systemMessage.hbs"];
        this.userLabelTemplate     = JST["handlebars/user-label.hbs"];

        this.socket.on('connect', function(){
            that.onConnect();
        });
        this.socket.on('updatechat',   function(username, data) {
            that.onUpdateChat(username, data);
        });
        this.socket.on('updatesystem', function(username, message) {
            that.onUpdateSystem(username, message);
        });
        this.socket.on('updateusers', function(data){
            that.onUpdateUsers(data);
        });
    },

    appendMessage: function(timestamp, username, message) {
        var obj = {
            ts: moment(timestamp).fromNow(),
            username: username,
            message: message
        };
        var jq = $(this.messageTemplate(obj));
        jq.prependTo(this.conversation);
        this.chatWindow.scrollTop(0);
    },

    onConnect: function() {
        this.socket.emit('adduser', username);
        this.username = username;

        var that = this;
        $.ajax("/members/messages",{
            dataType: "json",
            success: function(data) {
                for (var i=0,n=data.length; i<n; i++){
                    var ts = new Date(data[i].date).valueOf();
                    that.appendMessage(ts, data[i].from, data[i].message);
                }
                $(window).trigger("resizeEnd");
                $('#data').focus();
            }
        });
    },

    onUpdateChat: function (username, data) {
        this.appendMessage(new Date().valueOf(), username, data);
        $(window).trigger("resizeEnd");
    },

    onUpdateSystem: function (username, message) {
        var jq = $(this.systemMessageTemplate({message: message}));
        jq.prependTo('#system');
        $(window).trigger("resizeEnd");
    },

    onUpdateUsers: function(data) {
        var that = this;
        $('#users').empty();
        $.each(data, function(key, value) {
            var obj = {username: key};
            obj.labelType = "label-default";
            if (key === that.username) {
                obj.labelType = "label-primary";
            }
            $('#users').append(that.userLabelTemplate(obj));
        });
        $(window).trigger("resizeEnd");
    },

    emit: function(channel, message) {
        this.socket.emit(channel, message);
    },

    scrollChatWindow: function() {
        var el = this.conversation[0];
        el.scrollTop = el.scrollHeight;
    }
});

// on page load
$(function(){

    var chatClient = new gb.ws.ChatClient();
    var onResizeEndHandler = function(){
        var conversation = $("#conversation");
        var convWinHeight = gb.ui.screenHeight - conversation.offset().top - 20;
        conversation.height(convWinHeight);
        chatClient.scrollChatWindow();
    };

    $(window).on("resizeEnd", onResizeEndHandler);

    // clicks on SEND
    $('#datasend').click( function() {
        var message = $('#data').val();
        $('#data').val('');
        // tell server to execute 'sendchat' and send along one parameter
        chatClient.emit('sendchat', message);
    });

    // ENTER key
    $('#data').keypress(function(e) {
        if(e.which === 13) {
            $(this).blur();
            $('#datasend').click();
        }
    });
});
