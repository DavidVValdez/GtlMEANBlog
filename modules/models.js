var mongoose = require('mongoose');

module.exports = {
    article:mongoose.model('articles', new mongoose.Schema({
        content:String
    }))
};
