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
      const fontSize = document.getElementById('fontSize')
      const animationDuration = document.getElementById('animationDuration')
      
      // コメントをレンダーする処理。
      // Execute this process when data sent from index action
      if (!data["message"]["comments"] == false) {
        var comments = data["message"]["comments"];
        var comments_count = Object.keys(comments).length;
        
        // Add a comment in span tag to html
        const createAnimation = (comment, counter) => {
          const box = document.createElement('span');
          box.innerHTML = comment['text'] ;
          box.classList.add('comment');
          box.style.fontSize = `${fontSize.getAttribute('value')}px`;
          box.style.animationDuration = `${animationDuration.getAttribute('value')}s`;
          box.style.animationName = `lane${counter}`;
          screen.appendChild(box);
        };
        
        // Execute createAnimation function for each comments
        // This function is also generate a number that need for selecting lane
        try {
          if (comments_count == 0) {
            console.log('[-] undefined comments');
            return;
            
          } else {
            var counter = 0;
            for (let i = comments_count; 0 < i; i-- ) {
              if (counter < 9) {
                counter++;
              } else {
                counter = 0
              }
              createAnimation(comments[i - 1], counter)
            }
          }
          
        } catch (e) {
          console.log(comments)
          console.log(e)
        }
      } //function Endpoint if message has comments hash
      
      
      // Execute this process when data sent from changeStyles action
      if (!data["message"]["styles"] == false) {
        var styles = data["message"]["styles"];
        fontSize.setAttribute('value', styles["fontSize"])
        animationDuration.setAttribute('value', styles["fontSpeed"])
      }
      
    }
    
  }
  
});