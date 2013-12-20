'use strict';

importScripts("gb.js","gb-util.js","gb-generator.js","gb-timeout-cycle.js");

gb.Namespace(gb, "gb.system.WorkerTask");

gb.system.WorkerTask = function(jsPath) {
    var INTERVAL = 5000;
    var that = this;
    this.generator = new gb.data.Generator(50,1000);
    this.cycle = new gb.util.TimeOutCycle(INTERVAL, function(){that.Ping();} );
    this.cycle.Start();
};

gb.system.WorkerTask.prototype.ReceiveMessage = function(e) {
    // console.log("received", e);
    var message = {
        data: e.data
    };
    self.postMessage(message);
};

gb.system.WorkerTask.prototype.Ping = function() {
    var message = {
        data: this.generator.GetData(),
        size: this.generator.size,
        scale: this.generator.scale
    };
    self.postMessage(message);
}

var myWorker = new gb.system.WorkerTask();
self.addEventListener('message', myWorker.ReceiveMessage, false);
