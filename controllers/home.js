/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//var Message = require('../models/user').Messages;
//var User = require('../models/user').User;
var Mongolian = require('mongolian');
var server = new Mongolian();
var db = server.db('db');

var users = db.collection('users');
var messages = db.collection('messages');

module.exports = {
    index: function (req, res) {
        console.log("called home/index");
        
        var results = messages.find({ $or: [ { from: req.session.user.username }, { to: req.session.user.username } ] }).sort({ createDate: 1 }).limit(10);

        results.toArray(function(err, data) {
            console.log(data);
            req.session.recent = data;
            res.render(req.params.controller + '/' + req.params.action, { recent: data });
        });
    
    },

    addBuddy: function (req, res) {
        users.findOne({ username: req.params.id }, function(err, data) {
            if (data)
            {
                var buddies = data.buddies;
                if (!buddies)
                {
                    data.buddies = new Array(req.params.id);
                }
                else
                {
                    buddies.push(req.params.id);
                }

                users.save(data);
                added = true;
                res.send({
                    success: true
                });
            }
            else
            {
                res.send({
                    success: false
                });
            }
        });
    }
};