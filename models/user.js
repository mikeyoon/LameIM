/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 8/16/11
 * Time: 11:33 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
var User = new Schema();

var Messages = new Schema({
    to: { type: String, index: true }
    , from: { type: String, index: true }
    , message: String
    , createDate: { type: Date, default: Date.now }
});

//Todo hash me!!
User.add({
    firstName: String
    , lastName: String
    , username: { type: String, index: { unique: true } }
    , password: String
    , email: String
    , buddyList: Array
    , createDate: { type: Date, default: Date.now }
});

mongoose.connect('mongodb://localhost/db');

module.exports.User = mongoose.model('User', User);
module.exports.Messages = mongoose.model('Messages', Messages);