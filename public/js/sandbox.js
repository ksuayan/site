$(function(){

    /*
    $(".bg1").on("click",function(e){
        console.log("bg1", e.type, e.target);
    });

    $(".bg2").on("click",function(e){
        console.log("bg2", e.type, e.target);
    });

    $(".bg3").on("click",function(e){
        console.log("bg3", e.type, e.target);
        e.preventDefault();
        // e.stopPropagation();
    });
    */

    $("body").on("click", function(e){
        console.log("body", e.type, e.target);

    });

    $(".bg2").on("click",function(e){
        console.log("bg2", e.type, e.target);
        e.stopPropagation();
    });

});