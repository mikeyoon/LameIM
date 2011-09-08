//var User = require('../models/user').User;

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {

    index: function(req, res){
        res.render('app/index');
    },

    login: function(req, res) {
        var login = req.body.login[0];

        User.findOne({ username: login.username, password: login.password }, function(err, user) {
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

        var newUser = new User({
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });

        newUser.save(function(err) {
            req.session.user = newUser;
            res.redirect('/home/index');
        });
    }
};