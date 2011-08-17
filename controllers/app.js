module.exports = {

    index: function(req, res){
        res.render('app/index');
    },

    login: function(req, res) {
        var login = req.body.login[0];

        console.log('username: ' + login.username + ' password: ' + login.password);

        req.session.user = { username: login.username };

        res.redirect('/home/index');
    },

    logout: function(req, res) {
        req.session.destroy();
        res.redirect('/');
    },

    register: function(req, res) {
        res.render('app/register')
    }
};