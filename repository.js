/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 8/20/11
 * Time: 5:29 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose'),
    User = require('./models/user').Model,
    Message = require('./models/message').Model;

module.exports.boot = function(url) {
    mongoose.connect(url);

    mongoose.model('Message', Message);
    mongoose.model('User', User);
};