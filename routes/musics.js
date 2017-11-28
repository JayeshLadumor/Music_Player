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
var lamejs = require("lamejs");


router.get('/getImage/:Type/:Typename',function (req,res,next) {
        var Type = req.params.Type;
        var Typename = req.params.Typename;

        var query;

         if(Type=="Albumname")
         {
            query = {Albumname:Typename};
         }
         else if(Type=="Moviename")
         {
            query = {Moviename:Typename};
         }

    Music.findOne(query,function (err,musicfile) {
        if(err)
        {
            res.send('Error');
        }
        res.contentType(musicfile.ImageType);
        res.send(musicfile.Image);
    })
})



router.get('/getuploadMusic/:Type/:Typename/:Typesong',function (req,res,next) {

    var Type = req.params.Type; // Moviename or Album
    var Typename = req.params.Typename; // Moviename or Albumname
    var songname = req.params.Typesong;  // Name of Song
    var query;

    if(Type=="Albumname")
    {
        query = {Albumname:Typename};
    }
    else if(Type=="Moviename") {
        query = {Moviename:Typename}
    }

     Music.findOne(query,{'Data':{$elemMatch:{Songname:songname}}},function (err,musicfile) {
         res.contentType(musicfile.Data[0].Type);
         res.send(musicfile.Data[0].data);
     })
})


router.get('/DownloadMusic/:name',function (req,res,next) {
    console.log(req.params.name);
    Music.findOne({'Data.Songname':req.params.name},{'Data.$':1},function (err,musicfiles) {
        if(err)
        {
            res.json({result:false,message:'Not Found In Our Database'})
        }
        console.log(musicfiles);


        var download = require('download-file');
        var url = musicfiles.Data[0].songpath;

        /*var options = {
            directory:"C:/Users/jayes/Desktop",
            filename: req.params.name
        }

        download(url,options,function (err) {
            if(err) throw err;
            console.log("Success");
        })*/
        /*res.setHeader('Content-Type','audio/mpeg');
        res.setHeader('Content-Disposition','attchment; filename='+musicfiles.Data[0].Songname.mp3);
        res.send(musicfiles.Data[0].data);*/
        res.download(musicfiles.Data[0].songpath,musicfiles.Data[0].Songname);
    })
});



router.post('/uploadedmusic',multipartMiddleware,function (req,res,next) {

    var str=req.body.artists;
    var array=[];
    array = str.split(',');
    var type;
    var query;
    var query1;
    if(req.body.musicoralbum == "Album")
    {
        type = "Albumname";
        query = {Albumname:req.body.moviename};
        query1 = {Albumname:req.body.moviename,Image:fs.readFileSync(req.files.ImageFile.path),Imagepath:"http://localhost:3000/musics/getImage/"+type+"/"+(req.body.moviename).trim(),ImageType:req.files.ImageFile.type};
    }
    else {
        type = "Moviename";
        query = {Moviename:req.body.moviename};
        query1 = {Moviename:req.body.moviename,Image:fs.readFileSync(req.files.ImageFile.path),Imagepath:"http://localhost:3000/musics/getImage/"+type+"/"+(req.body.moviename).trim(),ImageType:req.files.ImageFile.type};
    }

    Music.findOne(query,function (err,musicdoc) {
        if(err)
        {
            return res.json({success: false, message: "Error !! "});
        }

        var arraydata = {
            Songname:req.body.songname,
            Type:"audio/mpeg",
            songpath:"http://localhost:3000/musics/getuploadMusic/"+type+"/"+(req.body.moviename).trim()+"/"+(req.body.songname).trim(),
            data:fs.readFileSync(req.files.file.path),
            Artist:array
        }

        Music.update(query1,{$push:{Songname:req.body.songname,Data:arraydata}},{upsert:true},function (err,musicdata) {
            if(err)
            {
                console.log("unfortunately Music File Could not Uploaded..2");
                return res.json({success: false, message: "Sorry..File Not Uploaded to Database"});
            }
            console.log("You Have Successfully Music File Uploaded..to Album..2");
            return res.json({success: true, message: "Successful!!..You Have uploaded Music File"});
        })
    })
});


router.post('/deletesong',function (req,res,next) {
    Music.update({$or:[{Moviename:req.body.movieselect},{Albumname:req.body.movieselect}]},{$pull:{Data:{Songname:req.body.songselect}}},function (err,data)
        {
            if(err)
            {
                res.json({result:false})
            }
            return res.json({result:true,message:"Movie or Album Not Found"});
});
});



router.get('/getmoviearray',function (req,res,next) {
    Music.find({},function (err,movies) {
        if(err) return err;
        return res.json({movies:movies});
    })
});

router.post('/getsongarray',function (req,res,next) {
    console.log("Getting Songs");
    Music.find({$or:[{Moviename:req.body.moviename},{Albumname:req.body.moviename}]},function (err,songs) {
        if(err) return err;
        console.log('send');
        return res.json({songs:songs});
    })
});


router.post('/seachtext',function (req,res,next) {

    if(req.body.searchitem=="ALBUM")
    {
        console.log('Searching For Album ...');

        Music.find({Albumname:new RegExp(req.body.searchtext, "i")},{'Data':1},function (err,docs) {
                    console.log(docs);
                    if(err)
                    {
                        console.log('ERROR');
                    }
                     return res.json({docs:docs})
            });

    }
    if(req.body.searchitem=="Movie")
    {
        console.log('Searching For Movie ...');
        Music.find({Moviename:new RegExp(req.body.searchtext, "i")},{'Data':1},function (err,docs) {
                    console.log(docs);
                    if(err)
                    {
                        console.log('ERROR');
                    }
                    return res.json({docs:docs})
        });
    }
    if(req.body.searchitem=="SONGS")
    {
        console.log('Searching For Songs ...');
        Music.find({'Data.Songname':new RegExp(req.body.searchtext, "i")},{'Data.$':1},function (err,docs) {
                    if(err)
                    {
                        console.log(err);
                    }
                    return res.json({docs:docs});
        })
    }
    if(req.body.searchitem=="Artist")
    {
        console.log('Searching For Artist ...');
        Music.find({'Data.Artist':{"$in":[new RegExp(req.body.searchtext, "i")]}},{'Data.$':1},function (err,docs) {
             if(err)
             {
                 console.log(err);
             }
            return res.json({docs:docs})
         })
    }
})

module.exports = router;