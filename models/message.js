/**
 * Created by JetBrains WebStorm.
 * User: mike
 * Date: 8/24/11
 * Time: 11:11 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = function(user, to, message, createDate) {
    this.user = user;
    this.to = to;
    this.message = message;
    this.createDate = createDate;
};