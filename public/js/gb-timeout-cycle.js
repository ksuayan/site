gb.Namespace(gb,"gb.util.TimeOutCycle");
gb.util.TimeOutCycle = new gb.Class();

/**
 * @fileOverview A TimeOutCycle object invokes
 * a callback every timeoutMS milliseconds.
 * @author Kyo Suayan
 * @module gb.ui.TimeOutCycle
 *
 * @example
 * var timeout = new gb.ui.TimeOutCycle(1000, someFunction);
 * timeout.setTickHandler(function(){console.log("Hello");});
 * timeout.setTimeoutMS(5000);
 * timeout.start();
 * timeout.stop();
 */

gb.util.TimeOutCycle.include({

    /**
     * constructor
     * @param timeoutMS
     * @param callback
     * @instance
     */
    init: function(timeoutMS, callback) {
        "use strict";
        this.timeoutMS = timeoutMS;
        this.running = false;
        this.timeoutHandle = null;
        this.tickHandler = function(){
            console.log("default tickHandler");
        };
        this.setTimeoutMS(timeoutMS);
        this.setTickHandler(callback);
    },

    /**
     * Set the function to call.
     * @param callback
     * @instance
     */
    setTickHandler: function(callback) {
        if (callback && typeof callback === 'function') {
            this.tickHandler = callback;
        }
    },

    /**
     * set the interval between calls.
     * @param timeoutMS
     * @instance
     */
    setTimeoutMS: function(timeoutMS) {
        if (timeoutMS) {
            this.timeoutMS = timeoutMS;
        }
    },

    /**
     * start the loop.
     * @instance
     */
    start: function() {
        this.running = true;
        this._tick();
    },

    /**
     * end the loop.
     * @instance
     */
    stop: function() {
        this.running = false;
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
        }
    },

    /**
     * is this object running?
     * @instance
     */
    isRunning: function() {
        return (this.running === true);
    },

    /**
     * invoke tickHandler and setup next invocation.
     * @private
     */
    _tick: function() {
        if (!this.running) {
            return;
        }
        this.tickHandler();
        this._setNext();
    },

    /**
     * setup a timer for next call.
     * @private
     */
    _setNext: function() {
        var that = this;
        if (this.running) {
            this.timeoutHandle = setTimeout(function(){that._tick();}, this.timeoutMS);
        }
    }
});

