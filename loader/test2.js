"use strict";

var test1 = require("./test1");

exports.boo = function(boo) {
  console.log("boo:", boo);
    test1.blah("meh");
};