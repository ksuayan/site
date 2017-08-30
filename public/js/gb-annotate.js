
// https://stackoverflow.com/questions/304837/javascript-user-selection-highlighting
function highlightRange(range) {
    var newNode = document.createElement("span");
    newNode.setAttribute(
        "style",
        "background-color: yellow; display: inline;"
    );
    range.surroundContents(newNode);
}

function getSafeRanges(dangerous) {
    var a = dangerous.commonAncestorContainer;

    // Starts -- Work inward from the start, selecting the largest safe range
    var s = [], rs = [];
    if (dangerous.startContainer !== a) {
        for (var i = dangerous.startContainer; i !== a; i = i.parentNode)
            s.push(i);
    }
    if (s.length>0) {
        for(var i = 0; i < s.length; i++) {

            console.log("s[i]", i, s[i].nodeType, s[i]);

            var xs = document.createRange();
            if (i) {
                xs.setStartAfter(s[i-1]);
                xs.setEndAfter(s[i].lastChild);
            } else {
                xs.setStart(s[i], dangerous.startOffset);
                xs.setEndAfter((s[i].nodeType == Node.TEXT_NODE)? s[i] : s[i].lastChild);
            }
            rs.push(xs);
        }
    }


    // Ends -- basically the same code reversed
    var e = [], re = [];
    if (dangerous.endContainer !== a) {
        for (var i = dangerous.endContainer; i !== a; i = i.parentNode)
            e.push(i);
    }


    if (e.length>0) {
        for(var i = 0; i < e.length; i++) {
            var xe = document.createRange();
            if (i) {
                xe.setStartBefore(e[i].firstChild);
                xe.setEndBefore(e[i-1]);
            } else {
                xe.setStartBefore((e[i].nodeType === Node.TEXT_NODE) ? e[i] : e[i].firstChild);
                xe.setEnd(e[i], dangerous.endOffset);
            }
            re.unshift(xe);
        }
    }


    // Middle -- the uncaptured middle
    if ((s.length>0) && (e.length>0)) {
        var xm = document.createRange();
        xm.setStartAfter(s[s.length - 1]);
        xm.setEndBefore(e[e.length - 1]);
    }  else {
        return [dangerous];
    }
    // Concat
    rs.push(xm);
    response = rs.concat(re);
    // Send to Console
    return response;
}

function getNextNode(node) {
    if (node.firstChild)
        return node.firstChild;
    while (node) {
        if (node.nextSibling)
            return node.nextSibling;
        node = node.parentNode;
    }
}

function getNodesInRange(range) {
    var start = range.startContainer;
    var end = range.endContainer;
    var commonAncestor = range.commonAncestorContainer;
    var nodes = [];
    var node;

    // walk parent nodes from start to common ancestor
    for (node = start.parentNode; node; node = node.parentNode) {
        nodes.push(node);
        if (node == commonAncestor)
            break;
    }
    nodes.reverse();
    // walk children and siblings from start until end is found
    for (node = start; node; node = getNextNode(node)) {
        nodes.push(node);
        if (node == end)
            break;
    }
    return nodes;
}


function highlightSelection() {
    var userSelection = window.getSelection().getRangeAt(0);

    var nodes = getNodesInRange(userSelection);
    for (var i=0, n=nodes.length; i<n; i++) {
        console.log("i: ", i, nodes[i]);
    }


    var safeRanges = getSafeRanges(userSelection);
    for (var i = 0; i < safeRanges.length; i++) {
        highlightRange(safeRanges[i]);
    }
}


console.log("Annotate Tag v1.0");
jQuery("#content").on("mouseup", highlightSelection);

