'use strict';

var express = require('express'),
app = express(),

conf = require('./conf.js'),
models = require('./modules/models.js');

app.use('/admin',express.static('./admin'));

/*app.route('/api/articles')*/

app.listen(8080);
