const express = require('express');
const router = express.Router();
const passport= require('passport');
const mongoose= require('mongoose');
const jwt= require('jsonwebtoken');
const config=require('../config/database');
const User = require('../models/user');
const generator = require('generate-password');
const nodemailer = require("nodemailer");
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

                var phoneno = /^\d{10}$/;

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

router.post('/uploadImage',function (req,res,next) {


    console.log('Images');
/*   const newImages = new Images({
            username:req.body.name,
            data:req.body.path,
            Type:req.body.type
     });

     console.log("In users.js");
     newImages.data = fs.readFileSync('FrontEnd/'+newImages.data);

     newImages.save(function (err,a) {
         if (err) throw err;
         console.log("Image Saved to Database");
     });*/

});


router.get('/getuploadImage/:username',function (req,res,next) {
    Images.findOne({},function (err,image) {
        if(err) return next(err);
        console.log(image.data);
        res.contentType(image.Type);
        res.send(image.data);
    });
});


router.post('/forget',function(req,res,next)  {

    const email = req.body.email;
    User.findOne({Email_Id:email},function(err,user) {
        if(err) {
            return res.json({success: false,msg:'Something Wrong Happen'});
        }

        if(!user) {
            return res.json({success: false,msg:'User Not Found'});
        }

        var Password = generator.generate({ length: 10, numbers: true});
        var smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'jayesh.p.ladumor@gmail.com',
                pass: 'Jayesh@1997'
            },
            tls: {rejectUnauthorized: false},
            debug:true
        });

        var data = {
            from: 'jayesh.p.ladumor@gmail.com',
            to: user.Email_Id,
            subject: 'Password Changed', text: 'Hii! '+user.Name+'\n\n\nEmail Id :'+user.Email_Id+'\nPassword='+Password+'\n\nPlease Be Secure..\n\nThank You!'
        };

        smtpTransport.sendMail(data, function(error, response){
            if(error){
                console.log("mail not sent--Password Remains As it As");
                console.log(error);
                return res.json({success:false,msg:"Mail has been not sent to your email"+user.Email_Id});
            }
            else{
                console.log("Mail Has Been Sent to : "+user.Email_Id);
                bcrypt.genSalt(10,function(err,salt) {
                    bcrypt.hash(Password,salt,function(err,hash) {
                        if(err){
                            return res.json({success: false,msg:'Error While setting Password'});
                        }
                        user.Password = hash;
                        user.save();
                        return res.json({success: true,msg:'Mail Has Been sent to your Email'+user.Email_Id});
                    });
                });
            }
        });

    });
});



module.exports = router;

