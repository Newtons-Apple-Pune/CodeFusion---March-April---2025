import React from 'react'
import './left-fold.css'
import { CallsMenu, DialerList } from '../../../data/dataLF'
import MenuItem from './menuitem'
import DialerItem from './dialeritem'


const LeftFold= () => {
  const menu=CallsMenu
  const dialerList = DialerList;
  return (
    <div className='Lfbody'>
       <div className='Lfmenu'>
          <label className='menulabel'>Calls</label>
        <div className='menuItems'>
          {
            menu.map(
              (item)=>{
                return< MenuItem item={item}/>
              }
            )
          }
        </div>  

       </div>
       <div className='Lfdialer'>
        <label className='dialerlabel'>Make a Call</label>
        <div className='dialersearch'>
          <input placeholder='Type a name'/>
        </div>
        <div className='dialersuggested'>
          <label className='suggestedlabel'>Suggested</label>
          <div className='suggestedlist'>
            {dialerList.map((item) => {
                return<DialerItem item={item} />
              }
            )}

          </div>

        </div>
        <div className='dbottom'>
          <div className='dbicon'><i class="fa-solid fa-microphone"></i></div>
          <div className='dbicon'><i class="fa-solid fa-video"></i></div>
        </div>
       </div>

    </div>
  )
}

export default LeftFold
