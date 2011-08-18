/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 8/16/11
 * Time: 11:33 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var User = new Schema();

//Todo hash me!!
User.add({
    firstName: String
    , lastName: String
    , username: { type: String, index: { unique: true } }
    , password: String
    , email: String
    , createDate: { type: Date, default: Date.now }
});

mongoose.connect('mongodb://localhost/db');

module.exports.User = mongoose.model('User', User);