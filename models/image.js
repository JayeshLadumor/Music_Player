/**
 * Created by jayes on 03-Nov-17.
 */
const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const config= require('../config/database');

var imageschema = new mongoose.Schema({
    username:String,
    data: Buffer,
    Type: String
});

const Images = module.exports = mongoose.model('Images',imageschema);
