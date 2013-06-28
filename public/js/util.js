var util = {};

util.randomArray = function(size, scale) {
    var r = new Array(size);
    for (var i = 0; i < size; i++) {
        r[i] = Math.floor(Math.random() * (scale+1));
    }
    return r;
};

util.arrayMax = function(array){
    return Math.max.apply(Math, array);
};

util.arrayMin = function(array){
    return Math.min.apply(Math, array);
};
