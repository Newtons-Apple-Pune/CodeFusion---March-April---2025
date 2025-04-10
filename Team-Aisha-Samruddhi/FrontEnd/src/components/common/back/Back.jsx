import React from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

const Back = ({title}) => {
    const location = useLocation()
  return (
    <div className='back'>
      <section className='back'>
        <h2>Home /{location.pathname.split("/")[1]}</h2>
        <h1>{title}</h1>
      </section>
      <div className="margin"></div>
    </div>
  )
}

export default Back
