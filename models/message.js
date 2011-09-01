/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 8/31/11
 * Time: 6:42 PM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Message = new Schema({
    user: { type: String, index: true }
    , to: { type: String, index: true }
    , message: String
    , createDate: Date
});

module.exports.Model = Message;