gb.Namespace(gb,"gb.util.TimeOutCycle");
gb.util.TimeOutCycle = new gb.Class();

gb.util.TimeOutCycle = function(timeoutMS, callback) {
    "use strict";
    this.timeoutMS = timeoutMS;
    this.isRunning = false;
    this.timeoutHandle = null;
    this.tickHandler = function(){
        console.log("default tickHandler");
    };
    this.setTimeoutMS(timeoutMS);
    this.setTickHandler(callback);
};

gb.util.TimeOutCycle.prototype.setTickHandler = function(callback) {
    if (callback && typeof callback == 'function') {
        this.tickHandler = callback;
    }
};

gb.util.TimeOutCycle.prototype.setTimeoutMS = function(timeoutMS) {
    if (timeoutMS) {
        this.timeoutMS = timeoutMS;
    }
};

gb.util.TimeOutCycle.prototype.start = function() {
    this.isRunning = true;
    this._tick();
};

gb.util.TimeOutCycle.prototype.stop = function() {
    this.isRunning = false;
    if (this.timeoutHandle)
        clearTimeout(this.timeoutHandle);
};

gb.util.TimeOutCycle.prototype._tick = function() {
    if (!this.isRunning) {
        return;
    }
    this.tickHandler();
    this._setNext();
};

gb.util.TimeOutCycle.prototype._setNext = function() {
    var that = this;
    if (this.isRunning) {
        this.timeoutHandle = setTimeout(function(){that._tick();}, this.timeoutMS);
    }
};

