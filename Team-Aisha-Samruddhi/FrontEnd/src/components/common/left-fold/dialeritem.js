import React from 'react'
import './dialeritem.css'

const DialerItem = ({item}) => {
  return (
    <div className='dibody'>
        <img src={item.avatar} className='diavatar' alt='img'/>
        <div className='diinfo'>
            <label className='dititle'>{item.name}</label>
            <label className='disubtitle'>{item.type}</label>
        </div>
        <div className='diicons'>
            <div className='diicon'>
            <i class="fa-solid fa-microphone"></i>

            </div>
            <div className='diicon'>
            <i class="fa-solid fa-camera"></i>

            </div>
        </div>
    </div>
  )
}

export default DialerItem