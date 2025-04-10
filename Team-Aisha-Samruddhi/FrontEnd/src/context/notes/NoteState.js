import React, { useState,useEffect } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    // Retrieve auth token from localStorage on component mount
    const token = localStorage.getItem("token");
    setAuthToken(token);
  }, []);

  // Get all Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //"auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZWNjNWM3N2ViZTNiY2VjNzQ1NjY4IiwiTG9naW5JRCI6IlN1aGFzbmkiLCJ1c2VyVHlwZSI6InN0dWRlbnQifSwiaWF0IjoxNzA3OTU0Mjk4fQ.befyTbz5VwwItWdMc_mSbgSWBPWBI91KkU6WpniIbN0",
          "auth-token":authToken
        },
      });
      const json = await response.json();
      if (Array.isArray(json)) {
        setNotes(json);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a Note
  const addNote = async (Title, Description) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":authToken
          //"auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZWNjNWM3N2ViZTNiY2VjNzQ1NjY4IiwiTG9naW5JRCI6IlN1aGFzbmkiLCJ1c2VyVHlwZSI6InN0dWRlbnQifSwiaWF0IjoxNzA3OTU0Mjk4fQ.befyTbz5VwwItWdMc_mSbgSWBPWBI91KkU6WpniIbN0",
        },
        body: JSON.stringify({ Title, Description }),
      });
      const note = await response.json();
      setNotes([...notes, note]); // Add the new note to the existing notes array
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":authToken
          //"auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZWNjNWM3N2ViZTNiY2VjNzQ1NjY4IiwiTG9naW5JRCI6IlN1aGFzbmkiLCJ1c2VyVHlwZSI6InN0dWRlbnQifSwiaWF0IjoxNzA3OTU0Mjk4fQ.befyTbz5VwwItWdMc_mSbgSWBPWBI91KkU6WpniIbN0",
        },
      });
      setNotes(notes.filter((note) => note._id !== id)); // Filter out the deleted note
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a Note
  const editNote = async (id, Title, Description) => {
    try {
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":authToken
          //"auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZWNjNWM3N2ViZTNiY2VjNzQ1NjY4IiwiTG9naW5JRCI6IlN1aGFzbmkiLCJ1c2VyVHlwZSI6InN0dWRlbnQifSwiaWF0IjoxNzA3OTU0Mjk4fQ.befyTbz5VwwItWdMc_mSbgSWBPWBI91KkU6WpniIbN0",
        },
        body: JSON.stringify({ Title, Description }),
      });
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, Title, Description } : note
        )
      ); // Update the specific note that was edited
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
