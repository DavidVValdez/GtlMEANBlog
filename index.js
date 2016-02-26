'use strict';
var express = require('express'),
app = express();

app.use('/admin',express.static('./admin'));

app.listen(8080);
