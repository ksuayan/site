$(function(){
  $(".banner").transit({
    opacity: 1,
    y: 60,
    duration: 150,
    easing: 'in',
    complete: function() {
      console.log("done..");
    }
  });
});