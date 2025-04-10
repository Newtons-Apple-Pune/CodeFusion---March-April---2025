import React from 'react'
import Notes from './Notes'
import Nav from '../ALcomponents/Nav'
import NoteState from '../context/notes/NoteState'
import Header from './common/header/header'

const NotesHome = () => {
  return (
    <div>
      <NoteState>
      <Header/>
      <Nav/>
      <Notes/>
      </NoteState>
    </div>
  )
}

export default NotesHome
