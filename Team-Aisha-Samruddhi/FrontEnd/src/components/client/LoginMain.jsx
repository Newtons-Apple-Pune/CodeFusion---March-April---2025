import React from 'react'
import Back from '../common/back/Back'
import LoginForm from './LoginForm'

const LoginMain = () => {
  return (
    <div>
      <Back />
      <center>
      <h1 style={{marginTop:150,color:'black',fontSize:60}}>LOGIN TO RAHBER</h1>
      </center>
      <LoginForm/>
    </div>
  )
}

export default LoginMain
