var jade = require('@lukekarrys/jade-runtime');

var templatizer = {};



// audio.jade compiled template
templatizer["audio"] = function tmpl_audio(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;
    var locals_for_with = locals || {};
    (function(config) {
        buf.push('<audio loop="loop" id="audio-player" autoplay=""><source' + jade.attr("src", config.streamHost + "/audio/20090530-Birds-Curry-Village.mp3", true, false) + ' type="audio/mpeg"/><source' + jade.attr("src", config.streamHost + "/audio/20090530-Birds-Curry-Village.ogg", true, false) + ' type="audio/ogg"/><source' + jade.attr("src", config.streamHost + "/audio/20090525-coyote-point-san-mateo.mp3', type='audio/mpeg", true, false) + "/><source" + jade.attr("src", config.streamHost + "/audio/20090525-coyote-point-san-mateo.ogg', type='audio/ogg", true, false) + "/></audio>");
    }).call(this, "config" in locals_for_with ? locals_for_with.config : typeof config !== "undefined" ? config : undefined);
    return buf.join("");
};

// body.jade compiled template
templatizer["body"] = function tmpl_body(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;
    var locals_for_with = locals || {};
    (function(fn, linkTitle, story, undefined) {
        if (story) {
            {
                if (linkTitle) {
                    {
                        buf.push("<h1><a" + jade.attr("href", "/page/" + story.name, true, false) + ">" + (null == (jade_interp = story.title) ? "" : jade_interp) + "</a></h1>");
                    }
                } else {
                    {
                        buf.push("<h1>" + (null == (jade_interp = story.title) ? "" : jade_interp) + "</h1>");
                    }
                }
            }
            buf.push("<p>" + (null == (jade_interp = fn.fromNow(story.dateCreated)) ? "" : jade_interp) + (null == (jade_interp = story.body) ? "" : jade_interp) + "</p>");
        }
        buf.push("");
        if (story && typeof story.content !== "undefined") {
            {
                (function() {
                    var $$obj = story.content;
                    if ("number" == typeof $$obj.length) {
                        for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                            var item = $$obj[$index];
                            if (item && typeof item.type !== "undefined") {
                                {
                                    jade_mixins[item.type](item);
                                }
                            }
                        }
                    } else {
                        var $$l = 0;
                        for (var $index in $$obj) {
                            $$l++;
                            var item = $$obj[$index];
                            if (item && typeof item.type !== "undefined") {
                                {
                                    jade_mixins[item.type](item);
                                }
                            }
                        }
                    }
                }).call(this);
            }
        }
    }).call(this, "fn" in locals_for_with ? locals_for_with.fn : typeof fn !== "undefined" ? fn : undefined, "linkTitle" in locals_for_with ? locals_for_with.linkTitle : typeof linkTitle !== "undefined" ? linkTitle : undefined, "story" in locals_for_with ? locals_for_with.story : typeof story !== "undefined" ? story : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
    return buf.join("");
};

// dev-scripts.jade compiled template
templatizer["dev-scripts"] = function tmpl_dev_scripts() {
    return '<script src="/js/dist/corelib.js"></script><script src="/js/dist/extras-site.js"></script><script src="/js/raphael-extensions.js"></script><script src="/js/gb.js"></script><script src="/js/gb-templates.js"></script><script src="/js/gb-util.js"></script><script src="/js/gb-ui.js"></script><script src="/js/gb-touch-surface.js"></script><script src="/js/gb-lazy-image.js"></script><script src="/js/gb-preloadable-image.js"></script><script src="/js/gb-tile.js"></script><script src="/js/gb-timeout-cycle.js"></script><script src="/js/jquery.fullscreen.js"></script><script src="/js/jquery.search.js"></script><script src="/js/gb-timeline.js"></script><script src="/js/gb-fullscreen.js"></script><script src="/js/gb-stage.js"></script><script src="/js/gb-content-manager.js"></script><script src="/js/main.js"></script>';
};

// errors.jade compiled template
templatizer["errors"] = function tmpl_errors(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;
    var locals_for_with = locals || {};
    (function(errors, undefined) {
        if (errors && errors.messages) {
            buf.push('<div class="alert alert-info"><ul>');
            (function() {
                var $$obj = errors.messages;
                if ("number" == typeof $$obj.length) {
                    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                        var message = $$obj[$index];
                        buf.push("<li>" + jade.escape((jade_interp = message) == null ? "" : jade_interp) + "</li>");
                    }
                } else {
                    var $$l = 0;
                    for (var $index in $$obj) {
                        $$l++;
                        var message = $$obj[$index];
                        buf.push("<li>" + jade.escape((jade_interp = message) == null ? "" : jade_interp) + "</li>");
                    }
                }
            }).call(this);
            buf.push("</ul></div>");
        }
    }).call(this, "errors" in locals_for_with ? locals_for_with.errors : typeof errors !== "undefined" ? errors : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
    return buf.join("");
};

