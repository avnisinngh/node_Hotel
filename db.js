//only for establishing db connection with node.js
const mongoose = require('mongoose');

//define mongo db connection
const mongoURL = 'mongodb://localhost:27017/hotels'

//set up mondodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//get the default connection
//moongose maintains a deafult connection object representing the mongose connection
const db = mongoose.connection;

//define event listener for database connection
db.on('connected', () =>{
    console.log('Connected to Mongodb server');
});

db.on('error', (err) =>{
    console.log('Mongodb connection error', err);
});

db.on('disconnected', () =>{
    console.log('Mongodb disconnected');
});

//export the database connection
module.exports = db;