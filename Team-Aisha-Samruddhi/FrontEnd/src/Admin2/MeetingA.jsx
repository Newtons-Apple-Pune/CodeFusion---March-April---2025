import React from 'react'
import Navbar from './Navbar'
import { useHistory } from 'react-router-dom';
import Image from '../ALcomponents/Pages/sync2.svg';

const MeetingA = () => {
        let history = useHistory();
        const handleCreateMeeting = () => {
          // Redirect to the desired URL
          window.location.href = 'http://localhost:3000/roomA';
        };
  return (
      <>
      <Navbar/>
      <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '150px', marginLeft: '20px' }}>
        <img alt="image" className="img-fluid" src={Image} style={{ width: '400px', height: 'auto' }} />
        <p style={{ marginLeft: '20px', color:'#1eb2a6',fontSize:'20px' }}>
        Students, remember that your questions hold the key to unlocking deeper understanding. 
        Don't hesitate to voice your doubts,
         for they fuel the flames of curiosity, propelling you towards greater insight and mastery.
         <hr/><hr/>
         Teachers, Embrace the power of your lectures, for within them lies the potential to shape countless futures.
          Your guidance illuminates pathways to knowledge, inspiring students to embark on journeys of discovery.<br/>
          <button className='btn btn-outline-success' onClick={handleCreateMeeting} style={{ marginLeft: '20px'}}>Create Meeting</button>
         </p>
      </div>
      </>
  )
}

export default MeetingA
