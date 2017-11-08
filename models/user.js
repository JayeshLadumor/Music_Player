const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const config= require('../config/database');
//const kickbox=require('kickbox').client('live_ab293fc02a9156a88ac18dbeb8ce5e64d77d9508139930e9a181abcfa0d6c2e4').kickbox();

// User Schema
const userschema = mongoose.Schema({
                Name: {type:String,required:true},
                Username:{
                    type:String,
                    required:true},
                Password: {
                    type:String,
                    required:true},
                Email_Id: {
                    type:String,
                    required:true},
                Mobile_no: {
                    type:String,
                    required:true},
                Usertype:{
                    type:String,
                    required:true
                }
           });

const User = module.exports = mongoose.model('User',userschema);

module.exports.getUserById = function (id,callback) {
    User.findById(id,callback);
}

module.exports.getUserByUsername = function (Username,callback) {
    const query = {Username:Username};
    User.findOne(query,callback);
}

module.exports.addUser = function (newuser,callback) {
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newuser.Password,salt,function(err,hash){
            if(err) console.log(err);
            newuser.Password = hash;
            newuser.save(callback);
        })
    })
}


module.exports.comparePassword = function (candidatePassword,hash,callback){
  bcrypt.compare(candidatePassword,hash,function(err,isMatch) {
    if(err) throw err;
    callback(null,isMatch);
  });
}

module.exports.getUserByemailid = function (emailid,callback) {
    const query = {Email_Id:emailid};
    User.findOne(query,callback);
}
