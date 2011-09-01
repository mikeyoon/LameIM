/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 8/31/11
 * Time: 6:40 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = new Schema({
    username: { type: String, index: true }
    , password: String
    , email: { type: String, index: true }
    , firstName: String
    , lastName: String
    , buddies: Array
});

module.exports.Model = User;