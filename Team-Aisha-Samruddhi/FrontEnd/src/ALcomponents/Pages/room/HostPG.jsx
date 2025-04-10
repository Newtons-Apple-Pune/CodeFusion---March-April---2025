import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'; // Import useHistory instead of useNavigate
import Header from '../../../components/common/header/header';
import Nav from '../../Nav';


const HostPG = () => {

    const [roomCode, setRoomCode] = useState('');
    const history = useHistory(); 

    const handleFormSubmit = (ev) => { 
        ev.preventDefault();
        history.push(`/room/${roomCode}`); // Use history.push instead of navigate
    };
    const handleJoin=()=>{
        window.location.href = 'http://localhost:3000/room'
     }

    return (
        <div className='home-page'>
            <Header/>
            <Nav/>
            <form onSubmit={handleFormSubmit} style={{ left: '100px', marginTop: '100px', width: '800px' }}>
                <div style={{ left: '100px' }}>
                    <label>Enter Room Code To Join</label>
                    <input
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        type='text'
                        required
                        placeholder='room code'
                    />
                </div>
                <button type='submit'>Enter room</button>
                <button type='submit' onClick={handleJoin}>CREATE ROOM</button>
            </form>
        </div>
);
};
export default HostPG
