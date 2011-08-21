/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 8/20/11
 * Time: 5:29 PM
 * To change this template use File | Settings | File Templates.
 */
var Mongolian = require('mongolian');
var server = new Mongolian();
var db = server.db('db');

module.exports = {
    users:
        db.collection('users'),

    messages:
        db.collection('messages')
}