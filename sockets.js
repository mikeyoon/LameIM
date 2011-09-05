/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 8/15/11
 * Time: 11:51 PM
 * To change this template use File | Settings | File Templates.
 */
var connect = require('connect'),
    io = require('socket.io'),
    mongoose = require('mongoose'),
    Message = mongoose.model('Message'),
    redis = require("redis"),
    client = redis.createClient();

var connections = { };

exports.boot = function(app, sessionStore)
{
    //connections = GLOBAL.connections = { };

    client.on("error", function(err) {
        console.log("Redis Error: " + err);
    });

    var sio = io.listen(app);

    sio.set('log level', 2);

    sio.set('authorization', function(data, accept) {
        if (data.headers.cookie) {
            data.cookie = connect.utils.parseCookie(data.headers.cookie);
            data.sessionID = data.cookie['express.sid'];
        } else {
            return accept('no cookie transmitted.', false);
        }

        accept(null, true);
    });

    sio.sockets.on('connection', function(socket) {
        console.log('A socket with sessionID ' + socket.handshake.sessionID
            + ' connected!');

        sessionStore.get(socket.handshake.sessionID, function(err, session) {

            if (session && session.user)
            {
                console.log('Connecting user ' + session.user.username);

                var self = this;
                self.currentUser = session.user.username;

                connections[self.currentUser] = socket;
                //for each buddy in list, push my name into their key
                //for each user in my key, send them a login notification
                var multi = client.multi();

                session.user.buddies.forEach(function(buddy) {
                    multi.hset("watch " + buddy, self.currentUser, 1);
                });

                multi.exec(function(err, replies) {
                    console.log("Update buddy watch lists " + replies.length);
                });

                client.hkeys("watch " + self.currentUser, function(err, reply) {
                    reply.forEach(function(buddy) {
                        if (connections[buddy])
                            connections[buddy].emit('buddy-connect', { username: currentUser });
                    });
                });

                console.log('listening for user: ' + self.currentUser);
                socket.on('message', function(data) {
                    console.log('received message from: ' + self.currentUser);
                    console.log('data: ' + data);

                    if (connections[data.to])
                    {
                        var newMessage = new Message({
                            user: self.currentUser,
                            to: data.to,
                            message: data.message,
                            createDate: new Date()
                        });

                        newMessage.save(function(err) {
                            connections[data.to].emit('chat', { from: self.currentUser, message: data.message });
                        });
                    }
                    else
                        socket.emit('chat', { from: 'system', message: 'user is offline or does not exist'});
                });

                socket.on('disconnect', function() {
                    console.log(self.currentUser + ' socket disconnect');
                    connections[self.currentUser] = null;

                    session.user.buddies.forEach(function(buddy) {
                        multi.hdel("watch " + buddy, self.currentUser);
                    });

                    multi.exec(function(err, replies) {
                        console.log("Update buddy unwatch lists " + replies.length);
                    });

                    client.hkeys("watch " + self.currentUser, function(err, reply) {
                        reply.forEach(function(buddy) {
                            if (connections[buddy])
                                connections[buddy].emit('buddy-disconnect', { username: self.currentUser });
                        });
                    });
                });
            }
        });
    });
};

exports.isOnline = function(name)
{
    console.log('Connection to ' + name + '=' + connections[name]);
    return connections[name] !== null && typeof connections[name] === "object";
};