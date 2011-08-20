/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 8/16/11
 * Time: 11:33 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var Message = new Schema();

Message.add({
    from_id: 
    , createDate: { type: Date, default: Date.now }
});

mongoose.connect('mongodb://localhost/db');

module.exports.User = mongoose.model('User', User);