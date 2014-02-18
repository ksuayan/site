"use strict";

var test2 = require("./test2");

exports.blah = function(blah) {
    console.log("blah:", blah);
};

test2.boo("pssst");

exports = module.exports;

