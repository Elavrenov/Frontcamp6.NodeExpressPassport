const mongoose = require('mongoose');

function connectToMongo(){
    const mongoUrl = 'mongodb://localhost:27017';
    const mongoDbName = 'news';
    
    mongoose.connect(`${mongoUrl}/${mongoDbName}`,{useNewUrlParser:true});
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

exports.setMongooseConnection = connectToMongo;