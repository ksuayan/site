var worker = new Worker('js/worker.js');

worker.addEventListener('message', function(e) {
    console.log('worker said: ',
        e,
        e.data,
        new Date(e.timeStamp).toLocaleString(),
        new Date(e.data.lastweek).toLocaleString());
}, false);



var bloop = function() {
    i++;
    worker.postMessage("bloop!"+i); // Send data to our worker.
}


var i = 0;
var myLoop = new gb.util.TimeOutCycle(5000, bloop);
myLoop.Start();


