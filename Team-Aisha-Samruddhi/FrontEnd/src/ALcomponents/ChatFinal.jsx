import React from 'react';
import Nav from './Nav';
import Header from '../components/common/header/header';
import Image from './online-video-chat.gif'; 

const ChatFinal = () => {
    const handleClick = () => {
        // window.location.href = 'http://localhost:3001/login';
        window.location.href='http://localhost:3001/home/chats-module/conversations-with-messages';
    }

    return (
        <div>
            <Nav/>
            <Header/>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '150px', marginLeft: '120px' }}>
        <img alt="image" className="img-fluid" src={Image} style={{ width: '400px', height: 'auto' }} />
        
        <p style={{ marginLeft: '20px', color:'#1eb2a6',fontSize:'20px' }}><hr/><hr/>
        In the digital age, the power of chatting lies in its ability to bridge the gap between students and teachers 
        instantaneously. It fosters a dynamic exchange of knowledge, where doubts are swiftly addressed, 
        and clarity is readily attained. Through the convenience of chatting, 
        students can engage with educators beyond the confines of traditional classrooms, 
        unlocking a world of learning opportunities at their fingertips
         <hr/><hr/>
        <button onClick={handleClick} style={{marginTop:'10px',marginLeft:'100px'}} className='btn btn-outline-success'>Start Chatting</button>
         </p>
      </div>
           </div>
    );
}

export default ChatFinal;
