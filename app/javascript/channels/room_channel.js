/* global $ */
/* global location */
import consumer from "./consumer"

consumer.subscriptions.create("RoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log('[*] connected Room_Channel')
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    if (location.pathname == '/screen') {
      
      console.log("[*] received some messages from Room_channnel")
      const screen = document.querySelector('.screen');
      const color = document.getElementById('color')
      const size = document.getElementById('fontSize')
      const opacity = document.getElementById('opacity')
      const weight = document.getElementById('weight')
      const format = document.getElementById('format')
      
      //時間差をつけてコメントを描写関数へ送る
      const randomTime = (comment, format) => {
        const random = Math.round(Math.random() * 7000)
        setTimeout(() => {
          createComment(comment, format)
        }, random)
      }       
      
      // MAIN FUNCTION
      if (data["message"]["comments"]) {
        var id_sender = data["message"]["session"];
        var comments = data["message"]["comments"];
        var status = data["message"]["status"]; 
        
        const searchParams = new URLSearchParams(window.location.search)
        var id_query = searchParams.get('id');
        if (id_query == id_sender){
          // セッションがOKならメイン処理を実行
          console.log("[*] clear cookie authentication ")
          
          var comments_count = Object.keys(comments).length;
          for (let i = 0; i < comments_count; i++) {
            randomTime(comments[i].text, comments[i].target)
          }
          
          if (status == false) {
            console.log("[-] Failure to get comments from Youtube")
          }
          
        }else{
          console.log("[-] failure cookie authetication")
        }
        
      }
      
      // Execute this process when data sent from changeStyles action
      if (!data["message"]["styles"] == false) {
        var styles = data["message"]["styles"];
        size.setAttribute('value', styles["fontSize"])
        opacity.setAttribute('value', styles["opacity"])
        weight.setAttribute('value', styles["weight"])
        
        
        if (!format == styles["format"]) {
          
          if (styles["format"] == "youtube") {
            const container = document.createElement('div')
            container.classList.add('container')
            screen.appendChild(container)
            size.setAttribute('value', '25px')
          } else {
            screen.innerHTML = ''
          }
          format.setAttribute('value', styles["format"])
        }
        
      }
      
      //描写関数
      const createComment = (text, media) => {
        const width = document.documentElement.clientWidth
        const height = document.documentElement.clientHeight
        const format_value = format.getAttribute('value')
        
        // スタイルを指定
      
        if (format_value == 'niconico') {
          const comment = document.createElement('div')
          comment.innerHTML = text
          
          addAnimation(comment, 'niconico')
          mediaIcon(comment, media)
          screen.appendChild(comment)
      
          // アニメーションの追加
          comment.style.left = `${width}px`
          comment.style.top = randomHeight()
      
          const animationWidth = `-${width + comment.clientWidth}px`
          comment.style.setProperty('--translateX', animationWidth)
      
          comment.classList.add('animation')
      
          // コメントの削除
          setTimeout(() => comment.remove(), 30000)
          
        } else if (format_value == 'youtube') {
          const comment = document.createElement('div')
          comment.innerHTML = text
      
          addAnimation(comment, 'youtube')
          mediaIcon(comment, media)
      
          const container = document.querySelector('.container')
          container.appendChild(comment)
      
          container.scrollTop = container.scrollHeight
        }
      }
      
      const addAnimation = (comment, target) => {
        comment.style.color = color.getAttribute('value')
        comment.style.fontSize = size.getAttribute('value') + 'px'
        comment.style.opacity = opacity.getAttribute('value')
        comment.style.fontWeight = weight.getAttribute('value') + 'px'
        comment.classList.add(target)
        if (target == "youtube") {
          comment.classList.add('youtubeStyle')
        }
      }
      
      const mediaIcon = (comment, media) => {
        switch (media) {
          case 'Twitter':
            return comment.classList.add('twitterIcon')
          case 'Youtube':
            return comment.classList.add('youtubeIcon')
        }
      }
      
      const randomHeight = () => `${Math.round(Math.random() * 900)}px`
      
    } //if(location.pathname == '/screen')
  } //received(data)
});