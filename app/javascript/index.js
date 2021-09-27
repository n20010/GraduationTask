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
    
    $(".form-range").on("input", function(){
      $(".sample").css('fontSize', `${$(this).val()}px`);
      fontSize = $(this).val();
    });
    
    /*
    スピード
    */
    
    $(".speed").on("click", function(){
      valueSpeed($(this).val());
      $('.sample').css('animation-duration', String(fontSpeed) + 's');
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
    
    const createAnimation = () => {
      const box = document.createElement('span');
      var generateSpanClass = 'sample' + String(span_count)
      box.innerHTML = "HELLO WORLD";
      box.classList.add('sample');
      box.classList.add(generateSpanClass)
      box.style.fontSize = String(fontSize) + 'px';
      box.style.animationDuration = String(fontSpeed) + 's';
      screen.appendChild(box);
      setTimeout(function(){
        $('.' + generateSpanClass).remove()
      }, 9999);
    };
    
    const screen = document.querySelector('.div-top');
    var span_count = 0
    createAnimation()
    const sampleAnimation = setInterval(function() {
      createAnimation()
      span_count++;
    }, 10000)
  }
})