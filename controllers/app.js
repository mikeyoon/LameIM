var User = require('../models/user').User;

module.exports = {

    index: function(req, res){
        res.render('app/index');
    },

    login: function(req, res) {
        var login = req.body.login[0];

        console.log('username: ' + login.username + ' password: ' + login.password);

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

        console.log(user);

        var newUser = new User();
        newUser.username = user.username;
        newUser.password = user.password;
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.email = user.email;
        newUser.save(function(err, data) {
            req.session.user = data;
            res.redirect('/home/index')
        });
    }
};