import React from 'react'
import './menuItem.css'

 const MenuItem = ({item, isActive}) => {
    const classList= isActive ? 'itemactive menuitem ' : 'menuitem';
  return (
    <div className={classList}>
        <div className='itemIcon'>{item.icon}</div>
        <label className='itemLabel'>{item.name}</label>
    </div>
  )
}

export default MenuItem