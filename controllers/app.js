//var User = require('../models/user').User;

var Mongolian = require('mongolian');
var server = new Mongolian();
var db = server.db('db');

var users = db.collection('users');
var messages = db.collection('messages');

module.exports = {

    index: function(req, res){
        res.render('app/index');
    },

    login: function(req, res) {
        var login = req.body.login[0];

        users.findOne({ username: login.username, password: login.password }, function(err, user) {
            console.log('found ' + login.username);

            req.session.user = user;
            res.redirect('/home/index');
        });
    },

    logout: function(req, res) {
        req.session.destroy();
        res.redirect('/');
    },

    register: function(req, res) {
        res.render('app/register');
    },

    newUser: function(req, res) {
        var user = req.body.user;

        var newUser = {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };

        users.save(newUser, function(err, data) {
            req.session.user = data;
            res.redirect('/home/index');
        });
    }
};