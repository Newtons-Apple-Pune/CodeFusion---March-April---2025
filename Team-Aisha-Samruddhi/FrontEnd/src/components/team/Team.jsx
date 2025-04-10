import React from 'react'
import TeamCard from './TeamCard'
import Back from '../common/back/Back'
import './team.css'
import AWrapper from '../about/AWrapper'
import "../about/about.css"

const Team = () => {
  return (
    <>
      <Back title='OUR TEAM'/>
      <section className='team padding' style={{marginTop:'400px'}}>
        <div className='container grid'>
      <TeamCard/>
      </div>
      </section>
      <AWrapper/>
    </>
  )
}

export default Team