// footer.jade compiled template
templatizer["footer"] = function tmpl_footer() {
    return '<div class="footer"><div class="container"><p>Kyo Suayan &copy; 2017. All rights reserved.</p></div></div>';
};

// gtm.jade compiled template
templatizer["gtm"] = function tmpl_gtm() {
    return "<noscript><iframe src=\"//www.googletagmanager.com/ns.html?id=GTM-W9X98T\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-W9X98T');</script>";
};

// header.jade compiled template
templatizer["header"] = function tmpl_header(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;
    var locals_for_with = locals || {};
    (function(user) {
        buf.push('<div class="navbar navbar-inverse"><div class="navbar-header"><button data-toggle="collapse" data-target=".navbar-collapse" class="navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="/" class="navbar-brand">Kyo Suayan</a></div><div class="navbar-collapse collapse"><ul class="nav navbar-nav"><li class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle">Work<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="http://www.suayan.com/development/">Development</a></li><li><a href="http://www.suayan.com/portfolio/">Design</a></li></ul></li><li><a href="http://blogs.suayan.com">Blog</a></li><li><a href="/page/about">About</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle">Contact<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="https://www.facebook.com/ksuayan">Facebook</a></li><li><a href="https://www.linkedin.com/in/ksuayan">LinkedIn</a></li><li><a href="https://www.twitter.com/ksuayan">Twitter</a></li><li><a href="https://plus.google.com/+KyoSuayan">Google+</a></li><li><a href="https://www.github.com/ksuayan">GitHub</a></li><li class="divider"></li><li role="presentation" class="dropdown-header">Imagery</li><li><a href="http://visual.suayan.com">visual.suayan.com</a></li><li><a href="http://www.flickr.com/ksuayan">Flickr</a></li><li><a href="http://www.500px.com/ksuayan">500px</a></li><li><a href="https://ksuayan.tumblr.com">Tumblr</a></li><li><a href="https://instagram.com/ksuayan">Instagram</a></li><li><a href="https://www.pinterest.com/ksuayan/">Pinterest</a></li><li class="divider"></li><li role="presentation" class="dropdown-header">Audio Visual</li><li><a href="https://www.soundcloud.com/ksuayan">SoundCloud</a></li><li><a href="https://www.youtube.com/ksuayan">Youtube</a></li><li><a href="https://www.vimeo.com/ksuayan">Vimeo</a></li></ul></li>');
        if (user) {
            buf.push('<li><a href="/logout">Logout</a></li>');
        }
        buf.push("</ul></div></div>");
    }).call(this, "user" in locals_for_with ? locals_for_with.user : typeof user !== "undefined" ? user : undefined);
    return buf.join("");
};

// login.jade compiled template
templatizer["login"] = function tmpl_login(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;
    var locals_for_with = locals || {};
    (function(email, errors, everyauth, undefined) {
        if ("undefined" !== typeof errors && errors.length) {
            buf.push('<ul id="errors">');
            (function() {
                var $$obj = errors;
                if ("number" == typeof $$obj.length) {
                    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                        var error = $$obj[$index];
                        buf.push('<li class="error">' + jade.escape(null == (jade_interp = error) ? "" : jade_interp) + "</li>");
                    }
                } else {
                    var $$l = 0;
                    for (var $index in $$obj) {
                        $$l++;
                        var error = $$obj[$index];
                        buf.push('<li class="error">' + jade.escape(null == (jade_interp = error) ? "" : jade_interp) + "</li>");
                    }
                }
            }).call(this);
            buf.push("</ul>");
        }
        buf.push('<form action="/login" method="post"><div id="login"><label' + jade.attr("for", everyauth.password.loginFormFieldName, true, false) + '>Login</label><input type="text"' + jade.attr("name", everyauth.password.loginFormFieldName, true, false) + jade.attr("value", email, true, false) + '/></div><div id="password"><label' + jade.attr("for", everyauth.password.passwordFormFieldName, true, false) + '>Password</label><input type="password"' + jade.attr("name", everyauth.password.passwordFormFieldName, true, false) + '/></div><div id="submit"><input type="submit" name="Login"/></div></form>');
    }).call(this, "email" in locals_for_with ? locals_for_with.email : typeof email !== "undefined" ? email : undefined, "errors" in locals_for_with ? locals_for_with.errors : typeof errors !== "undefined" ? errors : undefined, "everyauth" in locals_for_with ? locals_for_with.everyauth : typeof everyauth !== "undefined" ? everyauth : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
    return buf.join("");
};

