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
      
      //時間差をつけてコメントを描写関数へ送る
      const randomTime = (comment, format) => {
        const random = Math.round(Math.random() * 7000)
        setTimeout(() => {
          createComment(comment, format)
        }, random)
      }       
      
      if (data["message"]["comments"]) {
        var comments = data["message"]["comments"];
        var comments_count = Object.keys(comments).length;
  
        for (let i = 0; i < comments_count; i++) {
          randomTime(comments[i].text, comments[i].target)
        }
      }
      
      
      //描写関数
      const createComment = (text, media) => {
        const width = document.documentElement.clientWidth
        const height = document.documentElement.clientHeight
        const format = 'niconico'
        
        // スタイルを指定
      
        if (format == 'niconico') {
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
          
        } else if (format == 'youtube') {
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
        const color = document.getElementById('color')
        const size = document.getElementById('fontSize')
        const opacity = document.getElementById('opacity')
        comment.style.color = color.getAttribute('value')
        comment.style.fontSize = size.getAttribute('value')
        comment.style.opacity = opacity.getAttribute('value')
        comment.style.display = "flex"
        comment.style.alignItems = 'center'
        //comment.style.fontWeight = weight
        comment.classList.add(target)
      }
      
      const mediaIcon = (comment, media) => {
        switch (media) {
          case 'Twitter':
            return comment.classList.add('twitterIcon')
          case 'Youtube':
            return comment.classList.add('youtubeIcon')
        }
      }
      
      const randomHeight = () => `${Math.round(Math.random() * 500)}px`
      
    } //if(location.pathname == '/screen')
  } //received(data)
});