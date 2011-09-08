/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var fs = require('fs')
    , express = require('express');

var controllerActions = {};

exports.boot = function(app) {
    bootApplication(app);
    bootControllers(app);
};

function bootApplication(app) {
    app.configure(function() {
        app.set('views', __dirname + '/views');
        app.set('views');
        app.set('view engine', 'jade');
        app.use(express.bodyParser());
        app.use('/styles', express.static(__dirname + '/styles'));
        app.use('/scripts', express.static(__dirname + '/scripts'));
    });
}

function bootControllers(app) {
    fs.readdir(__dirname + '/controllers', function(err, files) {
        if (err) throw err;
        files.forEach(function(file) {
            bootController(app, file);
        });

        app.get('/', function(req, res) {
            controllerActions['app']['index'](req, res);
        });

        app.post('/login', function(req, res) {
            controllerActions['app']['login'](req, res);
        });

        app.get('/logout', function(req, res) {
            controllerActions['app']['logout'](req, res);
        });

        app.get('/register', function(req, res) {
            controllerActions['app']['register'](req, res);
        });

        app.post('/register', function(req, res) {
            controllerActions['app']['newUser'](req, res);
        });

        //Security check
        app.all('*', function(req, res, next) {
            if (!req.session || !req.session.user || !req.session.user.username)
                res.redirect('/');
            else
            {
                console.log('found user session ' + req.session.user);
                next();
            }
        });

        //Default route
        app.all('/:controller/:action/:id?', function(req, res) {
            console.log('catch all');
            controllerActions[req.params.controller][req.params.action](req, res);
        });
    });
}

// Example (simplistic) controller support

function bootController(app, file) {
    var name = file.replace('.js', '')
        , actions = require('./controllers/' + name)
        , plural = name + 's' // realistically we would use an inflection lib
        , prefix = '/' + plural;
    console.log(prefix);
    // Special case for "app"
    if (name == 'app') prefix = '/';

    controllerActions[name] = actions;
}