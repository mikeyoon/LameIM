/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express'),
    jade = require('jade'),
    RedisStore = require('connect-redis')(express),
    sessionStore = new RedisStore({ port: 9530, host: 'icefish.redistogo.com', pass: 'ad5b9ca74f6d1987843d99779cf55418'});

var app = express.createServer(
    //express.logger(),
    express.cookieParser(),
    express.session({secret: 'keyboard cat', key: 'express.sid', store: sessionStore })
);

require('./repository').boot('mongodb://heroku_app946851:o7vglb4rusreijos4o0od5il18@dbh43.mongolab.com:27437/heroku_app946851');
require('./mvc').boot(app);
require('./sockets').boot(app, sessionStore);

app.listen(Number(process.env.PORT) || 3000);

console.log('Express app started on port 3000');