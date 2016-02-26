'use strict';

var express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
conf = require('./conf.js'),
models = require('./modules/models.js'),

app = express();

/* .................................................................................... */

mongoose.connect(conf.mongoConnect);

app.use(bodyParser.json({type:'*/*'}));

app.use('/admin',express.static('./admin'));

app.route('/api/articles')
    .get(function(req,res){
        models.article.find(function(err,articles){
            res.json(articles);
        });
    })
    .post(function(req,res){
        var article = new models.article();
        article.content = req.body.content;
        article.save();
        res.send('');
    });

app.listen(8080);
