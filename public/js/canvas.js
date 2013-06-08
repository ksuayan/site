$(function(){
    //Create a stage by getting a reference to the canvas


    canvas = document.getElementById("demo");
    stage = new createjs.Stage(canvas);

    console.debug("stage", stage);

    //Create a Shape DisplayObject.
    circle = new createjs.Shape();
    circle.graphics.beginFill("#efefef").drawCircle(50, 50, 20);
    //Set position of Shape instance.
    circle.x = circle.y = 50;
    //Add Shape instance to stage display list.
    stage.addChild(circle);
    //Update stage will render next frame
    stage.update();

    //Update stage will render next frame
    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick() {
        //Circle will move 10 units to the right.
        circle.x += 10;
        //Will cause the circle to wrap back
        if (circle.x > stage.canvas.width) { circle.x = 0; }
        stage.update();
    }
});