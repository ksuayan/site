$(function(){
  $(".banner").transit({
    opacity: 1,
    height: 250,
    duration: 500,
    easing: 'in',
    complete: function() {
      console.log("done..");
    }
  });
});