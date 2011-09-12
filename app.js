/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var url = require('url');

var redisUrl = url.parse(process.env.REDISTOGO_URL || 'redis://localhost:6379');
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
var redisAuth = process.env.REDISTOGO_URL ? redisUrl.auth.split(':')[1] : "";

var express = require('express'),
    jade = require('jade'),
    RedisStore = require('connect-redis')(express),
    sessionStore = new RedisStore({ port: redisUrl.port, host: redisUrl.hostname, pass: redisAuth});
//    MemoryStore = require('connect/lib/middleware/session/memory');

var app = express.createServer(
    //express.logger(),
    express.cookieParser(),
    express.session({secret: 'keyboard cat', key: 'express.sid', store: sessionStore })
);

require('./repository').boot(mongoUrl);
require('./mvc').boot(app);
require('./sockets').boot(app, sessionStore);

app.listen(Number(process.env.PORT) || 3000);

console.log('Express app started on port 3000');