const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors= require('cors');
const passport= require('passport');
const mongoose= require('mongoose');
const config= require('./config/database')

mongoose.connect(config.database,{useMongoClient: true});

mongoose.connection.on('connected',function () {
    console.log(config.database);
});


const app = express();
const users = require('./routes/users');
const musics = require('./routes/musics');
// Port Number
const port= 3000;

// cors Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);
app.use('/musics',musics);
// Index Route
app.get('/',function (req,res) {
  res.send("Invalid End Point");
} );


// Start Server
app.listen(port, function()  {
   console.log('Server Started On Port =='+port );
});
