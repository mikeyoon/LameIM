/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 8/15/11
 * Time: 11:51 PM
 * To change this template use File | Settings | File Templates.
 */
var connect = require('connect');
var io = require('socket.io');

var Mongolian = require('mongolian');
var server = new Mongolian();
var db = server.db('db');

var users = db.collection('users');
var messages = db.collection('messages');

exports.boot = function(app, sessionStore)
{
    var sio = io.listen(app);
    var connections = { };
    
    sio.set('authorization', function(data, accept) {
        if (data.headers.cookie) {
            data.cookie = connect.utils.parseCookie(data.headers.cookie);
            data.sessionID = data.cookie['express.sid'];
            console.log('hello' + data.sessionID);
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
                connections[session.user.username] = socket;
                console.log('listening for user: ' + session.user.username);
                socket.on('message', function(data) {
                    console.log('received message from: ' + session.user.username);
                    console.log('data: ' + data);

                    if (connections[data.to])
                    {
                        messages.insert({
                            from: session.user.username,
                            to: data.to,
                            message: data.message,
                            createDate: new Date()
                        });

                        connections[data.to].emit('chat', { from: session.user.username, message: data.message });
                    }
                    else
                        socket.emit('chat', { from: 'system', message: 'user does not exist'});
                });

                socket.on('disconnect', function() {
                    connections[session.user.username] = null;
                });
            }
        });
    });
}