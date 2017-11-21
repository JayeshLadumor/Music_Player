/**
 * Created by jayes on 14-Nov-17.
 */
const express = require('express');
const router = express.Router();
const passport= require('passport');
const mongoose= require('mongoose');
const jwt= require('jsonwebtoken');
const config=require('../config/database');
const Music = require('../models/music');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


router.post('/uploadMusic',function (req,res,next) {

    const newMusic = new Music({
        Albumname:req.body.Albumname,
        Songname:req.body.Songname,
        Moviename:req.body.Moviename,
        data:req.body.data,
        Type:'audio/mpeg',
        songpath:"http://localhost:3000/musics/getuploadMusic/"
    });

    console.log("Uploading Music File...");
    newMusic.data = fs.readFileSync('FrontEnd/'+newMusic.data);

    newMusic.save(function (err,music) {
        if (err)
        {
            console.log("unfortunately Music File Could not Uploaded..");
            res.json({success:false,message:"Sorry..File Not Uploaded to Database"});
        };
        console.log("You Have Successfully Music File Uploaded..");
        res.json({success:true,message:"Successful!!..You Have uploaded Music File"});
    });
});


router.get('/getuploadMusic/:xyz',function (req,res,next) {

    Music.findOne({Albumname:"default"},function (err,musicfiles) {
        if(err) return err;
        res.contentType(musicfiles.Type);
        res.send(musicfiles.data);
    })
});

router.post('/uploadedmusic',multipartMiddleware,function (req,res,next) {

    const newMusic = new Music({
        Songname:req.body.songname,
        Type:'audio/mpeg',
        songpath:("http://localhost:3000/musics/getuploadMusic/"+req.body.songname).trim()
    })

    if(req.body.musicoralbum=="Album")
    {
        newMusic.Moviename="default";
        newMusic.Albumname=req.body.moviename;
    }
    else {
        newMusic.Moviename=req.body.moviename;
        newMusic.Albumname="default";
    }

    newMusic.data=fs.readFileSync(req.files.file.path);

    newMusic.save(function (err,music) {
        if (err)
        {
            console.log("unfortunately Music File Could not Uploaded..");
            res.json({success:false,message:"Sorry..File Not Uploaded to Database"});
        };
        console.log("You Have Successfully Music File Uploaded..");
        res.json({success:true,message:"Successful!!..You Have uploaded Music File"});
    })


});

router.get('/getsongarray',function (req,res,next) {
    console.log("Getting Songs");
    Music.find({},function (err,musics) {
        if(err) return err;
        /*  res.writeHead(200,{'Content-Type':'application/json'});
         res.write(JSON.stringify(musicfiles));
        res.end(); */
        res.json({musics:musics});
    })
})
module.exports = router;