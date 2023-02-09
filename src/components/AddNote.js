import React, { useState,useContext } from 'react'
import noteContext from '../context/notes/noteContext';


const AddNote = (props) => {
    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({title:"",description:"",tag:""});
    const handleAddNote = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("Note added successfully",'success');
    }
    const onChange = (e)=>{ 
        setNote({...note,[e.target.name]:e.target.value});  
    }

  return (
    <div className="container  my-3 ">
        <h2>Add a note </h2>
        <form onSubmit={handleAddNote}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input required type="text" minLength={3} className="form-control textInput" id="title" name='title'value={note.title} aria-describedby="emailHelp" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input required minLength={5} type="text" className="form-control textInput" id="description" name='description'value={note.description} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input required type="text"minLength={3} className="form-control textInput" id="tag" name='tag'value={note.tag} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary">Add Note </button>
        </form>
        </div>
  )
}

export default AddNote