$(function(){
    //Create a stage by getting a reference to the canvas
    var div = document.getElementById("stage");
    var stage = new createjs.Stage(div);


    //Create a Shape DisplayObject.
    var circle = new createjs.Shape();
    circle.graphics.beginFill("#efefef").drawCircle(50, 50, 20);
    circle.x = circle.y = 50;
    //Add Shape instance to stage display list.
    stage.addChild(circle);

    var myText = new createjs.Text('kyo suayan', '300 36pt Source Sans Pro', '#FFF');
    myText.x = myText.y = 25;
    stage.addChild(myText);

    var sprites = {
        images: ["img/sprite.png"],
        frames: {width:50, height:50},
        animations: {eyes:[0,9,"eyes",4]}
    };

    var spriteSheet = new createjs.SpriteSheet(sprites);
    var animation = new createjs.BitmapAnimation(spriteSheet);
    animation.gotoAndPlay("eyes");
    stage.addChild(animation);

    function handleTick() {
        animation.x += 2;
        if (animation.x > stage.canvas.width) { animation.x = 0; }
        circle.x += 10;
        if (circle.x > stage.canvas.width) { circle.x = 0; }
        stage.update();
    }

    var onResizeHandler = function(e){
        var width = $(".container").width();
        var height = $(".container").height();
        console.log("resize", width, height);
    };

    createjs.Ticker.setFPS(24);
    createjs.Ticker.addEventListener("tick", handleTick);

    $(window).resize(gb.util.throttle(onResizeHandler, 500));

});