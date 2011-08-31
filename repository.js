/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 8/20/11
 * Time: 5:29 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/db');

var User = new Schema({
    username: { type: String, index: true }
    , password: String
    , email: { type: String, index: true }
    , firstName: String
    , lastName: String
    , buddies: Array
});

var Message = new Schema({
    user: { type: String, index: true }
    , to: { type: String, index: true }
    , message: String
    , createDate: Date
});

module.exports.User = mongoose.model('User', User);
module.exports.Message = mongoose.model('Message', Message);