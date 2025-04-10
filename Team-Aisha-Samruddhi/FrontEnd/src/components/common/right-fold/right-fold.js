import React from 'react'
import "./right-fold.css"
import { CallsContact } from '../../../data/dataLF';
import ContactsCards from './contactscards';

const RightFold = () => {
  const callscontact = CallsContact;
  return (
    <div className='Rfbody'>
      <div className='Rfheading'>
        <label className='RfHlabel'>Contacts</label>
      </div>
      <div className='Rfoptions'>
        <div className='Rfcontactsearch'>
          <input placeholder='Find a Contact' />
          <div className='RfCicon'>
          <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className='Rfaddbutton'>
          <div className='Rfaddicon'>
          <i class="fi fi-br-users-medical"></i>
          </div>
          <label className='RfAlabel'>Add Contact</label>
        </div>
      </div>
      <div className='Rfcontacts'>
      {callscontact.map((item) => {
                return<ContactsCards item={item}/>
              }
            )}
      </div>
    </div>
  )
}

export default RightFold