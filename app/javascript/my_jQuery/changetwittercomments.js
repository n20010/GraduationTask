/* global $ */
/* global location */

$(document).ready(function(){
  if (location.pathname == "/") {
    console.log('[*] loaded Main jQuery');
    var count = 0;
    var comments;
    
    $("#button").click(function(){
      if ($(this).hasClass("btn--deactive")) {
        
        console.log("[*] Search function is running");
        console.log("[*] Send 10 request every 7 seconds");
        
        $(this).removeClass("btn--deactive");
        $(this).addClass("btn--active");
        $(this).html("STOP GENERATE");
        update();
        
      } else {
        
        $(this).removeClass("btn--active");
        $(this).addClass("btn--deactive");
        $(this).html("GENERATE");
        stop_update();
        $('<div class="btn btn--reset btn-dark">CLEAR</div>')
          .appendTo(".bottom-btn-container").hide().fadeIn(500);
        
      }
    });
  
    function update(){ //この関数では以下のことを行う
      comments = setInterval(function() {
        var twitter_keyword = $('.twittertag').val();
        var youtube_url = $('.youtubeurl').val();
        var latest_tweet_id = $('#latest_tweet_id').val();
        var next_page_token = $('#next_page_token').val();
        var chat_id         = $('#chat_id').val();
        
        $('.btn--reset').remove()
    
        $.ajax({ //ajax通信
          url: '/', //urlは現在のページを指定
          type: 'GET', 
          data: { //railsに引き渡すデータ
            "twitter_keyword": twitter_keyword,
            "youtube_url": youtube_url,
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
      }, 7000);
      
    }
    
    function stop_update(){
      clearInterval(comments);
      console.log("=".repeat(20));
      console.log("[-] Search function is stopped");
    }
    
    $("body").on("click", ".btn--reset", function() {
      $("#comments").fadeOut().empty().fadeIn();
      $(this).remove();
      count = 0;
      $('#latest_tweet_id').val(count);
      $('#next_page_token').val(count);
      console.log("[-] Every Numerics were reset");
    });
    
  } 
});