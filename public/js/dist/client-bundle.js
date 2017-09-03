/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;;(function(root,factory){
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        if (typeof root === 'undefined' || root !== Object(root)) {
            throw new Error('puglatizer: window does not exist or is not an object');
        }
        root.puglatizer = factory();
    }
}(this, function () {
    function pug_classes_object(val) { var classString = '', padding = ''; for (var key in val) { if (key && val[key] && pug_has_own_property.call(val, key)) { var classString = classString + padding + key; var padding = ' '; } } return classString; }    function pug_classes_array(val, escaping) { var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping); for (var i = 0; i < val.length; i++) { var className = pug_classes(val[i]); if (!className) continue; escapeEnabled && escaping[i] && (className = pug_escape(className)); var classString = classString + padding + className; var padding = ' '; } return classString; }    function pug_merge(r,e){if(1===arguments.length){for(var t=r[0],a=1;a<r.length;a++)t=pug_merge(t,r[a]);return t}for(var g in e)if("class"===g){var n=r[g]||[];r[g]=(Array.isArray(n)?n:[n]).concat(e[g]||[])}else if("style"===g){var n=pug_style(r[g]),s=pug_style(e[g]);r[g]=n+s}else r[g]=e[g];return r}
    function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
    function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+="",";"!==r[r.length-1]?r+";":r}
    function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
    function pug_attrs(t,r){var a="";for(var s in t)if(pug_has_own_property.call(t,s)){var u=t[s];if("class"===s){u=pug_classes(u),a=pug_attr(s,u,!1,r)+a;continue}"style"===s&&(u=pug_style(u)),a+=pug_attr(s,u,!1,r)}return a}
    function pug_escape(e){var a=""+e,t=(/["&<>]/).exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
    function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}
    var pug = {
    	merge:function pug_merge(r,e){if(1===arguments.length){for(var t=r[0],a=1;a<r.length;a++)t=pug_merge(t,r[a]);return t}for(var g in e)if("class"===g){var n=r[g]||[];r[g]=(Array.isArray(n)?n:[n]).concat(e[g]||[])}else if("style"===g){var n=pug_style(r[g]),s=pug_style(e[g]);r[g]=n+s}else r[g]=e[g];return r},
    	classes:function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""},
    	style:function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+="",";"!==r[r.length-1]?r+";":r},
    	attr:function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""},
    	attrs:function pug_attrs(t,r){var a="";for(var s in t)if(pug_has_own_property.call(t,s)){var u=t[s];if("class"===s){u=pug_classes(u),a=pug_attr(s,u,!1,r)+a;continue}"style"===s&&(u=pug_style(u)),a+=pug_attr(s,u,!1,r)}return a},
    	escape:function pug_escape(e){var a=""+e,t=(/["&<>]/).exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s},
    	rethrow:function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}
    }

    var puglatizer = {}
    puglatizer["audio"] = function template(o){var t,a,r="";try{var e=o||{};(function(o){a=1,r+='<audio loop="loop" id="audio-player" autoplay="">',a=2,r=r+"<source"+(pug.attr("src",o.streamHost+"/audio/20090530-Birds-Curry-Village.mp3",!0,!1)+' type="audio/mpeg"')+"/>",a=3,r=r+"<source"+(pug.attr("src",o.streamHost+"/audio/20090530-Birds-Curry-Village.ogg",!0,!1)+' type="audio/ogg"')+"/>",a=4,r=r+"<source"+pug.attr("src",o.streamHost+"/audio/20090525-coyote-point-san-mateo.mp3', type='audio/mpeg",!0,!1)+"/>",a=5,r=r+"<source"+pug.attr("src",o.streamHost+"/audio/20090525-coyote-point-san-mateo.ogg', type='audio/ogg",!0,!1)+"/></audio>"}).call(this,"config"in e?e.config:"undefined"!=typeof config?config:void 0)}catch(i){pug.rethrow(i,t,a)}return r};

    puglatizer["body"] = function template(e){var t,n,i,l="",f={};try{var o=e||{};(function(e,n,o){i=1,o&&(i=2,n?(i=3,l+="<h1>",i=4,l=l+"<a"+pug.attr("href","/page/"+o.name,!0,!1)+">",i=5,l=l+(null==(t=o.title)?"":t)+"</a></h1>",i=6):(i=7,l+="<h1>",i=7,l=l+(null==(t=o.title)?"":t)+"</h1>",i=8),i=9,l+="<p>",i=9,l=l+(null==(t=e.fromNow(o.dateCreated))?"":t)+"</p>",i=10,l+=null==(t=o.body)?"":t,i=11),i=16,o&&"undefined"!=typeof o.content&&(i=17,function(){var e=o.content;if("number"==typeof e.length)for(var t=0,n=e.length;n>t;t++){var l=e[t];i=18,l&&"undefined"!=typeof l.type&&(i=19,f[l.type](l),i=20)}else{var n=0;for(var t in e){n++;var l=e[t];i=18,l&&"undefined"!=typeof l.type&&(i=19,f[l.type](l),i=20)}}}.call(this),i=21)}).call(this,"fn"in o?o.fn:"undefined"!=typeof fn?fn:void 0,"linkTitle"in o?o.linkTitle:"undefined"!=typeof linkTitle?linkTitle:void 0,"story"in o?o.story:"undefined"!=typeof story?story:void 0)}catch(r){pug.rethrow(r,n,i)}return l};

    puglatizer["dev-scripts"] = function template(s){var r,c,t="";try{c=1,t+='<script src="/js/dist/corelib.js"></script>',c=2,t+='<script src="/js/dist/extras-site.js"></script>',c=3,t+='<script src="/js/raphael-extensions.js"></script>',c=4,t+='<script src="/js/gb.js"></script>',c=5,t+='<script src="/js/gb-templates.js"></script>',c=6,t+='<script src="/js/gb-util.js"></script>',c=7,t+='<script src="/js/gb-ui.js"></script>',c=8,t+='<script src="/js/gb-touch-surface.js"></script>',c=9,t+='<script src="/js/gb-lazy-image.js"></script>',c=10,t+='<script src="/js/gb-preloadable-image.js"></script>',c=11,t+='<script src="/js/gb-tile.js"></script>',c=12,t+='<script src="/js/gb-timeout-cycle.js"></script>',c=13,t+='<script src="/js/jquery.fullscreen.js"></script>',c=14,t+='<script src="/js/jquery.search.js"></script>',c=15,t+='<script src="/js/gb-timeline.js"></script>',c=16,t+='<script src="/js/gb-fullscreen.js"></script>',c=17,t+='<script src="/js/gb-stage.js"></script>',c=18,t+='<script src="/js/gb-content-manager.js"></script>',c=19,t+='<script src="/js/main.js"></script>'}catch(i){pug.rethrow(i,r,c)}return t};

    puglatizer["errors"] = function template(r){var e,l,a,i="";try{var n=r||{};(function(r){a=1,r&&r.messages&&(a=2,i+='<div class="alert alert-info">',a=3,i+="<ul>",a=4,function(){var l=r.messages;if("number"==typeof l.length)for(var n=0,s=l.length;s>n;n++){var t=l[n];a=5,i+="<li>",a=5,i=i+pug.escape(null==(e=t)?"":e)+"</li>"}else{var s=0;for(var n in l){s++;var t=l[n];a=5,i+="<li>",a=5,i=i+pug.escape(null==(e=t)?"":e)+"</li>"}}}.call(this),i+="</ul></div>")}).call(this,"errors"in n?n.errors:"undefined"!=typeof errors?errors:void 0)}catch(s){pug.rethrow(s,l,a)}return i};

    puglatizer["footer"] = function template(r){var t,e,a="";try{e=1,a+='<div class="footer">',e=2,a+='<div class="container">',e=3,a+="<p>",e=3,a+="Kyo Suayan &copy; 2017. All rights reserved.</p></div></div>"}catch(c){pug.rethrow(c,t,e)}return a};

    puglatizer["gtm"] = function template(t){var e,a,n="";try{a=2,n+="<noscript>",a=3,n+='<iframe src="//www.googletagmanager.com/ns.html?id=GTM-W9X98T" height="0" width="0" style="display:none;visibility:hidden;"></iframe></noscript>',a=5,n+="<script>",a=6,n+="(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':",a=7,n+="\n",a=7,n+="new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],",a=8,n+="\n",a=8,n+="j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=",a=9,n+="\n",a=9,n+="'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);",a=10,n+="\n",a=10,n+="})(window,document,'script','dataLayer','GTM-W9X98T');</script>"}catch(r){pug.rethrow(r,e,a)}return n};

    puglatizer["header"] = function template(a){var l,s,o="";try{var i=a||{};(function(a){s=1,o+='<div class="navbar navbar-inverse">',s=2,o+='<div class="navbar-header">',s=3,o+='<button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">',s=4,o+='<span class="icon-bar"></span>',s=5,o+='<span class="icon-bar"></span>',s=6,o+='<span class="icon-bar"></span></button>',s=7,o+='<a class="navbar-brand" href="/">',s=7,o+="Kyo Suayan</a></div>",s=8,o+='<div class="navbar-collapse collapse">',s=9,o+='<ul class="nav navbar-nav">',s=10,o+='<li class="dropdown">',s=11,o+='<a class="dropdown-toggle" href="#" data-toggle="dropdown">',s=11,o+="Work",s=12,o+='<span class="caret"></span></a>',s=13,o+='<ul class="dropdown-menu">',s=14,o+="<li>",s=15,o+='<a href="http://www.suayan.com/development/">',s=15,o+="Development</a></li>",s=16,o+="<li>",s=17,o+='<a href="http://www.suayan.com/portfolio/">',s=17,o+="Design</a></li></ul></li>",s=18,o+="<li>",s=19,o+='<a href="http://blogs.suayan.com">',s=19,o+="Blog</a></li>",s=20,o+="<li>",s=21,o+='<a href="/page/about">',s=21,o+="About</a></li>",s=22,o+='<li class="dropdown">',s=23,o+='<a class="dropdown-toggle" href="#" data-toggle="dropdown">',s=23,o+="Contact",s=24,o+='<span class="caret"></span></a>',s=25,o+='<ul class="dropdown-menu">',s=26,o+="<li>",s=27,o+='<a href="https://www.facebook.com/ksuayan">',s=27,o+="Facebook</a></li>",s=28,o+="<li>",s=29,o+='<a href="https://www.linkedin.com/in/ksuayan">',s=29,o+="LinkedIn</a></li>",s=30,o+="<li>",s=31,o+='<a href="https://www.twitter.com/ksuayan">',s=31,o+="Twitter</a></li>",s=32,o+="<li>",s=33,o+='<a href="https://plus.google.com/+KyoSuayan">',s=33,o+="Google+</a></li>",s=34,o+="<li>",s=35,o+='<a href="https://www.github.com/ksuayan">',s=35,o+="GitHub</a></li>",s=37,o+='<li class="divider"></li>',s=38,o+='<li class="dropdown-header" role="presentation">',s=38,o+="Imagery</li>",s=40,o+="<li>",s=41,o+='<a href="http://visual.suayan.com">',s=41,o+="visual.suayan.com</a></li>",s=42,o+="<li>",s=43,o+='<a href="http://www.flickr.com/ksuayan">',s=43,o+="Flickr</a></li>",s=44,o+="<li>",s=45,o+='<a href="http://www.500px.com/ksuayan">',s=45,o+="500px</a></li>",s=46,o+="<li>",s=47,o+='<a href="https://ksuayan.tumblr.com">',s=47,o+="Tumblr</a></li>",s=48,o+="<li>",s=49,o+='<a href="https://instagram.com/ksuayan">',s=49,o+="Instagram</a></li>",s=50,o+="<li>",s=51,o+='<a href="https://www.pinterest.com/ksuayan/">',s=51,o+="Pinterest</a></li>",s=52,o+='<li class="divider"></li>',s=53,o+='<li class="dropdown-header" role="presentation">',s=53,o+="Audio Visual</li>",s=54,o+="<li>",s=55,o+='<a href="https://www.soundcloud.com/ksuayan">',s=55,o+="SoundCloud</a></li>",s=56,o+="<li>",s=57,o+='<a href="https://www.youtube.com/ksuayan">',s=57,o+="Youtube</a></li>",s=58,o+="<li>",s=59,o+='<a href="https://www.vimeo.com/ksuayan">',s=59,o+="Vimeo</a></li></ul></li>",s=60,s=61,o+="<li>",s=62,o+='<a href="/logout">',s=62,o+="Logout</a></li></ul></div></div>"}).call(this,"user"in i?i.user:"undefined"!=typeof user?user:void 0)}catch(t){pug.rethrow(t,l,s)}return o};

    puglatizer["login"] = function template(e){var r,a,i,o="";try{var t=e||{};(function(e,a,t){i=1,"undefined"!=typeof a&&a.length&&(i=2,o+='<ul id="errors">',i=3,function(){var e=a;if("number"==typeof e.length)for(var t=0,l=e.length;l>t;t++){var n=e[t];i=4,o+='<li class="error">',i=4,o=o+pug.escape(null==(r=n)?"":r)+"</li>"}else{var l=0;for(var t in e){l++;var n=e[t];i=4,o+='<li class="error">',i=4,o=o+pug.escape(null==(r=n)?"":r)+"</li>"}}}.call(this),o+="</ul>"),i=5,o+='<form action="/login" method="post">',i=6,o+='<div id="login">',i=7,o=o+"<label"+pug.attr("for",t.password.loginFormFieldName,!0,!1)+">",i=7,o+="Login</label>",i=8,o=o+"<input"+(' type="text"'+pug.attr("name",t.password.loginFormFieldName,!0,!1)+pug.attr("value",e,!0,!1))+"/></div>",i=9,o+='<div id="password">',i=10,o=o+"<label"+pug.attr("for",t.password.passwordFormFieldName,!0,!1)+">",i=10,o+="Password</label>",i=11,o=o+'<input type="password"'+pug.attr("name",t.password.passwordFormFieldName,!0,!1)+"/></div>",i=12,o+='<div id="submit">',i=13,o+='<input type="submit"/></div></form>'}).call(this,"email"in t?t.email:"undefined"!=typeof email?email:void 0,"errors"in t?t.errors:"undefined"!=typeof errors?errors:void 0,"everyauth"in t?t.everyauth:"undefined"!=typeof everyauth?everyauth:void 0)}catch(l){pug.rethrow(l,a,i)}return o};

    puglatizer["map-toolbar"] = function template(n){var s,o,t="";try{o=1,t+='<form class="form-inline" id="geocode" role="form">',o=2,t+='<div class="form-group">',o=3,t+='<div class="dropdown">',o=4,t+='<button class="btn btn-default dropdown-toggle" id="screen-menu" type="button" data-toggle="dropdown" aria-expanded="true">',o=5,t+="Home Screen &nbsp;",o=6,t+='<span class="caret"></span></button>',o=7,t+='<ul class="dropdown-menu" id="screen-list" role="menu" aria-labelledby="screen-menu"></ul></div></div>',o=8,t+='<div class="form-group">',o=9,t+='<input class="form-control" id="address" type="textbox" placeholder="Address"/>',o=10,t+="&nbsp;",o=11,t+='<button class="btn btn-default" id="go">',o=12,t+='<span class="glyphicon glyphicon-search"></span>',o=13,t+="&nbsp; Find</button></div>",o=14,t+='<div class="form-group">',o=15,t+='<button class="btn" data-toggle="collapse" data-target="#notes" aria-expanded="false" aria-controls="collapseNotes">',o=16,t+='<span class="glyphicon glyphicon-filter"></span>',o=17,t+="&nbsp; Filter</button>",o=18,t+="&nbsp;",o=19,t+='<button class="btn" id="center">',o=20,t+='<span class="glyphicon glyphicon-globe"></span>',o=21,t+="&nbsp; Locate Me</button>",o=22,t+="&nbsp;",o=23,t+='<button class="btn" id="add">',o=24,t+='<span class="glyphicon glyphicon-screenshot"></span>',o=25,t+="&nbsp; Center</button>",o=26,t+="&nbsp;",o=27,t+='<button class="btn" id="home">',o=28,t+='<span class="glyphicon glyphicon-home"></span>',o=29,t+="&nbsp; Home</button>",o=30,t+="&nbsp;",o=31,t+='<button class="btn" id="directions">',o=32,t+='<span class="glyphicon glyphicon-road"></span>',o=33,t+="&nbsp; Directions</button></div></form>"}catch(a){pug.rethrow(a,s,o)}return t};

    puglatizer["mixins"] = function template(t){var r,e,a="";try{e=1,e=10,e=16,e=22,e=26,e=30}catch(c){pug.rethrow(c,r,e)}return a};

    puglatizer["stories"] = function template(e){var t,n,r,o="",a={};try{var f=e||{};(function(e,n,f){r=1,n&&n.length>0&&(r=2,function(){var a=n;if("number"==typeof a.length)for(var f=0,i=a.length;i>f;f++){var l=a[f];r=3,l&&(r=4,o+="<h1>",r=5,o=o+"<a"+pug.attr("href","/page/"+l.name,!0,!1)+">",r=6,o=o+(null==(t=l.title)?"":t)+"</a></h1>",r=7,o+="<p>",r=7,o=o+(null==(t=e.fromNow(l.dateCreated))?"":t)+"</p>",r=8,o+=null==(t=l.body)?"":t,r=9)}else{var i=0;for(var f in a){i++;var l=a[f];r=3,l&&(r=4,o+="<h1>",r=5,o=o+"<a"+pug.attr("href","/page/"+l.name,!0,!1)+">",r=6,o=o+(null==(t=l.title)?"":t)+"</a></h1>",r=7,o+="<p>",r=7,o=o+(null==(t=e.fromNow(l.dateCreated))?"":t)+"</p>",r=8,o+=null==(t=l.body)?"":t,r=9)}}}.call(this),r=11,f&&"undefined"!=typeof f.content&&(r=12,function(){var e=f.content;if("number"==typeof e.length)for(var t=0,n=e.length;n>t;t++){var o=e[t];r=13,o&&"undefined"!=typeof o.type&&(r=14,a[o.type](o),r=15)}else{var n=0;for(var t in e){n++;var o=e[t];r=13,o&&"undefined"!=typeof o.type&&(r=14,a[o.type](o),r=15)}}}.call(this),r=16),r=17)}).call(this,"fn"in f?f.fn:"undefined"!=typeof fn?fn:void 0,"stories"in f?f.stories:"undefined"!=typeof stories?stories:void 0,"story"in f?f.story:"undefined"!=typeof story?story:void 0)}catch(i){pug.rethrow(i,n,r)}return o};

    puglatizer["toolbar"] = function template(a){var n,p,i="";try{p=1,i+='<div id="ui-toolbar">',p=2,i+='<a href="#" id="slideshow-button">',p=3,i+='<span class="glyphicon glyphicon-picture"></span></a>',p=4,i+='<a href="#" id="stage-prev">',p=5,i+='<span class="glyphicon glyphicon-chevron-left"></span></a>',p=6,i+='<a href="#" id="play-button">',p=7,i+='<span class="glyphicon glyphicon-play"></span></a>',p=8,i+='<a href="#" id="stage-next">',p=9,i+='<span class="glyphicon glyphicon-chevron-right"></span></a></div>'}catch(s){pug.rethrow(s,n,p)}return i};

    puglatizer["upload"] = function template(t){var p,l,n="";try{l=2,n+='<div class="well">',l=3,n+='<form method="post" enctype="multipart/form-data" action="/upload">',l=4,n+='<div class="input-group">',l=5,n+='<span class="input-group-btn">',l=6,n+='<span class="btn btn-primary btn-file">',l=6,n+="Browse &hellip;",l=7,n+='<input type="file" name="files" multiple="multiple"/></span>',l=8,n+='<input class="btn" type="submit"/></span>',l=9,n+='<input class="form-control" type="text"/></div></form></div>'}catch(a){pug.rethrow(a,p,l)}return n};


    return puglatizer;
}));


/***/ })
/******/ ]);