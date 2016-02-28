'use strict';

var express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),

conf = require('./conf.js'),
models = require('./modules/models.js'),
auth = require('./modules/auth.js'),

app = express(),
routerArticles = express.Router();

/* .................................................................................... */

mongoose.connect(conf.mongoConnect);

app.use(bodyParser.json({type:'*/*'}));

app.use('/admin',express.static('./admin'));

routerArticles.use(auth.verify);

routerArticles.get('/articles', function(req,res){
    models.article.find(function(err,articles){
        res.json(articles);
    });
});

routerArticles.post('/articles', function(req,res){
    var article = new models.article();
    article.title = req.body.title;
    article.content = req.body.content;
    article.publishDate = req.body.publishDate;
    article.uriComponent = req.body.publishDate.substr(0,10)+'/'+req.body.title.replace(/[^a-zA-Z0-9]+/g,'-');
    article.save(function(err){
        if(err){
            console.log('There was an error');
        }
        res.send('');
    });
});

app.use('/',auth.router);
app.use('/api',routerArticles);

app.listen(8080);
