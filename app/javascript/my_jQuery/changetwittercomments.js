/* global $ */
/* global location */

$(document).ready(function(){
  if (location.pathname == "/") {
    console.log('[*] loaded Main jQuery');
    var count = 0;
    var tweets;
    
    $("#button").click(function(){
      if ($(this).hasClass("btn--deactive")) {
        
        console.log("[*] Search word: " + $("#keyword").html());
        console.log("[*] Search function is running");
        console.log("[*] Send 10 request every 15 seconds");
        
        $(this).removeClass("btn--deactive");
        $(this).addClass("btn--active");
        $(this).html("サーチを止める");
        update();
        
      } else {
        
        $(this).removeClass("btn--active");
        $(this).addClass("btn--deactive");
        $(this).html("サーチを始める");
        stop_update();
        $('<div class="btn btn--orange btn--radius btn--reset">Clear</div>')
          .appendTo(".btn-container").hide().fadeIn(500);
        
      }
    });
  
    function update(){ //この関数では以下のことを行う
      tweets = setInterval(function() {
        var latest_tweet_id = $('#latest_tweet_id').text();
        var next_page_token = $('#next_page_token').text();
        var chat_id         = $('#chat_id').text();
    
        $.ajax({ //ajax通信
          url: '/', //urlは現在のページを指定
          type: 'GET', 
          data: { //railsに引き渡すデータ
            'latest_tweet_id': latest_tweet_id,
            'next_page_token': next_page_token,
            'chat_id': chat_id,
            'target': {
              'Twitter': true,
              'Youtube': true
            }
          },
          dataType: 'script'
        });
        
        count = count + 1;
        $('h3').html('jQueryは' + String(count) + '回実行されました');
      }, 15000);
      
    }
    
    function stop_update(){
      clearInterval(tweets);
      console.log("=".repeat(20));
      console.log("[-] Search function is stopped");
    }
    
    $("body").on("click", ".btn--reset", function() {
      $("#comments").fadeOut().empty().fadeIn();
      $(this).remove();
      $('h3').html('まだjQueryは実行されていません');
      count = 0;
      $('#latest_tweet_id').html(count);
      $('#next_page_token').html(count);
      console.log("[-] Every Numerics were reset");
    });
    
  } 
});