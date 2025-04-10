import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({Title: "", Description: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.Title, note.Description);
        setNote({Title: "", Description: ""})
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2 style={{marginTop:'80px'}}>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="Title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="Title" name="Title" aria-describedby="emailHelp" value={note.Title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="Description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="Description" value={note.Description} onChange={onChange} minLength={5} required />
                </div>
               
                <button disabled={note.Title.length<5 || note.Description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote