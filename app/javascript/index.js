/*global $*/
/*global location */

$(document).ready( function() {
  if (location.pathname == "/"){
    console.log('[*] loaded index.js')
    
    let fontSize = 38;
    let fontSpeed = 50;
    let weight = 600;
    let opacity = 1;
    let format = 'niconico';
    
    $("#button_refresh").click(function(){
      let settings = {
          fontSize: fontSize,
          fontSpeed: fontSpeed,
          weight: weight,
          opacity: opacity,
          format: format
       };
      settings = JSON.stringify(settings);
      console.log(settings)
      console.log("[*] send settings")
      
      $.ajax({
        url: '/sendStyles',
        type: 'GET',
        data: {
          'settings': settings
        }
      })
      
    });
    
    //フォントサイズ
    $("#form-range-size").on("input", function(){
      $(".sample").css('fontSize', `${$(this).val()}px`);
      fontSize = $(this).val();
    });
    
    //透明度
    $("#form-range-opacity").on("input", function(){
      $(".sample").css('opacity', $(this).val());
      opacity = $(this).val();
    });
    
    // 選択した描写タイプを設定
    $('.radio').on("click", function(){
      format = $(this).attr("id")
    })
    
    $('.niconico-label').on("click", function(){
      $('.niconico-title').css('color', '#ff0000')
      $('.youtube-title').css('color', '#000000')
    })
    
    $('.youtube-label').on("click", function(){
      $('.youtube-title').css('color', '#ff0000')
      $('.niconico-title').css('color', '#000000')
    })
    
  }
})