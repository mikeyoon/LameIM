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

User.add({
    username: { type: String, index: true }
    , password: String
    , createDate: { type: Date, default: Date.now }
});

User.path('username')
.default(function() {
    return new
})

mongoose.model('User', User);