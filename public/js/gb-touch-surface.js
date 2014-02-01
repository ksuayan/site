gb.Namespace(gb, "gb.ui.TouchSurface");
gb.ui.TouchSurface = new gb.Class();

/**
 * @fileOverview gb.ui.TouchSurface is a touch event detection
 * tool for mobile devices.
 * @author Kyo Suayan
 * @module gb.ui.TouchSurface
 * @example
 * var touchSurface = new gb.ui.TouchSurface(el, yourFunction);
 *
 */

gb.ui.TouchSurface.include({

    /**
     * @instance
     * @param el
     * @param callback
     */
    init: function(el, callback) {
        "use strict";

        var that = this;
        this.touchSurface = el;
        this.dir = "unknown";
        this.swipeType = "unknown";
        this.startX = null;
        this.startY = null;
        this.distX = null;
        this.distY = null;
        this.threshold = 150; //required min distance traveled to be considered swipe
        this.restraint = 100; // maximum distance allowed at the same time in perpendicular direction
        this.allowedTime = 500; // maximum time allowed to travel that distance
        this.elapsedTime = null;
        this.startTime = null;
        this.touchHandler = callback || function(evt, dir, phase, swipetype, distance){};

        this.touchSurface.addEventListener('touchstart', function(e){ that.onTouchStart(e); }, false);
        this.touchSurface.addEventListener('touchmove', function(e){ that.onTouchMove(e); }, false);
        this.touchSurface.addEventListener('touchend', function(e){ that.onTouchEnd(e); }, false);
    },

    /**
     * Touch start event handler.
     * @param e
     */
    onTouchStart: function(e) {
        var touchObj = e.changedTouches[0];

        this.dir = 'none';
        this.swipeType = 'none';
        this.startX = touchObj.pageX;
        this.startY = touchObj.pageY;
        this.startTime = new Date().getTime(); // record time when finger first makes contact with surface
        this.touchHandler(e, 'none', 'start', this.swipeType, 0); // fire callback function with params dir="none", phase="start", swipetype="none" etc
        e.preventDefault();
    },

    /**
     * Touch move event handler.
     * @param e
     */
    onTouchMove: function(e) {
        var touchObj = e.changedTouches[0];
        this.distX = touchObj.pageX - this.startX; // get horizontal dist traveled by finger while in contact with surface
        this.distY = touchObj.pageY - this.startY; // get vertical dist traveled by finger while in contact with surface

        if (Math.abs(this.distX) > Math.abs(this.distY)){ // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
            this.dir = (this.distX < 0)? 'left' : 'right';
            this.touchHandler(e, this.dir, 'move', this.swipeType, this.distX); // fire callback function with params dir="left|right", phase="move", swipetype="none" etc
        } else { // else consider this a vertical movement
            this.dir = (this.distY < 0)? 'up' : 'down';
            this.touchHandler(e, this.dir, 'move', this.swipeType, this.distY); // fire callback function with params dir="up|down", phase="move", swipetype="none" etc
        }

        e.preventDefault(); // prevent scrolling when inside DIV

    },

    /**
     * Touch end event handler.
     * @param e
     */
    onTouchEnd: function(e) {
        var touchObj = e.changedTouches[0];
        this.elapsedTime = new Date().getTime() - this.startTime; // get time elapsed
        if (this.elapsedTime <= this.allowedTime) { // first condition for swipe met
            if (Math.abs(this.distX) >= this.threshold &&
                Math.abs(this.distY) <= this.restraint){ // 2nd condition for horizontal swipe met
                this.swipeType = this.dir; // set swipeType to either "left" or "right"
            } else if (Math.abs(this.distY) >= this.threshold &&
                Math.abs(this.distX) <= this.restraint){ // 2nd condition for vertical swipe met
                this.swipeType = this.dir; // set swipeType to either "top" or "down"
            }
        }
        // Fire callback function with params dir="left|right|up|down", phase="end", swipetype=dir etc:
        var distance = (this.dir === 'left' || this.dir === 'right') ? this.distX : this.distY;
        this.touchHandler(e, this.dir, 'end', this.swipeType, distance);
        e.preventDefault();
    }
});
