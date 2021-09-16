/*global $*/
/*global location */

$(document).ready( function() {
  if (location.pathname == "/"){
    console.log('[*] loaded index.js')
    
    let fontSize = 30;
    let fontSpeed = 50;
    let tag = '';
    let check = false;
    
    $("#button_refresh").click(function(){
      let settings = {
          fontSize: fontSize,
          fontSpeed: fontSpeed,
          check: check,
          tag: tag
       };
      settings = JSON.stringify(settings);
      console.log("[*] send settings")
      
      $.ajax({
        url: '/sendStyles',
        type: 'GET',
        data: {
          'settings': settings
        }
      })
      
    });
    
    /*
    フォントサイズ
    */
    
    $(".fontSize").on("input", function(){
      $(".sample").css('fontSize', `${$(this).val()}px`);
      fontSize = $(this).val();
    });
    
    /*
    スピード
    */
    
    $(".speed").on("click", function(){
      valueSpeed($(this).val());
    });
    
    const valueSpeed = value => {
      switch (value) {
        case '遅い':
          fontSpeed = 80;
          break;
        case '普通':
          fontSpeed = 50;
          break;
        case '速い':
          fontSpeed = 30;
          break;
        default:
          fontSpeed = 50;
      }
    };
    
    /*
    チェックボックス
    */
    
    $('.checkTwitter').change(function(){
      check = $(this).is(':checked');
    });
    
    /*
    Twitterハッシュタグ
    */
    
    $('.twitterTag').on('input', function() {
      tag = $(this).val();
    });
    
  }
})