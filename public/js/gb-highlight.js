// https://stackoverflow.com/questions/3620116/get-css-path-from-dom-element
// https://github.com/micnews/css-path/blob/master/css-path.js

$(function(){

    var path = null,
        url = window.location.href,
        attachStyle = function() {
        var css = '.hover { border: 10px solid #85A000; } ' +
                '.trail { border: 1px dashed #2B333F; } ',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    },

    /*
    cssPath = function(el) {
        if (!(el instanceof Element)) return;
        var path = [];
        while (el.nodeType === Node.ELEMENT_NODE && el.nodeName.toLowerCase() !== "html") {
            var selector = el.nodeName.toLowerCase();
            if (el.id) {
                selector += '#' + el.id;
            } else {
                var sib = el, nth = 1;
                while (sib.nodeType === Node.ELEMENT_NODE && (sib = sib.previousSibling) && nth++);
                selector += ":nth-child("+nth+")";
            }
            path.unshift(selector);
            el = el.parentNode;
        }
        console.log("path", path);
        return path.join(" > ");
    },
    */

    nthChild = function (elm) {
        var childNumber = 0,
            childNodes = elm.parentNode.childNodes,
            index = 0;
        for (; index < childNodes.length; ++index) {
            if (childNodes[index].nodeType === 1) {
                ++childNumber;
            }
            if (childNodes[index] === elm) {
                return childNumber;
            }
        }
    },
    cssPath = function(el) {
        if (!(el instanceof Element)) return;
        var path = [];
        while (el.nodeType === Node.ELEMENT_NODE && el.nodeName.toLowerCase() !== "html") {
            var selector = el.nodeName.toLowerCase();
            if (el.id) {
                selector += '#' + el.id;
            } else {
                selector += ":nth-child("+nthChild(el)+")";
            }
            path.unshift(selector);
            el = el.parentNode;
        }
        return path.join(" > ");
    },
    onMouseOver = function(e) {
        var target = $(e.target),
            el = target.get(0);
        // console.log("event", e);
        var selector = cssPath(el);
        $(".hover").removeClass("hover");
        target.addClass("hover");
        console.log("path:", selector);
        return false;
    },
    onMouseOut = function(e) {
        $(this).removeClass("hover");
    },
    onClick = function(e) {
    };

    attachStyle();

    $('#content').children()
        .mouseover(onMouseOver)
        .mouseout(onMouseOut)
        .click(onClick);
});