// map-toolbar.jade compiled template
templatizer["map-toolbar"] = function tmpl_map_toolbar() {
    return '<form id="geocode" role="form" class="form-inline"><div class="form-group"><div class="dropdown"><button id="screen-menu" type="button" data-toggle="dropdown" aria-expanded="true" class="btn btn-default dropdown-toggle">Home Screen &nbsp;<span class="caret"></span></button><ul id="screen-list" role="menu" aria-labelledby="screen-menu" class="dropdown-menu"></ul></div></div><div class="form-group"><input id="address" type="textbox" placeholder="Address" class="form-control"/>&nbsp;<button id="go" class="btn btn-default"><span class="glyphicon glyphicon-search"></span>&nbsp; Find</button></div><div class="form-group"><button data-toggle="collapse" data-target="#notes" aria-expanded="false" aria-controls="collapseNotes" class="btn"><span class="glyphicon glyphicon-filter"></span>&nbsp; Filter</button>&nbsp;<button id="center" class="btn"><span class="glyphicon glyphicon-globe"></span>&nbsp; Locate Me</button>&nbsp;<button id="add" class="btn"><span class="glyphicon glyphicon-screenshot"></span>&nbsp; Center</button>&nbsp;<button id="home" class="btn"><span class="glyphicon glyphicon-home"></span>&nbsp; Home</button>&nbsp;<button id="directions" class="btn"><span class="glyphicon glyphicon-road"></span>&nbsp; Directions</button></div></form>';
};

// mixins.jade compiled template
templatizer["mixins"] = function tmpl_mixins(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;
    return buf.join("");
};

// nav.jade compiled template
templatizer["nav"] = function tmpl_nav(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;
    var locals_for_with = locals || {};
    (function(user) {
        buf.push('<ul class="nav navbar-nav"><li class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle">Work<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="http://www.suayan.com/development/">Development</a></li><li><a href="http://www.suayan.com/portfolio/">Design</a></li></ul></li><li><a href="http://blogs.suayan.com">Blog</a></li><li><a href="/page/about">About</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle">Contact<span class="caret"></span></a><ul class="dropdown-menu"><li><a href="https://www.facebook.com/ksuayan">Facebook</a></li><li><a href="https://www.linkedin.com/in/ksuayan">LinkedIn</a></li><li><a href="https://www.twitter.com/ksuayan">Twitter</a></li><li><a href="https://plus.google.com/+KyoSuayan">Google+</a></li><li><a href="https://www.github.com/ksuayan">GitHub</a></li><li class="divider"></li><li role="presentation" class="dropdown-header">Imagery</li><li><a href="http://visual.suayan.com">visual.suayan.com</a></li><li><a href="http://www.flickr.com/ksuayan">Flickr</a></li><li><a href="http://www.500px.com/ksuayan">500px</a></li><li><a href="https://ksuayan.tumblr.com">Tumblr</a></li><li><a href="https://instagram.com/ksuayan">Instagram</a></li><li><a href="https://www.pinterest.com/ksuayan/">Pinterest</a></li><li class="divider"></li><li role="presentation" class="dropdown-header">Audio Visual</li><li><a href="https://www.soundcloud.com/ksuayan">SoundCloud</a></li><li><a href="https://www.youtube.com/ksuayan">Youtube</a></li><li><a href="https://www.vimeo.com/ksuayan">Vimeo</a></li></ul></li>');
        if (user) {
            buf.push('<li><a href="/logout">Logout</a></li>');
        }
        buf.push("</ul>");
    }).call(this, "user" in locals_for_with ? locals_for_with.user : typeof user !== "undefined" ? user : undefined);
    return buf.join("");
};

