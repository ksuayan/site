'use strict';

var worker = new Worker("js/worker.js");
worker.addEventListener('message', function(e) {
    console.log('worker said: ', e.data);
}, false);

setTimeout(function(){
    worker.postMessage({
        booyah :"HELLO"
    });
}, 10000);

