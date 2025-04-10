import React from 'react';
import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './ChatFeed';

import './Chatfinal.css';
import Modal from './LoginForm';
import Nav from '../Nav';
import Header from '../../components/common/header/header';

const projectID = '6f9242d2-4863-4828-aee2-42218fb42044';

const Chatfinal = () => {
  if (!localStorage.getItem('username')) return <Modal />;

  return (
   <div className="chat">
    <Header/>
        <Nav/>
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
    </div>
  );
};


// infinite scroll, logout, more customizations...

export default Chatfinal;