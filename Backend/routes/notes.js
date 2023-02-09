const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note')
//Route 1
//Get all notes using : GET "/api/notes/fetchallnotes"  login required
router.get('/fetchallnotes',fetchUser, async(req,res)=>{
    try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes);
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
     }
 
});

//Route 2
//Add new notes using : POST "/api/notes/addnote"  login required
router.post('/addnote',fetchUser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be of at least 5 characters').isLength({ min: 5 })
  ],
  async(req,res)=>{
    try {
        const {title,description,tag}=req.body;
         // if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const note = new Note({
            title,description,tag, user:req.user.id
        });
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
     }  
  }
);


//Route 3
//Update notes using : PUT "/api/notes/updatenote/:id"  login required
//:id this is the id of note 
router.put('/updatenote/:id',fetchUser,async(req,res)=>{ 
    const {title,description,tag} = req.body;
    try {
         //create new note 
    const newNote = {};
    if(title){ newNote.title = title  };
    if(description){ newNote.description = description  };
    if(tag){ newNote.tag = tag  };

    //find the note to be updated
    let note = await Note.findById(req.params.id);

    // check if note exits
    if(!note){ return res.status(404).send('Not found')};

    // allow deletion if owner owns it 

    //note.user.toString will give the user id through users database
    // check if the person who requested updation is the owner of the note 
    if(note.user.toString() !== req.user.id){ return res.status(401).send('Not allowed')}

    note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true});
    res.json({note});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
     }
   

  }
);


//Route 4
//Delete an existing note using : DELETE "/api/notes/deletenote/:id"  login required
//:id this is the id of note 
router.delete('/deletenote/:id',fetchUser,async(req,res)=>{ 
    try {
    //find the note to be deleted
    let note = await Note.findById(req.params.id);

    // check if note exits
    if(!note){ return res.status(404).send('Not found')};

    // allow deletion if owner owns it 
    //note.user.toString will give the user id through users database
    // check if the person who requested to delete is the owner of the note 
    if(note.user.toString() !== req.user.id){ return res.status(401).send('Not allowed')}

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"success":"Note has been deleted",note});
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
     }
   

  }
);


module.exports = router