const express = require('express');
const router = express.Router();
const passport= require('passport');
const mongoose= require('mongoose');
const jwt= require('jsonwebtoken');
const config=require('../config/database');
const User = require('../models/user');

router.post('/register',function (req,res,next) {
  //  res.send('REGISTER');
    const newuser = new User({
        Name:req.body.name,
        Username:req.body.username,
        Password:req.body.password,
        Email_Id:req.body.email,
        Mobile_no:req.body.mobile
    });

    User.addUser(newuser,function(err,user)  {
         if(err) {
               res.json({success:false,message:'Failed to Register'}) ;
         }
         else {
               res.json({success:true,message:'User Registered'});
         }

    });
});

// Authenticate
router.post('/authenticate',function(req,res,next){
//  res.send('AUTHENTICATE');
  const Username=req.body.username;
  const Password=req.body.password;

  User.getUserByUsername(Username,function(err,user){
    if(err) throw err;
    if(!user)
    {
      return res.json({success:false,msg:'User Not Found'})
    }

    User.comparePassword(Password,user.Password,function(err,isMatch){
      if(err) throw err;
      if(isMatch){
          const token=jwt.sign(user,config.secret,{
            expiresIn:604800  // 1 Week
          });

          res.json({
            success:true,
            token:'JWT '+token,
            user: {
              id:user._id,
              name:user.name,
              username:user.Username,
              email:user.email
            }
          });
      }
      else {
        return res.json({success:false,msg:'Wrong Password'});
      }
    });
  })
});




// Profile
router.get('/profile',passport.authenticate('jwt',{session:false}),function(req,res,next){
  res.json({user:req.user});
});

// Validate Routes
router.get('/validate',function(req,res,next){
  res.send();
});
module.exports = router;
