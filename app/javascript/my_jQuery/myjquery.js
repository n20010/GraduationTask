$(document).ready(function() {
  
  $(".btn").hover(
    function() {
      $("h2").fadeOut();
    },
    
    function() {
      $("h2").fadeIn();
    }
    )
});