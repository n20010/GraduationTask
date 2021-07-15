/* global $*/
$(document).ready(function() {
  
  $(".hide-btn").hover(
    
    function() {
      $("h2").fadeOut();
    },
    function() {
      $("h2").fadeIn();
    }
    
  )
});