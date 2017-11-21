/**
 * Created by jayes on 03-Nov-17.
 */
const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const config= require('../config/database');

var musicschema = new mongoose.Schema({
    Albumname: String,
    Songname: {
        type: String,
        required: true
    },
    Moviename: String,
    data: {
        type: Buffer,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    songpath: {
        type: String,
        required: true
    }
});

const Music = module.exports = mongoose.model('Musics',musicschema);


