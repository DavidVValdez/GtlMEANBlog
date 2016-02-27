var mongoose = require('mongoose');

module.exports = {
    article:mongoose.model('articles', new mongoose.Schema({
        date:{type:Date,default:Date.now},
        title:String,
        content:String,
        publishDate:Date,
        uriComponent:String
    }))
};
