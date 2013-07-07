var gb = gb || {};
gb.ui = gb.ui || {};

gb.ui.PreloadableImage = function(id, source, onSuccess, onError) {
    this.id = id;
    this.startTime = new Date().valueOf();
    this.endTime = this.startTime;
    this.image = new Image();
    this.SetSource(source);
    this.SetOnLoad(onSuccess);
    this.SetOnError(onError);
};

gb.ui.PreloadableImage.prototype.SetSource = function(source) {
    if (!source) {
        this.image.src = "";
        return;
    }
    this.image.src = source;
};

gb.ui.PreloadableImage.prototype.SetOnLoad = function(onSuccess) {
    var that = this;
    if (!onSuccess || typeof onSuccess != 'function') {
        // default onload handler ..
        this.image.onload = function(){
            that.endTime = new Date().valueOf();
        };
        return;
    }
    var onSuccessWrapper = function(e) {
        that.endTime = new Date().valueOf();
        onSuccess(e);
    }
    this.image.onload = onSuccessWrapper;
};

gb.ui.PreloadableImage.prototype.SetOnError = function(onError) {
    var that = this;
    if (!onError || typeof onError != 'function') {
        this.image.onerror = function(){
            that.endTime = new Date().valueOf();
        };
        return;
    }
    this.endTime = new Date().valueOf();
    this.image.onerror = onError;

};

gb.ui.PreloadableImage.prototype.GetTotalTimeMS = function() {
    return (this.endTime - this.startTime);
};