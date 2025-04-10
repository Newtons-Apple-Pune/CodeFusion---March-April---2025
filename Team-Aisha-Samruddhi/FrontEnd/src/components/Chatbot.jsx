import React, { useEffect } from 'react'
 
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
        "composerPlaceholder": "chat with RAHBER",
        "botConversationDescription": "Life is all about learning",
        "botId": "91aaa601-f605-4e73-ab72-b870a6c517e6",
        "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
        "messagingUrl": "https://messaging.botpress.cloud",
        "clientId": "91aaa601-f605-4e73-ab72-b870a6c517e6",
        "webhookId": "fbf3bc33-79b3-4076-8b60-30e77fb28930",
        "lazySocket": true,
        "themeName": "prism",
        "botName": "RAHBER",
        "avatarUrl": "https://thumbs.dreamstime.com/b/technology-logo-design-r-letter-concept-network-238956532.jpg",
        "phoneNumber": "9833647264",
        "emailAddress": "rahberinfo@gmail.com",
        "frontendVersion": "v1",
        "useSessionStorage": true,
        "enableConversationDeletion": true,
        "theme": "prism",
        "themeColor": "#2563eb"
    });
    }
  }, [])
 
  // return <div id="webchat" />
}
 
export default Chatbot
