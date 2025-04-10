import React from 'react'
import CalendarM from './Calendar'
import Navbar from '../../Admin2/Navbar'

const CalendarMain = () => {
  return (
    <div>
      <Navbar/>
      <div className="c" style={{marginTop:"100px"}}>
     <CalendarM />
     </div>
    </div>
  )
}

export default CalendarMain
