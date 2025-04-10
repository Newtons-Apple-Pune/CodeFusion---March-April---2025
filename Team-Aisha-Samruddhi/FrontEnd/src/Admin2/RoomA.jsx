import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import Navbar from './Navbar';

const RoomA = () => {
    const [roomCode, setRoomCode] = useState('');
    const history = useHistory(); // Use useHistory instead of useNavigate

    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        history.push(`/roomA/${roomCode}`); // Use history.push instead of navigate
    };


    return (
        <div className='home-page'>
            <Navbar/>
            <form onSubmit={handleFormSubmit} style={{ left: '20px', marginTop: '100px', width: '800px' }}>
                <div style={{ left: '20px' }}>
                    <label>ROOM NAME</label>
                    <input
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        type='text'
                        required
                        placeholder='room code'
                    />
                </div>
                <button type='submit'>CREATE ROOM</button>
            </form>
        </div>
    );
};

export default RoomA;
