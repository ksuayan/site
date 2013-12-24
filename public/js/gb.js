/** @namespace */
var gb = gb || {};

/**
 * Initialize namespace for a given path using ns
 * object as the parent.
 * @param ns {Object}
 * @param ns_string {string}
 * @returns {*}
 */
gb.Namespace = function (ns, ns_string) {
    var parts = ns_string.split('.'),
        parent = ns,
        pl, i;
    if (parts[0] == "gb") {
        parts = parts.slice(1);
    }
    pl = parts.length;
    for (i = 0; i < pl; i++) {
        //create a property if it doesnt exist
        if (typeof parent[parts[i]] == 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

/**
 * Class factory.
 * @param parent {Object}
 * @returns {Function}
 */
gb.Class = function(parent){
    var klass = function() {
        this.init.apply(this,arguments);
    };

    if (parent) {
        var subclass = function(){};
        subclass.prototype = parent.prototype;
        klass.prototype =  new subclass();
    }

    klass.prototype.init = function(){};
    klass.fn = klass.prototype;
    klass.fn.parent =  klass;
    // klass._super = klass.__proto__;

    klass.extend = function(obj){
        var extended =obj.extended;
        for (var i in obj) {
            klass[i] = obj[i];
        }
        if (extended) extended(klass);
    };

    klass.include = function(obj) {
        var included = obj.included;
        for (var i in obj) {
            klass.fn[i] = obj[i];
        }
        if (included) included(klass);
    };
    return klass;
};

