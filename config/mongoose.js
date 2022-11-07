const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0/khitik_user');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { 
    console.log('Successfully Connected to database');
})