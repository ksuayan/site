$(function(){
    "use strict";
    var contentManager = new gb.ui.ContentManager("#content");
    $(window).resize(gb.util.throttle(gb.ui.onResizeHandler, 500));

    $.ajax({
        url: "/api/twitter",
        success: function(data) {

            if (data && data.status === "ok") {

                var tweetTemplate = JST["handlebars/tweet.hbs"],
                    tweets = data.data;
                console.log("data", data.data);
                for (var i= 0,n=tweets.length; i<n; i++) {

                    var dt = gb.util.parseTwitterDate(tweets[i]['created_at']),
                        permalink = (tweets[i].entities.urls.length) ? tweets[i].entities.urls[0].expanded_url : "";
                    tweets[i].ago = moment(dt).fromNow();
                    tweets[i].permalink = permalink;
                    $("#twitter").append($(tweetTemplate(tweets[i])));
                }

            }
        }
    });
});