var express = require('express'),
jwt = require('jsonwebtoken'),
passport = require('passport'),
BasicStrategy = require('passport-http').BasicStrategy,

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

/* ...................................................................... */

passport.use(new BasicStrategy(function(user, pass, done){
    return done(null,{u:user,p:pass});
}));

router.use(passport.authenticate('basic',{session:false}));

router.post('/',function(req,res){
    res.json(req.user);
    /*
    var user;
    if(undefined !== (user = users[req.body.u]) && user.p === req.body.p){
        res.json({name:user.name,token:jwt.sign({name:user.name},conf.secret)});
    }else{
        res.send('wrong credentials');
    }
    */
});

router.get('/',function(req,res){
    res.json(req.user);
});

module.exports = {
    router:router,
    verify:verify
};
