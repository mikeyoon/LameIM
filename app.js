/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var jade = require('jade');
var RedisStore = require('connect-redis')(express);
var sessionStore = new RedisStore();

var app = express.createServer(
    express.logger(),
    express.cookieParser(),
    express.session({secret: 'keyboard cat', key: 'express.sid', store: sessionStore })
);

require('./mvc').boot(app);
require('./sockets').boot(app, sessionStore);

app.listen(3000);

console.log('Express app started on port 3000');