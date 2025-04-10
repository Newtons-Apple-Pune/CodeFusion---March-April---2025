import React, { useState } from 'react';
import Header from '../../components/common/header/header';
import { useHistory } from 'react-router-dom'; // Import useHistory instead of useNavigate
import Nav from '../Nav';

const Index = () => {
    const [roomCode, setRoomCode] = useState('');
    const history = useHistory(); // Use useHistory instead of useNavigate

    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        history.push(`/room/${roomCode}`); // Use history.push instead of navigate
    };

    const handleJoin=()=>{
       window.location.href = 'http://localhost:3000/join'
    }

    return (
        <div className='home-page'>
            <Header />
            <Nav/>
            <form onSubmit={handleFormSubmit} style={{ left: '100px', marginTop: '100px', width: '800px' }}>
                <div style={{ left: '100px' }}>
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
                <button type='submit' onClick={handleJoin}>Join ROOM</button>
            </form>
        </div>
    );
};

export default Index;
