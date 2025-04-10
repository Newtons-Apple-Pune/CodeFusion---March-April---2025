import React from 'react'
import Hero from './hero/Hero'
import AboutCard from '../about/AboutCard'
import CourseCaed from '../allcourses/CourseCaed'
import Back from '../common/back/Back'
import Chatbot from '../Chatbot'


const Home = () => {
  return (
    <div>
      <Back/>
      <Hero />
      <Chatbot/>
      <AboutCard/>
      <CourseCaed/>
    </div>
  )
}

export default Home
