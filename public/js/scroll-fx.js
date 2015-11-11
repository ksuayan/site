$(function(){

    var lookup = [];
    var loadDivs = function() {
        for (var i=0; i<50; i++) {
            var id = "media-"+ i,
                content = "<div id='"+id+"' class='media inactive'>"+
                "<h2>Sample Section "+ i +"</h2>"+
                "<div class='placeholder'></div>"+
                "</div>",
                jq = $(content);

            $("#stream").append(jq);

            var top = jq.offset().top,
                bottom = top + jq.height(),
                entry = {
                    top: top,
                    bottom: bottom,
                    index: i,
                    activated: false
                };
            lookup.push(entry);
        }
    };

    var inViewport = function(top, bottom, entry) {
        var advance = 200;
        return (entry.bottom - advance <= bottom && entry.top >= top);
    };

    var activate = function(idx) {
        var target = $("#media-"+idx);
        lookup[idx].activated = true;
        target.transit({opacity:1}, 1000, function(){
            target.removeClass("inactive");
        });
    };

    var onScrollHandler = function(){
        var docViewTop = $win.scrollTop(),
            docViewBottom = docViewTop + $win.height();
        // console.log("scroll>>", docViewTop, docViewBottom);
        for (var i= 0, n=lookup.length; i<n; i++) {
            if (inViewport(docViewTop, docViewBottom, lookup[i])) {
                if (!lookup[i].activated) {
                    console.log("activate: ", i, lookup[i].top, lookup[i].bottom);
                    activate(i);
                }
            }
        }
    };

    loadDivs();

    var $win = $(window);
    $win.scroll(onScrollHandler);
    onScrollHandler();
});