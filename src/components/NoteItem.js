import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const { deleteNote } = useContext(noteContext);
    const { note,updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div className="icons">
                            <i className="fa-solid fa-pen-to-square mx-2"onClick={()=>{updateNote(note)}} ></i>
                            <i className="fa-solid fa-trash mx-2"onClick={()=>{deleteNote(note._id); props.showAlert("Note deleted successfully",'success')}}></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <span className="card-text">#{note.tag}</span>
                </div>
            </div>
        </div>
    )
}

export default NoteItem