$(function(){
    "use strict";
    var contentManager = new gb.ui.ContentManager("#content"),
        $window = $(window);

    $window.resize(gb.util.throttle(gb.ui.onResizeHandler, 300));

    if ($("#stream").length) {

        var streamDiv = $("#stream"),
            instagramTemplate = JST["handlebars/stream-instagram.hbs"],
            twitterTemplate = JST["handlebars/stream-twitter.hbs"],
            vimeoTemplate = JST["handlebars/stream-vimeo.hbs"];

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
                    console.log("lazyImages...");
                    var lazyImages = new gb.ui.LazyImage("img.lazy");
                    $window.trigger("resizeEnd");
                }
            }
        });
    }

});