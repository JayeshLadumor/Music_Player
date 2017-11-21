const express = require('express');
const router = express.Router();
const passport= require('passport');
const mongoose= require('mongoose');
const jwt= require('jsonwebtoken');
const config=require('../config/database');
const User = require('../models/user');

var emailCheck = require("email-check");
var fs = require('fs');
const Images = require('../models/image');

router.post('/register',function (req,res) {
  //  res.send('REGISTER');
    const newUser = new User({
        Name:req.body.name,
        Username:req.body.username,
        Password:req.body.password,
        Email_Id:req.body.email.toLowerCase(),
        Mobile_no:req.body.mobile,
        Usertype:req.body.usertype
    });



                User.getUserByUsername(newUser.Username,function (err,user) {

                    if(user)
                    {
                        return res.json({success:false,message:'User Already Exist'});
                    }

                    User.getUserByemailid(newUser.Email_Id,function (err,user) {
                        if(user)
                        {
                            return res.json({success:false,message:'Email Id ALready Registered'});
                        }

                        User.addUser(newUser,function(err,user)  {
                            if(err) {
                                res.json({success:false,message:'Failed to Register'}) ;
                            }
                            else {
                                res.json({success:true,message:'User Registered'});
                            }

                        });

                    })
                    /*var kickbox = require('kickbox').client('live_ab293fc02a9156a88ac18dbeb8ce5e64d77d9508139930e9a181abcfa0d6c2e4').kickbox();
                    console.log(newUser.Email_Id);
                    kickbox.verify(newUser.Email_Id, function (err, response) {
                        // Let's see some results
                        console.log(response.body);
                    });*/


                })




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
              usertype:user.Usertype,
              token:'JWT '+token,
              user: {
                id:user._id,
                name:user.Name,
                username:user.Username,
                email:user.Email_Id
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


router.post('/convert',function (req,res,next) {
    const quality=req.body.quality;
    const quality1=quality.replace('kbps','');
    console.log(quality1);

    const Lame = require("node-lame").Lame;

    const encoder = new Lame({
        "output": "xyz.mp3",
        "bitrate": 192
    }).setFile(fs.readFileSync("bird.wav"));

    encoder.encode()
        .then(function()  {
        // Encoding finished
        console.log("Encoding finished");
    })
    .catch(function(error) {
        // Something went wrong
        console.log("Something went wrong");
    });

});


router.post('/uploadImage',function (req,res,next) {

   const newImages = new Images({
            username:req.body.name,
            data:req.body.path,
            Type:req.body.type
     });

     console.log("In users.js");
     newImages.data = fs.readFileSync('FrontEnd/'+newImages.data);

     newImages.save(function (err,a) {
         if (err) throw err;
         console.log("Image Saved to Database");
     });

});


router.get('/getuploadImage/:username',function (req,res,next) {
    Images.findOne({},function (err,image) {
        if(err) return next(err);
        console.log(image.data);
        res.contentType(image.Type);
        res.send(image.data);
    });
});



module.exports = router;

