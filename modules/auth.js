var express = require('express'),
jwt = require('jsonwebtoken'),

users = require('../users.js'),
conf = require('../conf.js'),

router = express.Router(),
verify = function(req,res,next){
    if(false){
        next();
    }else{
        res.send('unauthorized');
    }
};

router.post('/session',function(req,res){
    var user;
    if(undefined !== (user = users[req.body.u]) && user.p === req.body.p){
        res.json({name:user.name,token:jwt.sign({name:user.name},conf.secret)});
    }else{
        res.send('wrong credentials');
    }
});

router.get('/session',function(req,res){
    res.send('foobar');
});

module.exports = {
    router:router,
    verify:verify
};
