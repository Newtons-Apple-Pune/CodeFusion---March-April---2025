import React from 'react'
import CalendarM from './Calendar'
import Nav from '../Nav'
import Header from '../../components/common/header/header'

const CalendarA = () => {
  return (
    <div>
        <Header/>
        <Nav/>
        <div className="bcv" style={{marginTop:"80px",marginLeft:"100px"}}>
      <CalendarM/>
      </div>
    </div>
  )
}

export default CalendarA
