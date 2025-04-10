// import React from 'react';
// import ReactDOM from 'react-dom/client';
// // import './index.css';
// import App from './App';
// // import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
// import {CometChat} from '@cometchat/chat-sdk-javascript'
// import { CometChatUIKit } from "@cometchat/chat-uikit-react";

// let appID = "255626b0e354ffe0";
// let region = "in";
// let appSetting = new CometChat.AppSettingsBuilder()
//                   .subscribePresenceForAllUsers()
//                   .setRegion(region)
//                   .autoEstablishSocketConnection(true)
//                   .build();
// CometChat.init(appID, appSetting).then(
// () => {
//   console.log("Initialization completed successfully");
// }, error => {
//   console.log("Initialization failed with error:", error);
// }
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//     <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CometChat } from '@cometchat/chat-sdk-javascript';

import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('ORg4AjUWIQA/Gnt2UFhhQlJBfVpdXGJWfFN0QXNfdVx4flRCcC0sT3RfQFljTX9SdkxgWX9XcnNRRg==')
// const appID = "255626b0e354ffe0";
// const region = "in";
// const appSetting = new CometChat.AppSettingsBuilder()
//   .subscribePresenceForAllUsers()
//   .setRegion(region)
//   .autoEstablishSocketConnection(true)
//   .build();

// CometChat.init(appID, appSetting).then(
//   () => {
//     console.log("Initialization completed successfully");
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById('root')
    );
  // },
  // error => {
  //   console.log("Initialization failed with error:", error);
  // }
// );

