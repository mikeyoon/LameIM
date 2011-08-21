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
        var results = messages.find({ $or: [ { from: req.session.user.username }, { to: req.session.user.username } ] }).sort({ createDate: 1 }).limit(10);

        results.toArray(function(err, data) {
            console.log(data.buddies)
            req.session.recent = data;
            data = data ? data : [ ];
            var buddyList = req.session.user.buddies ? req.session.user.buddies : [ ];
            res.render(req.params.controller + '/' + req.params.action, { recent: data, buddies: buddyList });
        });
    },

    addBuddy: function (req, res) {
        users.findOne({ username: req.session.user.username }, function(err, data) {
            console.log(data);
            if (data)
            {
                var buddies = data.buddies;
                if (!buddies)
                {
                    console.log('new buddy list');
                    data.buddies = new Array(req.params.id);

                    users.save(data, function(err, obj) {
                        req.session.user = data;
                        res.send({
                            success: true
                        });
                    });
                }
                else
                {
                    if (buddies.indexOf(req.params.id) == -1)
                    {
                        console.log('added buddy');
                        buddies.push(req.params.id);

                        users.save(data, function(err, obj) {
                            req.session.user = data;
                            res.send({
                                success: true
                            });
                        });
                    }
                }
            }
            else
            {
                res.send({
                    success: false
                });
            }
        });
    },

    getRecentHistory: function(req, res) {
        var recent = messages.find({ $or: [ { from: req.params.id }, { to: req.params.id } ] }).sort({ createDate: 1 }).limit(10);

        recent.toArray(function(err, data) {
            res.send(data);
        });
    }
};