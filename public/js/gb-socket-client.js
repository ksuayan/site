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
                that.updateCell(message);
                // console.log("broadcast", source, message);
            });
        }
    },

    updateCell: function(message) {
        var item = message.item,
            jq = $("#grid-"+item.group+"-"+item.host+"-"+item.path);
            jq.transition({
                opacity: 0,
                duration: 500
            });
            jq.text(message.statusCode + ": " + message.time);
            jq.transition({
                opacity: 1,
                duration: 1000,
                delay:500
            });
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
            url: "/api/config",
            dataType: "json",
            success: that.renderGrid
        });
    },

    onUpdateSystem: function (source, message) {
        console.log("updatesystem", source, message);
    },

    emit: function(channel, message) {
        this.socket.emit(channel, message);
    },

    renderGrid: function(data) {

        var groups = data.groups, grids = [];

        for (var g=0,gsize=groups.length; g<gsize; g++) {

            var groupName = groups[g].name,
                hosts = groups[g].hosts,
                paths = groups[g].paths,
                gridHeaders = [],
                gridRows = [];

            for (var h=0, hsize=hosts.length; h<hsize; h++) {
                gridHeaders.push(groupName+"-"+hosts[h]);
            }

            for (var p=0, psize=paths.length; p<psize; p++) {
                var gridCells = [];
                for (h=0, hsize=hosts.length; h<hsize; h++) {
                    gridCells.push({"cellName": groupName+"-"+hosts[h]+"-"+paths[p]});
                }
                gridRows.push({
                    "rowName": paths[p],
                    "gridCells": gridCells
                });
            }
            grids.push({
                "groupName": groupName,
                "gridHeaders": gridHeaders,
                "gridRows" : gridRows
            });
        }
        var template = JST["handlebars/gridGroups.hbs"];
        $("#grid").html(template({gridList:grids}));
    }
});

$(function(){
    var chatClient = new gb.ws.SocketClient();


});