const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const NewsSchema = new Schema({
    id: Number,
    publisher: String,
    news: [String]
});

mongoose.model('NewsModel', NewsSchema );