// stories.jade compiled template
templatizer["stories"] = function tmpl_stories(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;
    var locals_for_with = locals || {};
    (function(fn, linkTitle, stories, undefined) {
        if (stories && stories.length > 0) {
            {
                (function() {
                    var $$obj = stories;
                    if ("number" == typeof $$obj.length) {
                        for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                            var story = $$obj[$index];
                            if (story) {
                                {
                                    if (linkTitle) {
                                        {
                                            buf.push("<h1><a" + jade.attr("href", "/page/" + story.name, true, false) + ">" + (null == (jade_interp = story.title) ? "" : jade_interp) + "</a></h1>");
                                        }
                                    } else {
                                        {
                                            buf.push("<h1>" + (null == (jade_interp = story.title) ? "" : jade_interp) + "</h1>");
                                        }
                                    }
                                }
                                buf.push("<p>" + (null == (jade_interp = fn.fromNow(story.dateCreated)) ? "" : jade_interp) + (null == (jade_interp = story.body) ? "" : jade_interp) + "</p>");
                            }
                            buf.push("");
                            if (story && typeof story.content !== "undefined") {
                                {
                                    (function() {
                                        var $$obj = story.content;
                                        if ("number" == typeof $$obj.length) {
                                            for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                                                var item = $$obj[$index];
                                                if (item && typeof item.type !== "undefined") {
                                                    {
                                                        jade_mixins[item.type](item);
                                                    }
                                                }
                                            }
                                        } else {
                                            var $$l = 0;
                                            for (var $index in $$obj) {
                                                $$l++;
                                                var item = $$obj[$index];
                                                if (item && typeof item.type !== "undefined") {
                                                    {
                                                        jade_mixins[item.type](item);
                                                    }
                                                }
                                            }
                                        }
                                    }).call(this);
                                }
                            }
                        }
                    } else {
                        var $$l = 0;
                        for (var $index in $$obj) {
                            $$l++;
                            var story = $$obj[$index];
                            if (story) {
                                {
                                    if (linkTitle) {
                                        {
                                            buf.push("<h1><a" + jade.attr("href", "/page/" + story.name, true, false) + ">" + (null == (jade_interp = story.title) ? "" : jade_interp) + "</a></h1>");
                                        }
                                    } else {
                                        {
                                            buf.push("<h1>" + (null == (jade_interp = story.title) ? "" : jade_interp) + "</h1>");
                                        }
                                    }
                                }
                                buf.push("<p>" + (null == (jade_interp = fn.fromNow(story.dateCreated)) ? "" : jade_interp) + (null == (jade_interp = story.body) ? "" : jade_interp) + "</p>");
                            }
                            buf.push("");
                            if (story && typeof story.content !== "undefined") {
                                {
                                    (function() {
                                        var $$obj = story.content;
                                        if ("number" == typeof $$obj.length) {
                                            for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                                                var item = $$obj[$index];
                                                if (item && typeof item.type !== "undefined") {
                                                    {
                                                        jade_mixins[item.type](item);
                                                    }
                                                }
                                            }
                                        } else {
                                            var $$l = 0;
                                            for (var $index in $$obj) {
                                                $$l++;
                                                var item = $$obj[$index];
                                                if (item && typeof item.type !== "undefined") {
                                                    {
                                                        jade_mixins[item.type](item);
                                                    }
                                                }
                                            }
                                        }
                                    }).call(this);
                                }
                            }
                        }
                    }
                }).call(this);
            }
        }
    }).call(this, "fn" in locals_for_with ? locals_for_with.fn : typeof fn !== "undefined" ? fn : undefined, "linkTitle" in locals_for_with ? locals_for_with.linkTitle : typeof linkTitle !== "undefined" ? linkTitle : undefined, "stories" in locals_for_with ? locals_for_with.stories : typeof stories !== "undefined" ? stories : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
    return buf.join("");
};

// toolbar.jade compiled template
templatizer["toolbar"] = function tmpl_toolbar() {
    return '<div id="ui-toolbar"><a href="#" id="slideshow-button"><span class="glyphicon glyphicon-picture"></span></a><a href="#" id="stage-prev"><span class="glyphicon glyphicon-chevron-left"></span></a><a href="#" id="play-button"><span class="glyphicon glyphicon-play"></span></a><a href="#" id="stage-next"><span class="glyphicon glyphicon-chevron-right"></span></a></div>';
};

// upload.jade compiled template
templatizer["upload"] = function tmpl_upload() {
    return '<div class="well"><form method="post" enctype="multipart/form-data" action="/upload"><div class="input-group"><span class="input-group-btn"><span class="btn btn-primary btn-file">Browse &hellip;<input type="file" name="files" multiple="multiple"/></span><input type="submit" class="btn"/></span><input type="text" class="form-control"/></div></form></div>';
};


module.exports = templatizer;
