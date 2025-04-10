import React from 'react'
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { elements } from 'chart.js';
import './RoomPage.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from './Navbar';

const RoomPageA = () => {
    let history = useHistory();
    const HandleQuit=()=>{
           // Redirect to the desired URL
           window.location.href = 'http://localhost:3000/MeetingA';
    }
    const { roomId } = useParams();
    const MyMeeting = async(element) => {
        const appid = 159707880 ;
        const serversecret = "d0bec19c1d30403618e99356145185c6"
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appid,
            serversecret,
            roomId,
            Date.now().toString(),
            'AISHA'
            )
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom(
            {
                container : element,
                scenario:{
                    mode: ZegoUIKitPrebuilt.VideoConference
                }
            }
        )
    }
  return (
    <>
    <Navbar/>
    <div className='room-page' style={{marginTop:'60px',marginLeft:'20px',width:'1200px',height:'300px',zIndex:'1000'}}>
        <button onClick={HandleQuit} className='btn btn-outline-danger' style={{marginBottom:'20px'}}>GO TO MAIN PAGE</button>
        <div ref={MyMeeting}/>
        </div>
        {/* <div className="header-main" style={{marginLeft:'0'}}>
        <Header/>
        </div> */}
    </>
  )
}

export default RoomPageA

