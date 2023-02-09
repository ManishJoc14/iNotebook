const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');
const JWT_SECRET = 'Manishisagoodboy';

//Route 1
//Create a User using : POST "/api/auth/createuser"  No login required
router.post('/createuser', [
   body('name', 'Name must be of at least 3 characters').isLength({ min: 3 }),
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password must be of at least 5 characters').isLength({ min: 5 }),
   ],async (req, res) => {
      var success;
      // if there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         success=false;
         errArr=errors.array()
         return res.status(400).json({success, errors: errArr.map(item => item.msg)});
      }
      //salting password
      //genrating salt
      let salt =  await bcrypt.genSalt(10);
      let securePass = await bcrypt.hash(req.body.password, salt);
      const {email}=req.body;
      try {
         let user = await User.findOne({email});
         if( !user){
            User.create({
               name: req.body.name,
               email: req.body.email,
               password: securePass, //inserting Hash salted password in database
            })
           const data={
               user:{
                  id:User.id
               }
            }
            const authToken = jwt.sign(data,JWT_SECRET);
            success=true;
            let name = req.body.name;
            res.json({success,name,authToken});
         }else{
             success = false;
             return res.status(400).json({ success,errors:"User already exits, Please login instead"});
         }
      }catch (error) {
        
         res.status(500).send({errors:error.message});
       }

});

//Route 1
// Authenticate a user using POST "/api/auth/login" No login required
router.post('/login',[
   body('email','Enter a valid email').isEmail(),
   body('password','Password cannot be blank').exists()
],async (req,res)=>{
   let success = false;
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({error:errors.array()});
      }
      const {email,password}=req.body;
      try{
        let user = await User.findOne({email});
        let name = user.name;
         if(! user){
            success = false;
            return res.status(400).json({ success,error:"Invalid user"});
         }
         const passwordCompare = await bcrypt.compare(password,user.password);
         if(!passwordCompare){
            success = false;
            return res.status(400).json({success,error:"Wrong password"});
         }
         const data={
            user:{
               id:user.id
            }
          };
         const authToken = jwt.sign(data,JWT_SECRET);
         success=true;
         res.json({success,name,authToken});

      }catch(error){
         success=false;
         res.status(500).json({success,error:"User Not found"});
      }
});
//Route 3
// Get loggedin user details using POST "/api/auth/getuser" login required
router.post('/getuser',fetchUser,async (req,res)=>{
      try {
         const userId = req.user.id;
         const user = await User.findById(userId).select('-password');
         res.send(user);
      } catch (error) {
        
         res.status(500).send("Internal server error");
      }
});

module.exports = router;