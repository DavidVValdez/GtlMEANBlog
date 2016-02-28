var express = require('express'),
jwt = require('jsonwebtoken'),
passport = require('passport'),
BasicStrategy = require('passport-http').BasicStrategy,

users = require('../users.js'),
conf = require('../conf.js'),

router = express.Router();

/* ...................................................................... */

passport.use(new BasicStrategy(function(user, pass, done){
    var obj;
    if(undefined !== (obj = users[user]) && obj.p === pass){
        return done(null,{name:obj.name});
    }else{
        return done(null,false);
    }
}));

router.use(passport.authenticate('basic',{session:false}));

router.all('/',function(req,res){
    res.json({user:req.user,token:jwt.sign(req.user,conf.secret)});
});

module.exports = {
    router:router
};
