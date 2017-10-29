$(function(){
    "use strict";

    gb.ui.onResizeHandler();
    var $window = $(window),
        contentManager = new gb.ui.ContentManager("#content");

    $window.resize(gb.util.throttle(gb.ui.onResizeHandler, 300));

    if ($("#stream").length) {

        var streamDiv = $("#stream"),
            instagramTemplate = JST["handlebars/streamInstagram.hbs"],
            twitterTemplate = JST["handlebars/streamTwitter.hbs"],
            vimeoTemplate = JST["handlebars/streamVimeo.hbs"];

        $window.on("resizeEnd", function(){
            var vimeoWidth = streamDiv.width() - 40,
                vimeoHeight = (vimeoWidth/16) * 9; // widescreen aspect ratio.

            streamDiv.find("iframe")
                .attr("width", vimeoWidth)
                .attr("height", vimeoHeight);
        });

        $.ajax({
            url: "/api/stream",
            success: function(data) {
                if (data && data.status === "ok") {
                    var items = data.data;
                    for (var i= 0,n=items.length; i<n; i++) {
                        var item = items[i],
                            content = "";
                        item.ago = moment(item.dateCreated).fromNow();
                        if (item.type === "instagram") {
                            content = $(instagramTemplate(item));
                        } else if (item.type === "twitter") {
                            item.permalink = (item.entities.urls.length) ? item.entities.urls[0].expanded_url : "";
                            content = $(twitterTemplate(item));
                        } else if (item.type === "vimeo") {
                            content = $(vimeoTemplate(item));
                        }
                        streamDiv.append(content);
                    }
                    var lazyImages = new gb.ui.LazyImage("img.lazy");
                    $window.trigger("resizeEnd");
                }
            }
        });
    }

});