

var setupQueues = function() {
    var obj = {};
    var queueNames = ["aa","bb","cc"],
        count = 12;
    for(var i= 0, n=queueNames.length; i<n; i++) {
        var q = queueNames[i];
        obj[q] = [];
        for (var j= 0; j<count; j++) {
            obj[q].push(q+"-"+j);
        }
    }
    return obj;
};

/**
 * Get keys from a hash.
 * @param map
 * @returns {Array}
 */
var getKeys = function(map) {
    var keys=[],p;
    for (p in map){
        if (Object.prototype.hasOwnProperty.call(map,p)) {
            keys.push(p);
        }
    }
    return keys;
};

/**
 * rebalance a map of arrays but limit the total
 * elements to targetCount.
 * @param queues
 * @param targetCount
 * @returns {*}
 */
var balancedTruncate = function(queues, targetCount) {
    var result = {};
    var loaded = 0;
    var keys = getKeys(queues);
    while (keys.length && loaded < targetCount) {
        for (var i=0, qcount = keys.length; loaded<targetCount && i<qcount; i++) {
            var current = keys[i];
            if (queues[current] && queues[current].length) {
                if (!result[current]) {
                    result[current] = [];
                }
                result[current].push(queues[current][0]);
                queues[current].splice(0,1);
                loaded++;
            } else {
                keys.splice(i,1);
            }
        }
    }
    return result;
};

var queues = setupQueues();

console.log("balanced queue:");
console.table(queues);
console.log(balancedTruncate(queues, 8));

