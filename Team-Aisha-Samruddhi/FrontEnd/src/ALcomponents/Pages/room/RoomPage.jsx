import React from 'react'
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { elements } from 'chart.js';
import './App.css'
import Header from '../../../components/common/header/header';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Nav from '../../Nav';

const RoomPage = () => {
    let history = useHistory();
    const HandleQuit=()=>{
           // Redirect to the desired URL
           window.location.href = 'http://localhost:3000/calls';
    }
    const { roomId } = useParams();
    const MyMeeting = async(element) => {
        // const appid = 159707880 ;
        // const serversecret = "d0bec19c1d30403618e99356145185c6"
        const appid = 868759646 ;
        const serversecret = "9b7b89a4de9b2d7611d486565d59f5a0"
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
    <Nav/>
    {/* <Header/> */}
    <div className='room-page' style={{marginTop:'60px',marginLeft:'100px',width:'1100px',height:'300px',zIndex:'1000'}}>
        <button onClick={HandleQuit} className='btn btn-outline-danger'>GO TO MAIN PAGE</button>
        <div ref={MyMeeting}/>
        </div>
        <div className="header-main" style={{marginLeft:'0'}}>
        <Header/>
        </div>
    </>
  )
}

export default RoomPage

