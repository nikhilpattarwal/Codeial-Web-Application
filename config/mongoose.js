const mongoose = require('mongoose'); 
mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');

const db = mongoose.connection;

db.on('Error', console.error.bind(console,"Error connecting to MongoDB")); //db.on registers a persistent event listener that remains active for the lifetime of the database connection,

db.once('Open', () => {
    console.log("Connected to database :: MongoDB"); //db.once registers a one-time event listener

});

module.exports = db;
