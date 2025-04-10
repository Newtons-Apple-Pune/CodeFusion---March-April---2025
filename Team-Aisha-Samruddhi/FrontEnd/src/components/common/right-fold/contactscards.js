import React from 'react'
import "./contactscards.css"

function ContactsCards({ item }) {
    return (
        <div className='ccbody'>
            <div className='cctop'>
                <img src={item.avatar} className='cavatar' alt='img' />
                <div className='ccinfo'>
                    <label className='cctitle'>{item.name}</label>
                    <label className='ccsubtitle'>{item.type}</label>

                </div>
            </div>
            <div className='ccicons'>
                <div className='cciicons'>
                <i class="fa-solid fa-microphone"></i>
                </div>
                <div className='cciicons'>
                <i class="fa-solid fa-video"></i>
                </div>
                <div className='cciicons'>
                <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>
        </div>
    )
}

export default ContactsCards