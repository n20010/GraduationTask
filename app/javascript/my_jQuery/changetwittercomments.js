/* global $ */
$(document).ready(function(){
  var count = 0;
  var tweets;
  
  
  
  $("#button").click(function(){
    if ($(this).hasClass("btn--deactive")) {
      
      console.log("[*]Search word: " + $("#keyword").html());
      console.log("[*]Search function is running");
      console.log("[*]Send 10 request every 7 seconds");
      console.log("=".repeat(20));
      console.log("v".repeat(20));
      
      $(this).removeClass("btn--deactive");
      $(this).addClass("btn--active");
      $(this).html("Twitterのサーチを止める");
      update();
      
    } else {
      
      $(this).removeClass("btn--active");
      $(this).addClass("btn--deactive");
      $(this).html("Twitterのサーチを始める");
      stop_update();
      $('<div class="btn btn--orange btn--radius btn--reset">Clear</div>')
        .appendTo(".btn-container").hide().fadeIn(500);
      
    }
  });

  function update(){ //この関数では以下のことを行う
    tweets = setInterval(function() {
      var latest_tweet_id = $('#latest_tweet_id').text();
  
      $.ajax({ //ajax通信で以下のことを行う
        url: 'twitter', //urlは現在のページを指定
        type: 'GET', //メソッドを指定
        data: { //railsに引き渡すデータは
          'latest_tweet_id': latest_tweet_id //このような形(paramsの形をしています)で、'id'には'message_id'を入れる
        },
        dataType: 'script'
      });
      
      count = count + 1;
      $('h3').html('jQueryは' + String(count) + '回実行されました');
    }, 7000);
    
  }
  
  function stop_update(){
    clearInterval(tweets);
    console.log("=".repeat(20));
    console.log("[-]Search function is stopped");
  }
  
  $("body").on("click", ".btn--reset", function() {
    $("#tweets").fadeOut().empty().fadeIn();
    $(this).remove();
    $('h3').html('まだjQueryは実行されていません');
    count = 0;
    $('span').html(count);
    console.log("[-]Every Numerics were reset");
  });
  
  
});