import React from 'react'
import { team } from '../../data'
import './TeamCard.css'

const TeamCard = () => {
  return (
    <>
      {team.map((val, index) => (
        <div className='items shadow' key={index} style={{width:'230px',height:'500px', borderRadius: '2px', border: '2px solid black' }}>
          <div className='img'>
            <img src={val.cover} className='team-image' alt='' style={{width:'250px',height:'300px'}}/>
            <div className='overlay'>
              {/* Facebook */}
              <a href={val.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                <i className='fab fa-facebook-f icon'></i>
              </a>
              {/* Twitter */}
              <a href={val.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                <i className='fab fa-twitter icon'></i>
              </a>
              {/* Instagram */}
              <a href={val.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                <i className='fab fa-instagram icon'></i>
              </a>
              {/* LinkedIn */}
              <a href={val.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                <i className='fab fa-linkedin icon'></i>
              </a>
            </div>
          </div>
          <div className='details'>
            <h2>{val.name}</h2>
            <p>{val.work}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default TeamCard;
