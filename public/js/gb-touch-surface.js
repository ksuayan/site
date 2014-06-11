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
        try {
            var that = this;
            this.touchSurface = el;
            this.direction = 'none';
            this.swipeType = 'none';
            this.startX = null;
            this.startY = null;
            this.distX = null;
            this.distY = null;
            this.threshold = 50; //required min distance traveled to be considered swipe
            this.restraint = 50; // maximum distance allowed at the same time in perpendicular direction
            this.allowedTime = 500; // maximum time allowed to travel that distance
            this.elapsedTime = null;
            this.startTime = null;
            this.touchHandler = callback || function(evt, dir, phase, swipetype, distance){};

            this.touchSurface.addEventListener('touchstart', function(e){ that.onTouchStart(e); }, false);
            this.touchSurface.addEventListener('touchmove', function(e){ that.onTouchMove(e); }, false);
            this.touchSurface.addEventListener('touchend', function(e){ that.onTouchEnd(e); }, false);
        } catch(err) {}
    },

    /**
     * Unbind event listeners.
     */
    removeEventListeners: function() {
        try {
            this.touchSurface.removeEventListener('touchstart');
            this.touchSurface.removeEventListener('touchmove');
            this.touchSurface.removeEventListener('touchend');
        } catch(err) {}
    },

    /**
     *
     */
    debug: function() {
        console.log("----------------");
        console.log("startX", this.startX, "startY", this.startY);
        console.log("x", this.distX, "y", this.distY, this.axis, this.direction);
    },

    /**
     * Touch start event handler.
     * @param e
     */
    onTouchStart: function(e) {
        var touchObj = e.changedTouches[0];
        e.preventDefault();
        this.axis = null;
        this.direction = 'none';
        this.swipeType = 'none';
        this.startX = touchObj.pageX;
        this.startY = touchObj.pageY;
        // record time when finger first makes contact with surface
        this.startTime = new Date().getTime();
        // fire callback function with params direction="none", phase="start", swipetype="none" etc
        this.touchHandler(e, 'none', 'start', this.swipeType, 0);
    },

    /**
     * Touch move event handler.
     * @param e
     */
    onTouchMove: function(e) {
        var touchObj = e.changedTouches[0];
        e.preventDefault();

        // get horizontal dist traveled by finger while in contact with surface
        this.distX = touchObj.pageX - this.startX;
        // get vertical dist traveled by finger while in contact with surface
        this.distY = touchObj.pageY - this.startY;

        // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
        if (!this.axis) {
            this.axis =  (Math.abs(this.distX) > Math.abs(this.distY)) ? "horizontal" : "vertical";
        }

        if (this.axis === 'horizontal') {
            this.direction = (this.distX < 0) ? 'left' : 'right';
            // fire callback function with params direction="left|right", phase="move", swipetype="none" etc
            this.touchHandler(e, this.direction, 'move', this.swipeType, this.distX);
            // else consider this a vertical movement
        } else {
            this.direction = (this.distY < 0) ? 'up' : 'down';
            // fire callback function with params direction="up|down", phase="move", swipetype="none" etc
            this.touchHandler(e, this.direction, 'move', this.swipeType, this.distY);
        }
        // this.debug();
    },

    /**
     * Touch end event handler.
     * @param e
     */
    onTouchEnd: function(e) {
        e.preventDefault();
        // get time elapsed

        this.elapsedTime = new Date().getTime() - this.startTime;
        // first condition for swipe met
        if (this.elapsedTime <= this.allowedTime) {
            // 2nd condition for horizontal swipe met
            if (Math.abs(this.distX) >= this.threshold &&
                Math.abs(this.distY) <= this.restraint){
                // set swipeType to either "left" or "right"
                this.swipeType = this.direction;
                // 2nd condition for vertical swipe met
            } else if (Math.abs(this.distY) >= this.threshold &&
                Math.abs(this.distX) <= this.restraint){
                // set swipeType to either "top" or "down"
                this.swipeType = this.direction;
            }
        }
        // Fire callback function with params direction="left|right|up|down", phase="end", swipetype=direction
        var distance = (this.direction === 'left' || this.direction === 'right') ? this.distX : this.distY;
        this.touchHandler(e, this.direction, 'end', this.swipeType, distance);
    }
});
