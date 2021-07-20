/* global $ */
$(document).ready(function(){
  var count = 0;
  $(function(){
    setInterval(update, 7000);
    //10000ミリ秒ごとにupdateという関数を実行する
  });
  
  function update(){ //この関数では以下のことを行う
    $.ajax({ //ajax通信で以下のことを行う
      url: 'twitter', //urlは現在のページを指定
      type: 'GET', //メソッドを指定
      data: { //railsに引き渡すデータは
        message: { platform: 'twitter' } //このような形(paramsの形をしています)で、'id'には'message_id'を入れる
      },
      dataType: 'script'
    });
    
    count = count + 1;
    $('h3').html('jQueryは' + String(count) + '回実行されました');
     
  }
});