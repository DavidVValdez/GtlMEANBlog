var mongoose = require('mongoose'),

Article = mongoose.model('articles', new mongoose.Schema({
    content:String
}));

module.exports = {
    article:function(){
        return new Article();
    }
};
